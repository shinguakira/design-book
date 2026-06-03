import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { sections, flatEntries, type Section } from '../registry'

type ViewId =
  | 'all'
  | 'components'
  | 'design'
  | 'color'
  | 'animation'
  | 'scenarios'

const VIEWS: { id: ViewId; label: string; sectionIds: string[] | null }[] = [
  { id: 'all', label: 'All', sectionIds: null },
  {
    id: 'components',
    label: 'Components',
    sectionIds: ['form', 'display', 'overlay', 'navigation', 'files'],
  },
  {
    id: 'design',
    label: 'Design',
    sectionIds: ['styles', 'layout', 'screens', 'ideas'],
  },
  { id: 'color', label: 'Color', sectionIds: ['color'] },
  { id: 'animation', label: 'Animation', sectionIds: ['animation'] },
  {
    id: 'scenarios',
    label: 'Scenarios',
    sectionIds: ['scenarios', 'messaging'],
  },
]

const deriveView = (pathname: string): ViewId => {
  const seg = pathname.split('/')[1]
  if (!seg) return 'all'
  for (const v of VIEWS) {
    if (v.sectionIds?.includes(seg)) return v.id
  }
  return 'all'
}

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [view, setView] = useState<ViewId>(() => deriveView(pathname))

  useEffect(() => {
    const seg = pathname.split('/')[1]
    if (!seg) return
    setView(deriveView(pathname))
  }, [pathname])

  const current = flatEntries.find(
    (e) => `/${e.sectionId}/${e.slug}` === pathname,
  )

  const viewSections = useMemo<Section[]>(() => {
    const v = VIEWS.find((x) => x.id === view)!
    if (!v.sectionIds) return sections
    return sections.filter((s) => v.sectionIds!.includes(s.id))
  }, [view])

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return viewSections
    return viewSections
      .map((s) => ({
        ...s,
        entries: s.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description?.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.entries.length > 0)
  }, [query, viewSections])

  const onTabClick = (id: ViewId) => {
    setView(id)
    setQuery('')
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full bg-zinc-50 text-zinc-900">
      <header className="flex items-center gap-6 border-b border-zinc-200 bg-white px-6 h-14 shrink-0">
        <NavLink to="/" className="flex items-baseline gap-2 shrink-0 whitespace-nowrap">
          <span className="text-base font-semibold">Design Book</span>
          <span className="text-xs text-zinc-400 hidden lg:inline">
            my design playground
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 shrink-0">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onTabClick(v.id)}
              className={`px-3 h-8 rounded-md text-sm font-medium transition ${
                view === v.id
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {v.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="relative w-72 max-w-full">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`検索 (${view === 'all' ? '全体' : VIEWS.find((v) => v.id === view)?.label}) ...`}
            className="w-full rounded-md border border-zinc-300 bg-white pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
            ⌕
          </span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white overflow-y-auto">
          <nav className="px-3 py-4 space-y-5">
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
            <Outlet context={{ visibleSections: viewSections, view }} />
          </div>
        </main>
      </div>
    </div>
  )
}
