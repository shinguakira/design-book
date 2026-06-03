export function Avatar({
  name,
  src,
  className = '',
}: { name?: string; src?: string; className?: string }) {
  const initials =
    name?.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase() ?? '?'
  return (
    <span
      className={[
        'inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 text-sm font-medium overflow-hidden',
        className,
      ].join(' ')}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </span>
  )
}
