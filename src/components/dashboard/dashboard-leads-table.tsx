"use client";

import { useMemo, useState } from "react";

type DashboardLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  createdAt: string;
  createdAtLabel: string;
};

type DashboardLeadsTableProps = {
  rows: DashboardLeadRow[];
};

function truncateValue(value: string) {
  return value.length > 40 ? `${value.slice(0, 39)}…` : value;
}

export function DashboardLeadsTable({ rows }: DashboardLeadsTableProps) {
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  const sortedRows = useMemo(() => {
    const clonedRows = rows.slice();

    clonedRows.sort((left, right) =>
      sortDirection === "desc"
        ? right.createdAt.localeCompare(left.createdAt)
        : left.createdAt.localeCompare(right.createdAt),
    );

    return clonedRows;
  }, [rows, sortDirection]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-900">Recent Leads</h2>
          <p className="text-sm text-slate-500">Latest 20 contact requests from Supabase.</p>
        </div>

        <button
          type="button"
          onClick={() => setSortDirection((currentValue) => (currentValue === "desc" ? "asc" : "desc"))}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          Date {sortDirection === "desc" ? "↓" : "↑"}
        </button>
      </div>

      {sortedRows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm text-slate-700">
              {sortedRows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <span className="block max-w-[140px] truncate">{truncateValue(row.name)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[220px] truncate">{truncateValue(row.email)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[160px] truncate">{truncateValue(row.phone)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[120px] truncate">{truncateValue(row.source)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block max-w-[180px] truncate">{truncateValue(row.campaign)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">{row.createdAtLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-4 py-10 text-center text-sm text-slate-500">No data available</div>
      )}
    </div>
  );
}
