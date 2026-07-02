import { useState } from 'react'
import { ChevronDown, Eye, EyeOff, LayoutGrid } from 'lucide-react'

type Val = 'all' | 'on' | 'off'
const OPTS: Val[] = ['all', 'on', 'off']

function Frame({
  n,
  title,
  note,
  value,
  children,
  span,
}: {
  n: number
  title: string
  note?: string
  value: Val
  children: React.ReactNode
  span?: boolean
}) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white overflow-hidden ${
        span ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">
            {n}. {title}
          </div>
          {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
        </div>
        <span className="text-[11px] font-mono bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-600">
          {value}
        </span>
      </div>
      <div className="p-5 grid place-items-center min-h-24">{children}</div>
    </div>
  )
}

/* 1. connected segmented — 3 cells touching */
function Segmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1.5 text-sm capitalize ${
            i > 0 ? 'border-l border-zinc-300' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 2. rounded pill segmented */
function PillSegmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-full border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-5 py-1.5 text-sm capitalize ${
            i > 0 ? 'border-l border-zinc-300' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 3. sliding pill indicator */
function SlidingPill({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v)
  return (
    <div className="inline-flex relative rounded-full bg-zinc-100 p-1">
      <div
        className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-transform"
        style={{ left: 4, width: 'calc((100% - 8px) / 3)', transform: `translateX(${i * 100}%)` }}
      />
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`relative w-20 py-1 text-sm capitalize font-medium ${
            v === o ? 'text-zinc-900' : 'text-zinc-500'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 4. separated buttons with gap */
function SeparatedButtons({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-2">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1.5 rounded-md border text-sm capitalize ${
            v === o
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 5. text-only inline with pipe separator */
function TextInline({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {OPTS.map((o, i) => (
        <span key={o} className="flex items-center gap-3">
          {i > 0 && <span className="text-zinc-300">|</span>}
          <button
            onClick={() => s(o)}
            className={`capitalize ${
              v === o ? 'text-zinc-900 font-semibold underline underline-offset-4' : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {o}
          </button>
        </span>
      ))}
    </div>
  )
}

/* 6. radio row — 3 circles + labels */
function RadioRow({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-6">
      {OPTS.map((o) => (
        <label key={o} className="flex items-center gap-2 cursor-pointer">
          <span
            className={`w-4 h-4 rounded-full border-2 grid place-items-center ${
              v === o ? 'border-zinc-900' : 'border-zinc-300'
            }`}
          >
            {v === o && <span className="w-2 h-2 rounded-full bg-zinc-900" />}
          </span>
          <input type="radio" checked={v === o} onChange={() => s(o)} className="sr-only" />
          <span className="text-sm capitalize">{o}</span>
        </label>
      ))}
    </div>
  )
}

/* 7. chip pills — independent rounded */
function ChipPills({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-2">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1 rounded-full text-sm capitalize border ${
            v === o
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 8. underline tabs — bottom border for active */
function UnderlineTabs({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-6 border-b border-zinc-200 w-64 justify-center">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`pb-2 text-sm capitalize relative ${
            v === o ? 'text-zinc-900 font-medium' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          {o}
          {v === o && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-zinc-900" />}
        </button>
      ))}
    </div>
  )
}

/* 9. filled pill tabs — active = white pill on gray track */
function FilledPill({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex gap-1 rounded-lg bg-zinc-100 p-1">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1.5 rounded-md text-sm capitalize font-medium ${
            v === o ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 10. dropdown / native select */
function Dropdown({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="relative inline-block">
      <select
        value={v}
        onChange={(e) => s(e.target.value as Val)}
        className="appearance-none rounded-md border border-zinc-300 bg-white pl-3 pr-9 py-1.5 text-sm capitalize"
      >
        {OPTS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    </div>
  )
}

/* 11. cycle button — 1 button cycles all→on→off */
function CycleButton({ v, s }: { v: Val; s: (v: Val) => void }) {
  const next = () => s(OPTS[(OPTS.indexOf(v) + 1) % 3])
  const Icon = v === 'all' ? LayoutGrid : v === 'on' ? Eye : EyeOff
  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-1.5 text-sm hover:bg-zinc-50 capitalize"
    >
      <Icon className="w-4 h-4" />
      {v}
    </button>
  )
}

/* 12. 3-tick slider */
function TickSlider({ v, s }: { v: Val; s: (v: Val) => void }) {
  const order: Val[] = ['off', 'all', 'on']
  const i = order.indexOf(v)
  return (
    <div>
      <div className="relative w-64 h-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-200 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-zinc-900 rounded-full"
          style={{ left: 0, width: `${(i / 2) * 100}%` }}
        />
        {order.map((o, k) => (
          <button
            key={o}
            onClick={() => s(o)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white"
            style={{ left: `${(k / 2) * 100}%`, borderColor: i === k ? '#18181b' : '#d4d4d8' }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between w-64 text-[11px] text-zinc-500 capitalize">
        {order.map((o) => (
          <span key={o}>{o}</span>
        ))}
      </div>
    </div>
  )
}

/* 13. icon-only segmented */
function IconOnly({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items = [
    { val: 'all' as Val, Icon: LayoutGrid },
    { val: 'on' as Val, Icon: Eye },
    { val: 'off' as Val, Icon: EyeOff },
  ]
  return (
    <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
      {items.map((it, i) => (
        <button
          key={it.val}
          onClick={() => s(it.val)}
          className={`p-2 ${
            i > 0 ? 'border-l border-zinc-300' : ''
          } ${v === it.val ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}
        >
          <it.Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}

/* 14. 3-position sliding switch */
function ThreePosSwitch({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v)
  return (
    <div>
      <div className="relative w-48 h-10 rounded-full bg-zinc-800 p-1 cursor-pointer">
        <div
          className="absolute top-1 h-8 w-14 rounded-full bg-white transition-transform"
          style={{ left: 4, transform: `translateX(${i * 100}%)` }}
        />
        {OPTS.map((o, k) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`absolute top-1 h-8 w-14 rounded-full text-sm capitalize font-medium ${
              v === o ? 'text-zinc-900' : 'text-zinc-400'
            }`}
            style={{ left: 4 + k * 56 }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

/* 15. vertical stack — labels stacked, active is filled */
function VerticalStack({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="w-44 rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`w-full px-4 py-2 text-sm capitalize text-left ${
            i > 0 ? 'border-t border-zinc-200' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 16. card grid — 3 wide cards side by side, active raises */
function CardGrid({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`rounded-lg border-2 py-6 text-sm capitalize font-medium transition-all ${
            v === o
              ? 'border-zinc-900 bg-zinc-50 shadow-md -translate-y-0.5'
              : 'border-zinc-200 bg-white hover:border-zinc-300'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 17. colored dot indicator — just dot + label */
function DotIndicator({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-6">
      {OPTS.map((o) => (
        <button key={o} onClick={() => s(o)} className="inline-flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full transition-all ${
              v === o ? 'bg-zinc-900 scale-100' : 'bg-zinc-300 scale-75'
            }`}
          />
          <span
            className={`text-sm capitalize ${
              v === o ? 'text-zinc-900 font-medium' : 'text-zinc-400'
            }`}
          >
            {o}
          </span>
        </button>
      ))}
    </div>
  )
}

/* 18. bracket wrap — active option wrapped in [ ] */
function BracketWrap({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-4 font-mono text-lg">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`capitalize ${v === o ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
        >
          {v === o ? `[${o}]` : ` ${o} `}
        </button>
      ))}
    </div>
  )
}

/* 19. vertical segmented column */
function VerticalSegmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex flex-col rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-6 py-1.5 text-sm capitalize ${
            i > 0 ? 'border-t border-zinc-300' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* 20. minimal — only active shows, others faded to gray hint */
function OnlyActive({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-baseline gap-4">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`capitalize transition-all ${
            v === o
              ? 'text-2xl font-bold text-zinc-900'
              : 'text-sm text-zinc-300 hover:text-zinc-500'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function TriChoice() {
  const [a, sA] = useState<Val[]>(Array(20).fill('all'))
  const set = (i: number) => (val: Val) => sA((prev) => prev.map((p, k) => (k === i ? val : p)))

  const patterns: { title: string; note: string; render: (v: Val, s: (v: Val) => void) => React.ReactNode; span?: boolean }[] = [
    { title: 'Connected segmented', note: '境界線で連結した3セル。iOS 標準', render: (v, s) => <Segmented v={v} s={s} /> },
    { title: 'Rounded pill segmented', note: 'segmented の丸角版', render: (v, s) => <PillSegmented v={v} s={s} /> },
    { title: 'Sliding pill', note: 'アクティブ pill が横に滑る', render: (v, s) => <SlidingPill v={v} s={s} /> },
    { title: 'Separated buttons', note: '3ボタンに隙間、独立感', render: (v, s) => <SeparatedButtons v={v} s={s} /> },
    { title: 'Text inline w/ pipe', note: 'テキストだけを | で区切る', render: (v, s) => <TextInline v={v} s={s} /> },
    { title: 'Radio row', note: '丸 + ラベル', render: (v, s) => <RadioRow v={v} s={s} /> },
    { title: 'Chip pills', note: '独立した丸チップ 3個', render: (v, s) => <ChipPills v={v} s={s} /> },
    { title: 'Underline tabs', note: 'テキスト下線で示す', render: (v, s) => <UnderlineTabs v={v} s={s} /> },
    { title: 'Filled pill (in track)', note: '白 pill が gray track に乗る', render: (v, s) => <FilledPill v={v} s={s} /> },
    { title: 'Dropdown / Select', note: '1行に畳む', render: (v, s) => <Dropdown v={v} s={s} /> },
    { title: 'Cycle button', note: '1つのボタンで循環', render: (v, s) => <CycleButton v={v} s={s} /> },
    { title: '3-tick slider', note: 'スライダーの3スナップ位置', render: (v, s) => <TickSlider v={v} s={s} /> },
    { title: 'Icon only', note: '3アイコンで表す', render: (v, s) => <IconOnly v={v} s={s} /> },
    { title: '3-position sliding switch', note: 'トグルの3段版', render: (v, s) => <ThreePosSwitch v={v} s={s} /> },
    { title: 'Vertical stack', note: '縦に積む', render: (v, s) => <VerticalStack v={v} s={s} /> },
    { title: 'Vertical segmented', note: '縦 segmented (narrow)', render: (v, s) => <VerticalSegmented v={v} s={s} /> },
    { title: 'Card grid (3 wide)', note: '大きな箱を並べる', render: (v, s) => <CardGrid v={v} s={s} />, span: true },
    { title: 'Dot indicator', note: '丸 + テキスト、丸で示す', render: (v, s) => <DotIndicator v={v} s={s} /> },
    { title: 'Bracket wrap', note: '選択中を [ ] で囲む', render: (v, s) => <BracketWrap v={v} s={s} /> },
    { title: 'Emphasize active only', note: '選択中だけ大きく、他は小さく灰色', render: (v, s) => <OnlyActive v={v} s={s} /> },
  ]

  return (
    <div className="max-w-5xl space-y-3">
      <p className="text-sm text-zinc-700 leading-relaxed">
        3択 [All | On | Off] の <b>表現</b> パターン20種。装飾 (件数バッジ / 説明文 /
        チェックマーク) は排除して、「3つの選択肢をどう置くか」だけに絞った。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {patterns.map((p, i) => (
          <Frame key={i} n={i + 1} title={p.title} note={p.note} value={a[i]} span={p.span}>
            {p.render(a[i], set(i))}
          </Frame>
        ))}
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">分類</div>
        <ul className="list-disc pl-5 space-y-1">
          <li><b>3つ並列に置く</b>: segmented / pill / separated / chip / radio / tabs / filled pill / dot / bracket</li>
          <li><b>3つ縦に置く</b>: vertical stack / vertical segmented</li>
          <li><b>1つに畳む</b>: dropdown / cycle button</li>
          <li><b>位置で表す</b>: slider / 3-position switch / sliding pill</li>
          <li><b>強調度で表す</b>: emphasize active only / underline tabs / dot indicator</li>
          <li><b>面積で表す</b>: card grid</li>
        </ul>
      </section>
    </div>
  )
}
