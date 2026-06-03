import type { ReactNode } from 'react'

export function Card({
  title,
  description,
  children,
  footer,
}: {
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
      {(title || description) && (
        <div className="px-5 py-4 border-b border-zinc-200">
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm text-zinc-500 mt-0.5">{description}</div>}
        </div>
      )}
      {children && <div className="px-5 py-4">{children}</div>}
      {footer && <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-200">{footer}</div>}
    </div>
  )
}
