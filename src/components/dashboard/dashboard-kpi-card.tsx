import { cn } from "@/lib/utils";

type DashboardKpiCardProps = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
};

const directionStyles: Record<DashboardKpiCardProps["direction"], string> = {
  up: "text-emerald-700",
  down: "text-rose-700",
  flat: "text-slate-500",
};

export function DashboardKpiCard({ label, value, delta, direction }: DashboardKpiCardProps) {
  return (
    <div className="flex h-full min-h-[116px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="text-lg font-semibold text-slate-900">{value}</p>
      </div>
      <p className={cn("text-xs font-medium", directionStyles[direction])}>{delta}</p>
    </div>
  );
}
