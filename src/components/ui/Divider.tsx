export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-zinc-200" />;
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500 uppercase tracking-wider">
      <span className="flex-1 h-px bg-zinc-200" />
      <span>{label}</span>
      <span className="flex-1 h-px bg-zinc-200" />
    </div>
  );
}
