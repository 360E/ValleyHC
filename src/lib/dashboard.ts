import "server-only";

import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";

import { getSupabaseClient, hasSupabaseConfiguration } from "@/lib/supabase";

const DAY_MS = 24 * 60 * 60 * 1000;
const DASHBOARD_TIME_ZONE = "America/Los_Angeles";
const FALLBACK_SOURCE = "Direct";
const FALLBACK_CAMPAIGN = "Direct";
const DAY_OF_WEEK_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: DASHBOARD_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dateLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  month: "short",
  day: "numeric",
});

const hourFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  hour: "numeric",
  hourCycle: "h23",
});

const dayOfWeekFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  weekday: "short",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const integerFormatter = new Intl.NumberFormat("en-US");

const averageFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

export const DASHBOARD_RANGES = [7, 30, 90] as const;

export type DashboardRange = (typeof DASHBOARD_RANGES)[number];

type Period = "current" | "previous";
type TrendDirection = "up" | "down" | "flat";

export type LeadRecord = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  page_path: string | null;
  created_at: string;
};

export type DashboardKpi = {
  label: string;
  value: string;
  delta: string;
  direction: TrendDirection;
};

export type DashboardLineDatum = {
  isoDate: string;
  label: string;
  value: number;
};

export type DashboardBarDatum = {
  label: string;
  value: number;
};

export type DashboardLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  createdAt: string;
  createdAtLabel: string;
};

type TrendSummary = {
  direction: TrendDirection;
  percent: number;
  display: string;
};

export type DashboardSnapshot = {
  range: DashboardRange;
  kpis: DashboardKpi[];
  dailyTrend: DashboardLineDatum[];
  sourceBreakdown: DashboardBarDatum[];
  hourBreakdown: DashboardBarDatum[];
  dayOfWeekBreakdown: DashboardBarDatum[];
  campaignBreakdown: DashboardBarDatum[];
  recentLeads: DashboardLeadRow[];
};

function getRangeWindow(range: DashboardRange, period: Period) {
  const now = new Date();
  const endDate = new Date(now.getTime() - (period === "previous" ? range * DAY_MS : 0));
  const startDate = new Date(endDate.getTime() - range * DAY_MS);

  return { startDate, endDate };
}

function formatDateKey(value: Date | string) {
  return dateKeyFormatter.format(new Date(value));
}

function formatDateLabel(value: Date | string) {
  return dateLabelFormatter.format(new Date(value));
}

function formatDateTimeLabel(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

function getHourLabel(value: string) {
  return hourFormatter.format(new Date(value)).padStart(2, "0");
}

function getDayOfWeekLabel(value: string) {
  return dayOfWeekFormatter.format(new Date(value));
}

function normalizeBreakdownLabel(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();

  return trimmed ? trimmed : fallback;
}

function buildBreakdown(items: Map<string, number>) {
  return Array.from(items.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => {
      if (right.value !== left.value) {
        return right.value - left.value;
      }

      return left.label.localeCompare(right.label);
    });
}

function buildDeltaLabel(trend: TrendSummary) {
  const prefix = trend.direction === "flat" ? "" : trend.direction === "up" ? "+" : "-";

  return `${prefix}${Math.abs(trend.percent).toFixed(1)}%`;
}

function countLeadsForDateKey(leads: LeadRecord[], key: string) {
  return leads.filter((lead) => formatDateKey(lead.created_at) === key).length;
}

function buildTrendSummary(previousPeriod: number, currentPeriod: number): TrendSummary {
  if (previousPeriod === 0 && currentPeriod === 0) {
    return {
      direction: "flat",
      percent: 0,
      display: "0.0%",
    };
  }

  if (previousPeriod === 0) {
    return {
      direction: "up",
      percent: 100,
      display: "+100.0%",
    };
  }

  const percent = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
  const direction: TrendDirection = percent > 0 ? "up" : percent < 0 ? "down" : "flat";
  const prefix = direction === "up" ? "+" : "";

  return {
    direction,
    percent,
    display: `${prefix}${percent.toFixed(1)}%`,
  };
}

export function calculateTrend(previousPeriod: number, currentPeriod: number) {
  return buildTrendSummary(previousPeriod, currentPeriod);
}

export const getLeads = cache(async (range: DashboardRange, period: Period = "current"): Promise<LeadRecord[]> => {
  noStore();

  if (!hasSupabaseConfiguration()) {
    throw new Error("Dashboard Supabase configuration is missing.");
  }

  const supabase = getSupabaseClient();
  const { startDate, endDate } = getRangeWindow(range, period);
  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, phone, message, utm_source, utm_campaign, page_path, created_at")
    .gte("created_at", startDate.toISOString())
    .lt("created_at", endDate.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load dashboard leads: ${error.message}`);
  }

  return (data ?? []) as LeadRecord[];
});

export function groupLeadsByDay(leads: LeadRecord[], range: DashboardRange, endDate = new Date()) {
  const leadCounts = new Map<string, number>();

  for (const lead of leads) {
    const key = formatDateKey(lead.created_at);
    leadCounts.set(key, (leadCounts.get(key) ?? 0) + 1);
  }

  return Array.from({ length: range }, (_, index) => {
    const pointDate = new Date(endDate.getTime() - (range - 1 - index) * DAY_MS);
    const isoDate = formatDateKey(pointDate);

    return {
      isoDate,
      label: formatDateLabel(pointDate),
      value: leadCounts.get(isoDate) ?? 0,
    };
  });
}

export function groupLeadsBySource(leads: LeadRecord[]) {
  const grouped = new Map<string, number>();

  for (const lead of leads) {
    const key = normalizeBreakdownLabel(lead.utm_source, FALLBACK_SOURCE);
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }

  return buildBreakdown(grouped);
}

export function groupLeadsByHour(leads: LeadRecord[]) {
  const grouped = new Map<string, number>();

  for (let hour = 0; hour < 24; hour += 1) {
    const label = hour.toString().padStart(2, "0");
    grouped.set(label, 0);
  }

  for (const lead of leads) {
    const key = getHourLabel(lead.created_at);
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }

  return Array.from(grouped.entries()).map(([label, value]) => ({ label, value }));
}

export function groupLeadsByDayOfWeek(leads: LeadRecord[]) {
  const grouped = new Map<string, number>(DAY_OF_WEEK_ORDER.map((day) => [day, 0]));

  for (const lead of leads) {
    const key = getDayOfWeekLabel(lead.created_at);
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }

  return DAY_OF_WEEK_ORDER.map((day) => ({
    label: day,
    value: grouped.get(day) ?? 0,
  }));
}

export function groupLeadsByCampaign(leads: LeadRecord[]) {
  const grouped = new Map<string, number>();

  for (const lead of leads) {
    const key = normalizeBreakdownLabel(lead.utm_campaign, FALLBACK_CAMPAIGN);
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }

  return buildBreakdown(grouped);
}

function buildRecentLeadRows(leads: LeadRecord[]) {
  return leads
    .slice()
    .sort((left, right) => right.created_at.localeCompare(left.created_at))
    .slice(0, 20)
    .map((lead) => ({
      id: lead.id,
      name: lead.name?.trim() || "Unknown",
      email: lead.email?.trim() || "Unknown",
      phone: lead.phone?.trim() || "Unknown",
      source: normalizeBreakdownLabel(lead.utm_source, FALLBACK_SOURCE),
      campaign: normalizeBreakdownLabel(lead.utm_campaign, FALLBACK_CAMPAIGN),
      createdAt: lead.created_at,
      createdAtLabel: formatDateTimeLabel(lead.created_at),
    }));
}

export function resolveDashboardRange(value: string | undefined): DashboardRange {
  const parsed = Number(value);

  if (DASHBOARD_RANGES.includes(parsed as DashboardRange)) {
    return parsed as DashboardRange;
  }

  return 7;
}

export const getDashboardSnapshot = cache(async (range: DashboardRange): Promise<DashboardSnapshot> => {
  noStore();

  const [currentLeads, previousLeads] = await Promise.all([
    getLeads(range, "current"),
    getLeads(range, "previous"),
  ]);

  const totalLeads = currentLeads.length;
  const previousTotalLeads = previousLeads.length;
  const totalTrend = calculateTrend(previousTotalLeads, totalLeads);

  const leadsToday = countLeadsForDateKey(currentLeads, formatDateKey(new Date()));
  const leadsYesterday = countLeadsForDateKey(currentLeads, formatDateKey(new Date(Date.now() - DAY_MS)));
  const todayTrend = calculateTrend(leadsYesterday, leadsToday);

  const averageLeadsPerDay = totalLeads / range;
  const previousAverage = previousTotalLeads / range;
  const averageTrend = calculateTrend(previousAverage, averageLeadsPerDay);

  return {
    range,
    kpis: [
      {
        label: "Total Leads",
        value: integerFormatter.format(totalLeads),
        delta: buildDeltaLabel(totalTrend),
        direction: totalTrend.direction,
      },
      {
        label: "Leads Today",
        value: integerFormatter.format(leadsToday),
        delta: buildDeltaLabel(todayTrend),
        direction: todayTrend.direction,
      },
      {
        label: "Avg Leads / Day",
        value: averageFormatter.format(averageLeadsPerDay),
        delta: buildDeltaLabel(averageTrend),
        direction: averageTrend.direction,
      },
      {
        label: "Trend %",
        value: totalTrend.display,
        delta: buildDeltaLabel(totalTrend),
        direction: totalTrend.direction,
      },
    ],
    dailyTrend: groupLeadsByDay(currentLeads, range),
    sourceBreakdown: groupLeadsBySource(currentLeads),
    hourBreakdown: groupLeadsByHour(currentLeads),
    dayOfWeekBreakdown: groupLeadsByDayOfWeek(currentLeads),
    campaignBreakdown: groupLeadsByCampaign(currentLeads),
    recentLeads: buildRecentLeadRows(currentLeads),
  };
});
