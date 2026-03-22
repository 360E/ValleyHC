"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardBarChartProps = {
  title: string;
  description: string;
  data: Array<{
    label: string;
    value: number;
  }>;
  orientation?: "horizontal" | "vertical";
  height?: number;
};

function formatTooltipValue(value: number | string | ReadonlyArray<number | string> | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);

  return [Number.isFinite(numericValue) ? numericValue : 0, "Leads"] as [number, string];
}

function truncateLabel(label: string, maxLength = 14) {
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label;
}

export function DashboardBarChartCard({
  title,
  description,
  data,
  orientation = "vertical",
  height = 288,
}: DashboardBarChartProps) {
  const hasData = data.some((item) => item.value > 0);
  const isHorizontal = orientation === "horizontal";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="mt-4" style={{ height }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isHorizontal ? "vertical" : "horizontal"}
              margin={isHorizontal ? { top: 4, right: 8, left: 8, bottom: 4 } : { top: 4, right: 8, left: -12, bottom: 0 }}
            >
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={!isHorizontal} horizontal={isHorizontal} />
              {isHorizontal ? (
                <>
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={96}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value: string) => truncateLabel(value)}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickMargin={8}
                    tickFormatter={(value: string) => truncateLabel(value, 8)}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    width={28}
                  />
                </>
              )}
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  boxShadow: "none",
                  backgroundColor: "#ffffff",
                }}
                formatter={formatTooltipValue}
              />
              <Bar dataKey="value" fill="#153e75" radius={4} isAnimationActive={false} />
            </BarChart>
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
