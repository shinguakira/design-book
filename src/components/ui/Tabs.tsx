import { useState, type ReactNode } from 'react'

export function Tabs({
  tabs,
}: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  return (
    <div>
      <div className="flex border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              active === t.id
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="py-4 text-sm">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  )
}
