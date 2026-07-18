export function ProgressBar({
  value,
  max = 100,
  className = "",
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`h-2 w-full bg-zinc-200 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-zinc-900 transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
