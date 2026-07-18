import type { ReactNode } from "react";

export function Chip({ children, onRemove }: { children: ReactNode; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 text-zinc-700 px-2.5 py-1 text-xs">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 text-zinc-400 hover:text-zinc-700 text-sm leading-none"
        >
          ×
        </button>
      )}
    </span>
  );
}
