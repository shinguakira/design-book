import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Compass } from 'lucide-react'
import { flatEntries } from '../registry'
import { metaOf } from '../sectionMeta'

export default function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const tokens = pathname
    .toLowerCase()
    .split(/[/\-_]/)
    .filter(Boolean)

  const suggestions = flatEntries
    .map((e) => {
      const blob = `${e.title} ${e.description ?? ''} ${e.sectionLabel} ${e.slug}`.toLowerCase()
      const score = tokens.reduce(
        (s, t) => s + (blob.includes(t) ? t.length : 0),
        0,
      )
      return { e, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.e)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <section className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 border border-zinc-200">
        <div
          aria-hidden
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 opacity-40 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-gradient-to-br from-amber-300 to-orange-300 opacity-40 blur-2xl"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white px-3 py-1 text-xs font-medium text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            404 Not Found
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight text-zinc-900">
            そのページは見つかりませんでした
          </h1>
          <p className="text-sm text-zinc-700 mt-3 max-w-xl">
            URLが間違っているか、削除された可能性があります。
            タブまたは検索から再度たどってください。
          </p>
          <div className="mt-4 inline-block max-w-full overflow-x-auto rounded-md bg-white/80 backdrop-blur border border-white px-3 py-1.5 text-xs font-mono text-zinc-700">
            {pathname}
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
            >
              <Home className="w-4 h-4" />
              ホームへ戻る
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-md bg-white border border-zinc-300 text-sm font-medium hover:bg-zinc-50"
            >
              <ArrowLeft className="w-4 h-4" />
              前のページへ
            </button>
          </div>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-zinc-500" />
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              もしかして
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((e) => {
              const meta = metaOf(e.sectionId)
              return (
                <li key={`${e.sectionId}-${e.slug}`}>
                  <Link
                    to={`/${e.sectionId}/${e.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 hover:border-zinc-400 hover:shadow-sm transition"
                  >
                    <div
                      className={`w-8 h-8 rounded-md bg-gradient-to-br ${meta.gradient} flex items-center justify-center shrink-0`}
                    >
                      <meta.Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{e.title}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        {e.sectionLabel}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
