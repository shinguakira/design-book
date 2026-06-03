import { useState, useRef, useEffect, type ReactNode } from 'react'

export function Popover({
  trigger,
  children,
}: { trigger: ReactNode; children: ReactNode }) {
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
        <div className="absolute z-10 mt-2 w-64 rounded-lg border border-zinc-200 bg-white shadow-lg p-4 text-sm">
          {children}
        </div>
      )}
    </div>
  )
}
