export function Pagination({
  page,
  total,
  onChange,
}: { page: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="h-8 px-3 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50 disabled:opacity-40"
      >
        ‹
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-8 w-8 rounded-md text-sm ${
            p === page
              ? 'bg-zinc-900 text-white'
              : 'border border-zinc-300 hover:bg-zinc-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="h-8 px-3 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50 disabled:opacity-40"
      >
        ›
      </button>
    </div>
  )
}
