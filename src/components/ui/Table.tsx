import type { ReactNode } from "react";

export function Table({
  columns,
  rows,
}: {
  columns: { key: string; label: string }[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="overflow-hidden border border-zinc-200 rounded-lg bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            {columns.map((c) => (
              <th key={c.key} className="text-left font-medium text-zinc-500 px-4 py-2.5">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2.5">
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
