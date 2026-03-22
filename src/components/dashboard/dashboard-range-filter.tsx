import Link from "next/link";

import { DASHBOARD_RANGES, type DashboardRange } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

const rangeLabels: Record<DashboardRange, string> = {
  7: "Last 7 days",
  30: "Last 30 days",
  90: "Last 90 days",
};

type DashboardRangeFilterProps = {
  currentRange: DashboardRange;
};

export function DashboardRangeFilter({ currentRange }: DashboardRangeFilterProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      {DASHBOARD_RANGES.map((range) => (
        <Link
          key={range}
          href={`/dashboard?range=${range}`}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900",
            currentRange === range ? "bg-slate-900 text-white hover:bg-slate-900 hover:text-white" : "",
          )}
        >
          {rangeLabels[range]}
        </Link>
      ))}
    </div>
  );
}
