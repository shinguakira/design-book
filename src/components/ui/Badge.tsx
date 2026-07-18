import type { ReactNode } from "react";

type Tone = "neutral" | "info" | "success" | "warning" | "error";

const cls: Record<Tone, string> = {
  neutral: "bg-zinc-100 text-zinc-700",
  info: "bg-blue-100 text-blue-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls[tone]}`}
    >
      {children}
    </span>
  );
}
