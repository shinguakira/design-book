import { Link, useOutletContext } from 'react-router-dom'
import {
  Pencil,
  LayoutGrid,
  MessageSquare,
  Compass,
  Palette,
  Droplet,
  Sparkles,
  Clapperboard,
  Monitor,
  Lightbulb,
  Package,
  type LucideIcon,
} from 'lucide-react'
import type { Section } from '../registry'

type Ctx = { visibleSections: Section[]; view: string }

type Meta = {
  Icon: LucideIcon
  gradient: string
  tint: string
  tagline: string
}

const SECTION_META: Record<string, Meta> = {
  form: {
    Icon: Pencil,
    gradient: 'from-blue-500 to-cyan-500',
    tint: 'bg-blue-50 text-blue-700 border-blue-200',
    tagline: 'テキスト・選択・ファイル — ユーザー入力',
  },
  display: {
    Icon: LayoutGrid,
    gradient: 'from-emerald-500 to-teal-500',
    tint: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tagline: '情報を見せる — ラベル・カード・テーブル',
  },
  overlay: {
    Icon: MessageSquare,
    gradient: 'from-violet-500 to-purple-500',
    tint: 'bg-violet-50 text-violet-700 border-violet-200',
    tagline: '画面の上に重ねる — ダイアログ・通知・吹き出し',
  },
  navigation: {
    Icon: Compass,
    gradient: 'from-amber-500 to-orange-500',
    tint: 'bg-amber-50 text-amber-700 border-amber-200',
    tagline: '移動と切り替え — タブ・パンくず・ページネーション',
  },
  styles: {
    Icon: Palette,
    gradient: 'from-pink-500 to-rose-500',
    tint: 'bg-pink-50 text-pink-700 border-pink-200',
    tagline: 'デザインスタイルの比較 — Flat・Material・Glassmorphism他',
  },
  color: {
    Icon: Droplet,
    gradient: 'from-fuchsia-500 via-purple-500 to-blue-500',
    tint: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    tagline: '配色とアクセシビリティ — パレット・コントラスト・色覚特性',
  },
  animation: {
    Icon: Sparkles,
    gradient: 'from-cyan-500 to-sky-500',
    tint: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    tagline: '動きの引き出し — pulse・shake・stagger',
  },
  scenarios: {
    Icon: Clapperboard,
    gradient: 'from-orange-500 to-red-500',
    tint: 'bg-orange-50 text-orange-700 border-orange-200',
    tagline: '実プロダクトのUXパターン',
  },
  screens: {
    Icon: Monitor,
    gradient: 'from-indigo-500 to-blue-600',
    tint: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    tagline: 'ページ単位のデザイン案',
  },
  ideas: {
    Icon: Lightbulb,
    gradient: 'from-yellow-400 to-amber-500',
    tint: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    tagline: '溜まったアイデアのメモ',
  },
}

const defaultMeta: Meta = {
  Icon: Package,
  gradient: 'from-zinc-500 to-zinc-700',
  tint: 'bg-zinc-50 text-zinc-700 border-zinc-200',
  tagline: '',
}

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
              <li>右上の検索でタイトル・説明から絞り込み</li>
              <li>左サイドバーから直接ジャンプ</li>
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
  const meta = SECTION_META[section.id] ?? defaultMeta
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
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.tint} shrink-0`}
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
            {totalCount} 件の項目。サイドバーから選ぶか、下のカードから。
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
