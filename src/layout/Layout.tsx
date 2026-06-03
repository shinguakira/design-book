import { useEffect, useMemo, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
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
    sectionIds: [
      'form',
      'display',
      'overlay',
      'navigation',
      'files',
      'layout',
      'ideas',
    ],
  },
  { id: 'design', label: 'Design', sectionIds: ['styles'] },
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
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const seg = pathname.split('/')[1]
    if (!seg) return
    setView(deriveView(pathname))
  }, [pathname])

  const current = flatEntries.find(
    (e) => `/${e.sectionId}/${e.slug}` === pathname,
  )
  const currentIdx = current
    ? flatEntries.findIndex(
        (e) => `/${e.sectionId}/${e.slug}` === pathname,
      )
    : -1
  const prevEntry = currentIdx > 0 ? flatEntries[currentIdx - 1] : null
  const nextEntry =
    currentIdx >= 0 && currentIdx < flatEntries.length - 1
      ? flatEntries[currentIdx + 1]
      : null

  const viewSections = useMemo<Section[]>(() => {
    const v = VIEWS.find((x) => x.id === view)!
    if (!v.sectionIds) return sections
    return sections.filter((s) => v.sectionIds!.includes(s.id))
  }, [view])

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return flatEntries
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q) ||
          e.sectionLabel.toLowerCase().includes(q),
      )
      .slice(0, 20)
  }, [query])

  const onTabClick = (id: ViewId) => {
    setView(id)
    setQuery('')
    setSearchOpen(false)
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

        <div className="relative w-80 max-w-full">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
            placeholder="検索..."
            className="w-full rounded-md border border-zinc-300 bg-white pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          {searchOpen && query.trim() && (
            <div className="absolute top-full right-0 mt-1 w-96 max-h-96 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-xl z-50">
              {searchResults.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-zinc-400">
                  該当なし
                </div>
              ) : (
                <ul className="py-1">
                  {searchResults.map((e) => {
                    const meta = metaOf(e.sectionId)
                    return (
                      <li key={`${e.sectionId}-${e.slug}`}>
                        <Link
                          to={`/${e.sectionId}/${e.slug}`}
                          onMouseDown={(ev) => ev.preventDefault()}
                          onClick={() => {
                            setQuery('')
                            setSearchOpen(false)
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50"
                        >
                          <div
                            className={`w-6 h-6 rounded-md bg-gradient-to-br ${meta.gradient} flex items-center justify-center shrink-0`}
                          >
                            <meta.Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {e.title}
                            </div>
                            {e.description && (
                              <div className="text-xs text-zinc-500 truncate">
                                {e.description}
                              </div>
                            )}
                          </div>
                          <div
                            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${meta.pill}`}
                          >
                            {e.sectionLabel}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {current && (
          <header className="border-b border-zinc-200 bg-white px-8 pt-5 pb-6">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => {
                  const targetView =
                    VIEWS.find((v) =>
                      v.sectionIds?.includes(current.sectionId),
                    )?.id ?? 'all'
                  setView(targetView)
                  navigate('/')
                }}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition"
              >
                <ArrowLeft className="w-3 h-3" />
                {current.sectionLabel}
              </button>
              <h1 className="text-2xl font-semibold mt-1 tracking-tight">
                {current.title}
              </h1>
              {current.description && (
                <p className="text-sm text-zinc-600 mt-1">
                  {current.description}
                </p>
              )}
            </div>
          </header>
        )}
        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <Outlet context={{ visibleSections: viewSections, view }} />
          </div>
        </div>
        {current && (prevEntry || nextEntry) && (
          <nav className="border-t border-zinc-200 bg-white px-8 py-6 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prevEntry ? (
                <Link
                  to={`/${prevEntry.sectionId}/${prevEntry.slug}`}
                  className="group rounded-lg border border-zinc-200 p-4 hover:border-zinc-400 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <ArrowLeft className="w-3 h-3" />
                    Previous · {prevEntry.sectionLabel}
                  </div>
                  <div className="font-medium text-sm mt-1 group-hover:text-zinc-900">
                    {prevEntry.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextEntry ? (
                <Link
                  to={`/${nextEntry.sectionId}/${nextEntry.slug}`}
                  className="group rounded-lg border border-zinc-200 p-4 hover:border-zinc-400 hover:shadow-sm transition text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-500">
                    Next · {nextEntry.sectionLabel}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="font-medium text-sm mt-1 group-hover:text-zinc-900">
                    {nextEntry.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}
      </main>
    </div>
  )
}
