import type { Metadata } from "next";

import { DashboardBarChartCard } from "@/components/dashboard/dashboard-bar-chart";
import { DashboardKpiCard } from "@/components/dashboard/dashboard-kpi-card";
import { DashboardLeadsTable } from "@/components/dashboard/dashboard-leads-table";
import { DashboardLineChartCard } from "@/components/dashboard/dashboard-line-chart";
import { DashboardRangeFilter } from "@/components/dashboard/dashboard-range-filter";
import { getDashboardSnapshot, resolveDashboardRange } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Lead Operations Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams?: {
    range?: string | string[];
  };
};

function getRangeParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const range = resolveDashboardRange(getRangeParam(searchParams?.range));
  const snapshot = await getDashboardSnapshot(range);

  return (
    <section className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Operations Dashboard</p>
            <h1 className="text-2xl font-semibold text-slate-950">Lead Operations</h1>
            <p className="max-w-2xl text-sm text-slate-500">
              Track lead volume, acquisition sources, and timing patterns from Supabase without leaving the internal dashboard.
            </p>
          </div>

          <DashboardRangeFilter currentRange={range} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.kpis.map((kpi) => (
            <DashboardKpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <DashboardLineChartCard
            title="Lead Volume Trend"
            description="Lead counts by day across the selected period."
            data={snapshot.dailyTrend}
          />
          <DashboardBarChartCard
            title="Lead Sources"
            description="Sorted by utm_source to show where leads originate."
            data={snapshot.sourceBreakdown}
            orientation="horizontal"
            height={288}
          />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <DashboardBarChartCard
            title="Hour of Day"
            description="Lead activity by local hour to highlight peak conversion windows."
            data={snapshot.hourBreakdown}
            orientation="vertical"
            height={260}
          />
          <DashboardBarChartCard
            title="Day of Week"
            description="Lead counts from Monday through Sunday."
            data={snapshot.dayOfWeekBreakdown}
            orientation="vertical"
            height={260}
          />
          <DashboardBarChartCard
            title="Campaign Breakdown"
            description="UTM campaign performance, with missing values grouped as Direct."
            data={snapshot.campaignBreakdown}
            orientation="horizontal"
            height={260}
          />
        </div>

        <div className="mt-6">
          <DashboardLeadsTable rows={snapshot.recentLeads} />
        </div>
      </div>
    </section>
  );
}
