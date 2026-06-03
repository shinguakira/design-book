import type { ReactNode } from 'react'

type Tone = 'info' | 'success' | 'warning' | 'error'

const toneClass: Record<Tone, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
  error: 'bg-red-50 border-red-200 text-red-900',
}

const dotClass: Record<Tone, string> = {
  info: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

export function Alert({
  tone = 'info',
  title,
  children,
}: { tone?: Tone; title?: string; children?: ReactNode }) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${toneClass[tone]}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 ${dotClass[tone]}`} />
        <div className="flex-1">
          {title && <div className="font-medium">{title}</div>}
          {children && <div className="text-sm opacity-90 mt-0.5">{children}</div>}
        </div>
      </div>
    </div>
  )
}
