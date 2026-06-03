import type { ReactNode } from 'react'

type Tone = 'info' | 'success' | 'warning' | 'error'

const cls: Record<Tone, string> = {
  info: 'bg-blue-600 text-white',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-600 text-white',
}

export function Banner({
  tone = 'info',
  children,
  onClose,
}: { tone?: Tone; children: ReactNode; onClose?: () => void }) {
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 text-sm ${cls[tone]}`}>
      <div>{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-3 opacity-80 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  )
}
