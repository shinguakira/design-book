import { Link, useOutletContext } from 'react-router-dom'
import { Package, Palette, Droplet, Clapperboard } from 'lucide-react'
import type { Section } from '../registry'
import { metaOf } from '../sectionMeta'

type Ctx = { visibleSections: Section[]; view: string }

function Welcome({ totalCount }: { totalCount: number }) {
  return (
    <section className="relative overflow-hidden rounded-2xl p-8 mb-10 bg-gradient-to-br from-indigo-50 via-violet-50 to-pink-50 border border-zinc-200">
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-pink-300 to-violet-300 opacity-40 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 opacity-40 blur-2xl"
      />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white px-3 py-1 text-xs font-medium text-zinc-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {totalCount} entries available
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight text-zinc-900">
          Design Book
        </h1>
        <p className="text-base text-zinc-700 mt-2 max-w-2xl">
          自分用のデザイン作品集 & リファレンス。
          コンポーネント・配色・動き・実装パターンを溜めて、いつでも引き出せる場所。
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          <div className="rounded-lg bg-white/80 backdrop-blur border border-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              使い方
            </div>
            <ul className="mt-2 text-sm text-zinc-700 space-y-1.5">
              <li>上タブで軸を切替 (Components / Design / Color / ...)</li>
              <li>右上の検索でタイトル横断ジャンプ</li>
              <li>各ページ末尾の Previous / Next で連続巡回</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/80 backdrop-blur border border-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              できること
            </div>
            <ul className="mt-2 text-sm text-zinc-700 space-y-1.5">
              <li className="flex items-start gap-2">
                <Package className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                既存UIをコピペで使い回す
              </li>
              <li className="flex items-start gap-2">
                <Palette className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                デザインスタイルを比較
              </li>
              <li className="flex items-start gap-2">
                <Droplet className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                色覚特性や文化的意味も含む配色の参考
              </li>
              <li className="flex items-start gap-2">
                <Clapperboard className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                「タブ複数でのエラー表示」など実パターン
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionBlock({ section }: { section: Section }) {
  const meta = metaOf(section.id)
  const { Icon } = meta
  return (
    <section>
      <header className="flex items-center gap-3 mb-3">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.gradient} shadow-sm flex items-center justify-center shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold tracking-tight">
            {section.label}
          </h2>
          {meta.tagline && (
            <p className="text-xs text-zinc-500 mt-0.5">{meta.tagline}</p>
          )}
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.pill} shrink-0`}
        >
          {section.entries.length}
        </span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {section.entries.map((entry) => (
          <Link
            key={entry.slug}
            to={`/${section.id}/${entry.slug}`}
            className="group relative block rounded-lg border border-zinc-200 bg-white p-4 pl-5 transition hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
          >
            <div
              className={`absolute top-3 bottom-3 left-1.5 w-0.5 rounded-full bg-gradient-to-b ${meta.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
            />
            <div className="font-medium text-sm text-zinc-900">
              {entry.title}
            </div>
            {entry.description && (
              <div className="text-xs text-zinc-500 mt-1 line-clamp-2">
                {entry.description}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const { visibleSections, view } = useOutletContext<Ctx>()
  const totalCount = visibleSections.reduce(
    (n, s) => n + s.entries.length,
    0,
  )
  const showWelcome = view === 'all'

  return (
    <div className="max-w-6xl">
      {showWelcome && <Welcome totalCount={totalCount} />}

      {!showWelcome && (
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Design Book</h1>
          <p className="text-sm text-zinc-600 mt-2">
            {totalCount} 件の項目。下のカードから選択。
          </p>
        </div>
      )}

      <div className="space-y-10">
        {visibleSections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
