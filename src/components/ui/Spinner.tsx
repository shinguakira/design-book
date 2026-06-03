type Size = 'sm' | 'md' | 'lg'

const sizePx: Record<Size, number> = { sm: 16, md: 24, lg: 40 }

export function Spinner({
  size = 'md',
  className = '',
}: { size?: Size; className?: string }) {
  const px = sizePx[size]
  return (
    <span
      role="status"
      aria-label="loading"
      className={[
        'inline-block animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900',
        className,
      ].join(' ')}
      style={{ width: px, height: px }}
    />
  )
}
