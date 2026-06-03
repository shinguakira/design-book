import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { sections, flatEntries } from '../registry'

export default function Layout() {
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')

  const current = flatEntries.find(
    (e) => `/${e.sectionId}/${e.slug}` === pathname,
  )

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections
      .map((s) => ({
        ...s,
        entries: s.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description?.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.entries.length > 0)
  }, [query])

  return (
    <div className="flex h-full bg-zinc-50 text-zinc-900">
      <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white overflow-y-auto flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-200">
          <NavLink to="/" className="block">
            <div className="text-base font-semibold">Design Book</div>
            <div className="text-xs text-zinc-500 mt-0.5">my design playground</div>
          </NavLink>
        </div>

        <div className="px-3 pt-3 pb-1">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="検索..."
              className="w-full rounded-md border border-zinc-300 bg-white pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
              ⌕
            </span>
          </div>
        </div>

        <nav className="px-3 py-3 space-y-5 flex-1">
          {filteredSections.length === 0 && (
            <div className="px-2 text-xs text-zinc-400">該当なし</div>
          )}
          {filteredSections.map((section) => (
            <div key={section.id}>
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.entries.map((entry) => (
                  <li key={entry.slug}>
                    <NavLink
                      to={`/${section.id}/${entry.slug}`}
                      className={({ isActive }) =>
                        [
                          'block rounded-md px-2 py-1.5 text-sm',
                          isActive
                            ? 'bg-zinc-900 text-white'
                            : 'text-zinc-700 hover:bg-zinc-100',
                        ].join(' ')
                      }
                    >
                      {entry.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {current && (
          <header className="border-b border-zinc-200 bg-white px-8 py-5">
            <div className="text-xs text-zinc-500">{current.sectionLabel}</div>
            <h1 className="text-xl font-semibold mt-0.5">{current.title}</h1>
            {current.description && (
              <p className="text-sm text-zinc-600 mt-1">{current.description}</p>
            )}
          </header>
        )}
        <div className="px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
