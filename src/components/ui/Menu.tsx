import { useState, useRef, useEffect, type ReactNode } from 'react'

export function Menu({
  trigger,
  items,
}: { trigger: ReactNode; items: { label: string; onClick?: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])
  return (
    <div className="relative inline-block" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}>{trigger}</button>
      {open && (
        <div className="absolute z-10 mt-1 min-w-40 rounded-md border border-zinc-200 bg-white shadow-lg py-1">
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                it.onClick?.()
                setOpen(false)
              }}
              className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 ${
                it.danger ? 'text-red-600' : 'text-zinc-700'
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
