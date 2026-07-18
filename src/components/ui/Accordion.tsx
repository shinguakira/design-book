import { useState, type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { id: string; title: string; content: ReactNode }[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-lg overflow-hidden bg-white">
      {items.map((it) => (
        <div key={it.id}>
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-zinc-50"
            onClick={() => setOpen(open === it.id ? null : it.id)}
          >
            <span className="text-sm font-medium">{it.title}</span>
            <span
              className={`text-zinc-400 transition-transform ${open === it.id ? "rotate-180" : ""}`}
            >
              ⌄
            </span>
          </button>
          {open === it.id && <div className="px-4 pb-4 text-sm text-zinc-600">{it.content}</div>}
        </div>
      ))}
    </div>
  );
}
