import type { ReactNode } from 'react'

export function StyleDoc({
  intro,
  pros,
  cons,
  example,
}: {
  intro: string
  pros: string[]
  cons: string[]
  example: ReactNode
}) {
  return (
    <div className="max-w-4xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">{intro}</p>
      <div className="rounded-lg border border-zinc-200 bg-white p-2">
        <div className="text-xs font-medium text-zinc-500 px-3 py-1.5">
          Example
        </div>
        <div className="p-6 rounded-md">{example}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            向いてる
          </div>
          <ul className="list-disc pl-5 space-y-1 text-emerald-900">
            {pros.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
            苦手なところ
          </div>
          <ul className="list-disc pl-5 space-y-1 text-rose-900">
            {cons.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
