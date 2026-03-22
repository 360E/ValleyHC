"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardLineChartProps = {
  title: string;
  description: string;
  data: Array<{
    isoDate: string;
    label: string;
    value: number;
  }>;
};

function formatTooltipValue(value: number | string | ReadonlyArray<number | string> | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);

  return [Number.isFinite(numericValue) ? numericValue : 0, "Leads"] as [number, string];
}

export function DashboardLineChartCard({ title, description, data }: DashboardLineChartProps) {
  const hasData = data.some((item) => item.value > 0);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="mt-4 h-72">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickMargin={8}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={32}
              />
              <Tooltip
                cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                contentStyle={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  boxShadow: "none",
                  backgroundColor: "#ffffff",
                }}
                formatter={formatTooltipValue}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.isoDate ?? ""}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#153e75"
                strokeWidth={2}
                dot={{ r: 2, fill: "#153e75" }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-slate-50 text-sm text-slate-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
