import type { ReactNode } from "react";

export function ShowcaseRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border border-zinc-200 bg-white rounded-lg overflow-hidden">
      <div className="px-4 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-200 bg-zinc-50">
        {label}
      </div>
      <div className="p-6 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ShowcaseGrid({ children }: { children: ReactNode }) {
  return <div className="space-y-4 max-w-3xl">{children}</div>;
}
