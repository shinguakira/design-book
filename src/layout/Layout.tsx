import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Search } from 'lucide-react'
import { sections, flatEntries, type Section } from '../registry'
import { metaOf } from '../sectionMeta'

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

const COLLAPSE_KEY = 'db.sidebar.collapsed'

const loadCollapsed = (): Set<string> => {
  if (typeof localStorage === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(COLLAPSE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? new Set(arr) : new Set()
  } catch {
    return new Set()
  }
}

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [view, setView] = useState<ViewId>(() => deriveView(pathname))
  const [collapsed, setCollapsed] = useState<Set<string>>(() => loadCollapsed())

  useEffect(() => {
    const seg = pathname.split('/')[1]
    if (!seg) return
    setView(deriveView(pathname))
    setCollapsed((c) => {
      if (!c.has(seg)) return c
      const next = new Set(c)
      next.delete(seg)
      return next
    })
  }, [pathname])

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...collapsed]))
    } catch {
      /* ignore */
    }
  }, [collapsed])

  const toggleSection = (id: string) =>
    setCollapsed((c) => {
      const next = new Set(c)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

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

  const searching = query.trim().length > 0

  const onTabClick = (id: ViewId) => {
    setView(id)
    setQuery('')
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full bg-zinc-50 text-zinc-900">
      <header className="flex items-center gap-6 border-b border-zinc-200 bg-white px-6 h-14 shrink-0">
        <NavLink
          to="/"
          className="flex items-baseline gap-2 shrink-0 whitespace-nowrap"
        >
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
          <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`検索 (${view === 'all' ? '全体' : VIEWS.find((v) => v.id === view)?.label}) ...`}
            className="w-full rounded-md border border-zinc-300 bg-white pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white overflow-y-auto">
          <nav className="px-2 py-3 space-y-1.5">
            {filteredSections.length === 0 && (
              <div className="px-3 py-8 text-center text-xs text-zinc-400">
                該当する項目がありません
              </div>
            )}
            {filteredSections.map((section) => {
              const meta = metaOf(section.id)
              const isCollapsed = !searching && collapsed.has(section.id)
              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-2 pl-1 pr-2 h-8 rounded-md hover:bg-zinc-50 group"
                  >
                    <ChevronRight
                      className={`w-3 h-3 text-zinc-400 shrink-0 transition-transform ${
                        isCollapsed ? '' : 'rotate-90'
                      }`}
                    />
                    <div
                      className={`w-5 h-5 rounded-md bg-gradient-to-br ${meta.gradient} flex items-center justify-center shrink-0`}
                    >
                      <meta.Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="flex-1 text-left text-[13px] font-semibold text-zinc-700">
                      {section.label}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${meta.pill}`}
                    >
                      {section.entries.length}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <ul className="mt-0.5 mb-1 pl-3 space-y-px relative">
                      <div className="absolute left-3 top-0.5 bottom-0.5 w-px bg-zinc-100" />
                      {section.entries.map((entry) => {
                        const path = `/${section.id}/${entry.slug}`
                        return (
                          <li key={entry.slug}>
                            <NavLink
                              to={path}
                              className={({ isActive }) =>
                                [
                                  'group relative flex items-center pl-4 pr-2 py-1 rounded-md text-[13px] transition',
                                  isActive
                                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                                    : `text-zinc-600 hover:text-zinc-900 ${meta.hover}`,
                                ].join(' ')
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <span
                                    className={`absolute left-0 top-1 bottom-1 w-0.5 rounded-full ${
                                      isActive ? meta.bar : 'bg-transparent'
                                    }`}
                                  />
                                  <span className="truncate">{entry.title}</span>
                                </>
                              )}
                            </NavLink>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
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
