import type { ReactNode } from "react";

export function List({
  items,
}: {
  items: { icon?: ReactNode; title: string; description?: string; trailing?: ReactNode }[];
}) {
  return (
    <ul className="divide-y divide-zinc-200 border border-zinc-200 rounded-lg overflow-hidden bg-white">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          {it.icon && <span className="text-zinc-400">{it.icon}</span>}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">{it.title}</div>
            {it.description && <div className="text-xs text-zinc-500">{it.description}</div>}
          </div>
          {it.trailing}
        </li>
      ))}
    </ul>
  );
}
