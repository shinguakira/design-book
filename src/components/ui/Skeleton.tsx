export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-zinc-200 rounded animate-pulse ${className}`} />;
}
