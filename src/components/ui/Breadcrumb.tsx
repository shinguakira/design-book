export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-zinc-300">/</span>}
          {it.href ? (
            <a href={it.href} className="hover:text-zinc-900">
              {it.label}
            </a>
          ) : (
            <span className="text-zinc-900 font-medium">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
