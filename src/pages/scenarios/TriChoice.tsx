import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Filter,
  LayoutGrid,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

type Val = 'all' | 'on' | 'off'

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
      <div className="p-5">{children}</div>
    </div>
  )
}

/* ─── 1. Basic segmented ─── */
function BasicSegmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="inline-flex rounded-md border border-zinc-300 bg-white overflow-hidden">
      {opts.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1.5 text-sm capitalize transition-colors ${
            i > 0 ? 'border-l border-zinc-300' : ''
          } ${
            v === o
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ─── 2. Pill segmented with sliding indicator ─── */
function PillSlide({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  const i = opts.indexOf(v)
  return (
    <div className="inline-flex relative rounded-full bg-zinc-100 p-1">
      <div
        className="absolute top-1 bottom-1 w-1/3 rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: `translateX(${i * 100}%)`, width: 'calc(33.333% - 0px)' }}
      />
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`relative px-4 py-1.5 text-sm capitalize font-medium transition-colors ${
            v === o ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ─── 3. Radio row ─── */
function RadioRow({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="flex gap-5">
      {opts.map((o) => (
        <label key={o} className="flex items-center gap-2 cursor-pointer">
          <span
            className={`w-4 h-4 rounded-full border-2 grid place-items-center ${
              v === o ? 'border-zinc-900' : 'border-zinc-300'
            }`}
          >
            {v === o && <span className="w-2 h-2 rounded-full bg-zinc-900" />}
          </span>
          <input
            type="radio"
            checked={v === o}
            onChange={() => s(o)}
            className="sr-only"
          />
          <span className="text-sm capitalize">{o}</span>
        </label>
      ))}
    </div>
  )
}

/* ─── 4. Radio cards (vertical) ─── */
function RadioCards({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; title: string; desc: string }[] = [
    { val: 'all', title: 'All', desc: '両方を表示 (デフォルト)' },
    { val: 'on', title: 'On だけ', desc: '有効なものだけ' },
    { val: 'off', title: 'Off だけ', desc: '無効なものだけ' },
  ]
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <button
          key={it.val}
          onClick={() => s(it.val)}
          className={`w-full text-left flex items-start gap-3 rounded-lg border p-3 transition-colors ${
            v === it.val
              ? 'border-zinc-900 bg-zinc-50'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <span
            className={`mt-0.5 w-4 h-4 rounded-full border-2 grid place-items-center flex-none ${
              v === it.val ? 'border-zinc-900' : 'border-zinc-300'
            }`}
          >
            {v === it.val && <span className="w-2 h-2 rounded-full bg-zinc-900" />}
          </span>
          <div>
            <div className="text-sm font-medium">{it.title}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{it.desc}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

/* ─── 5. Chip filter group ─── */
function ChipFilter({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-3 py-1 rounded-full text-sm capitalize border transition-colors ${
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

/* ─── 6. Underline tabs ─── */
function UnderlineTabs({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="flex gap-6 border-b border-zinc-200">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`pb-2 text-sm capitalize transition-colors relative ${
            v === o ? 'text-zinc-900 font-medium' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          {o}
          {v === o && (
            <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-zinc-900" />
          )}
        </button>
      ))}
    </div>
  )
}

/* ─── 7. Filled tabs ─── */
function FilledTabs({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="inline-flex gap-1 rounded-lg bg-zinc-100 p-1">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1.5 rounded-md text-sm capitalize font-medium transition-all ${
            v === o
              ? 'bg-white text-zinc-900 shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ─── 8. Dropdown / Select ─── */
function DropdownSelect({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="relative inline-block">
      <select
        value={v}
        onChange={(e) => s(e.target.value as Val)}
        className="appearance-none rounded-md border border-zinc-300 bg-white pl-3 pr-9 py-1.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-zinc-900"
      >
        {opts.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    </div>
  )
}

/* ─── 9. Cycle button (single button cycles) ─── */
function CycleButton({ v, s }: { v: Val; s: (v: Val) => void }) {
  const order: Val[] = ['all', 'on', 'off']
  const next = () => s(order[(order.indexOf(v) + 1) % 3])
  const label = { all: 'All', on: 'On only', off: 'Off only' }[v]
  const Icon = v === 'all' ? LayoutGrid : v === 'on' ? Eye : EyeOff
  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"
    >
      <Icon className="w-4 h-4" />
      {label}
      <span className="text-xs text-zinc-400 ml-2">▸ cycle</span>
    </button>
  )
}

/* ─── 10. Slider with 3 tick stops ─── */
function TickSlider({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['off', 'all', 'on']
  const i = opts.indexOf(v)
  return (
    <div>
      <div className="relative w-64 h-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-200 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-zinc-900 rounded-full transition-all"
          style={{ left: 0, width: `${(i / 2) * 100}%` }}
        />
        {opts.map((o, k) => (
          <button
            key={o}
            onClick={() => s(o)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white"
            style={{
              left: `${(k / 2) * 100}%`,
              borderColor: i === k ? '#18181b' : '#d4d4d8',
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between w-64 text-[11px] text-zinc-500 capitalize">
        {opts.map((o) => (
          <span key={o}>{o}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── 11. Split emphasis: [All][On|Off] ─── */
function SplitEmphasis({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => s('all')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-colors ${
          v === 'all'
            ? 'bg-zinc-900 text-white border-zinc-900'
            : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
        }`}
      >
        All
      </button>
      <div className="text-zinc-300">|</div>
      <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
        {(['on', 'off'] as Val[]).map((o, i) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`px-3 py-1.5 text-sm capitalize ${
              i > 0 ? 'border-l border-zinc-300' : ''
            } ${
              v === o ? 'bg-zinc-100 text-zinc-900 font-medium' : 'bg-white text-zinc-600'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── 12. Icon-only segmented ─── */
function IconSegmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; Icon: typeof LayoutGrid; label: string }[] = [
    { val: 'all', Icon: LayoutGrid, label: 'All' },
    { val: 'on', Icon: ToggleRight, label: 'On' },
    { val: 'off', Icon: ToggleLeft, label: 'Off' },
  ]
  return (
    <div className="inline-flex rounded-md border border-zinc-300 bg-white overflow-hidden">
      {items.map((it, i) => (
        <button
          key={it.val}
          onClick={() => s(it.val)}
          title={it.label}
          className={`p-2 transition-colors ${
            i > 0 ? 'border-l border-zinc-300' : ''
          } ${v === it.val ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
        >
          <it.Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}

/* ─── 13. Icon + label + count ─── */
function CountedSegmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; label: string; count: number }[] = [
    { val: 'all', label: 'All', count: 128 },
    { val: 'on', label: 'On', count: 94 },
    { val: 'off', label: 'Off', count: 34 },
  ]
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 gap-1">
      {items.map((it) => (
        <button
          key={it.val}
          onClick={() => s(it.val)}
          className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 transition-colors ${
            v === it.val ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <span className="font-medium">{it.label}</span>
          <span
            className={`text-[11px] rounded-full px-1.5 py-0.5 ${
              v === it.val ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-600'
            }`}
          >
            {it.count}
          </span>
        </button>
      ))}
    </div>
  )
}

/* ─── 14. Tri-state checkbox (indeterminate = All) ─── */
function TriCheckbox({ v, s }: { v: Val; s: (v: Val) => void }) {
  const nextMap: Record<Val, Val> = { all: 'on', on: 'off', off: 'all' }
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => s(nextMap[v])}
        aria-checked={v === 'on' ? 'true' : v === 'off' ? 'false' : 'mixed'}
        role="checkbox"
        className={`w-5 h-5 rounded border-2 grid place-items-center transition-colors ${
          v === 'on'
            ? 'border-emerald-600 bg-emerald-600'
            : v === 'off'
            ? 'border-zinc-300 bg-white'
            : 'border-amber-500 bg-amber-500'
        }`}
      >
        {v === 'on' && <Check className="w-3.5 h-3.5 text-white" />}
        {v === 'all' && <span className="w-2.5 h-0.5 bg-white" />}
      </button>
      <div>
        <div className="text-sm font-medium capitalize">{v}</div>
        <div className="text-xs text-zinc-500">クリックで循環 (all → on → off)</div>
      </div>
    </div>
  )
}

/* ─── 15. Menu-bar style (macOS finder tri) ─── */
function MenuBar({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-zinc-900 p-1">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-3 py-1 rounded text-xs capitalize font-medium tracking-wide transition-colors ${
            v === o ? 'bg-white text-zinc-900' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ─── 16. Filter-header + inline row ─── */
function FilterHeader({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-1.5">
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Filter className="w-3.5 h-3.5" />
        Status
      </div>
      <div className="w-px h-4 bg-zinc-200" />
      <div className="flex gap-1">
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`px-2 py-0.5 rounded text-xs capitalize transition-colors ${
              v === o
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── 17. Vertical list (settings-style) ─── */
function VerticalList({ v, s }: { v: Val; s: (v: Val) => void }) {
  const opts: Val[] = ['all', 'on', 'off']
  return (
    <div className="w-56 rounded-md border border-zinc-200 divide-y divide-zinc-200">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm capitalize text-left transition-colors ${
            v === o ? 'bg-zinc-50 font-medium' : 'hover:bg-zinc-50'
          }`}
        >
          <span>{o}</span>
          {v === o && <Check className="w-4 h-4 text-emerald-600" />}
        </button>
      ))}
    </div>
  )
}

/* ─── 18. Colored priority (each option owns a color) ─── */
function ColoredPriority({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; label: string; color: string; ring: string }[] = [
    { val: 'all', label: 'All', color: 'bg-zinc-500', ring: 'ring-zinc-500' },
    { val: 'on', label: 'On', color: 'bg-emerald-500', ring: 'ring-emerald-500' },
    { val: 'off', label: 'Off', color: 'bg-rose-500', ring: 'ring-rose-500' },
  ]
  return (
    <div className="flex gap-2">
      {items.map((it) => (
        <button
          key={it.val}
          onClick={() => s(it.val)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all ${
            v === it.val
              ? `border-transparent ring-2 ${it.ring} bg-white`
              : 'border-zinc-200 bg-white hover:border-zinc-300'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${it.color}`} />
          <span className="text-sm">{it.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function TriChoice() {
  const [a1, s1] = useState<Val>('all')
  const [a2, s2] = useState<Val>('all')
  const [a3, s3] = useState<Val>('all')
  const [a4, s4] = useState<Val>('all')
  const [a5, s5] = useState<Val>('all')
  const [a6, s6] = useState<Val>('all')
  const [a7, s7] = useState<Val>('all')
  const [a8, s8] = useState<Val>('all')
  const [a9, s9] = useState<Val>('all')
  const [a10, s10] = useState<Val>('all')
  const [a11, s11] = useState<Val>('all')
  const [a12, s12] = useState<Val>('all')
  const [a13, s13] = useState<Val>('all')
  const [a14, s14] = useState<Val>('all')
  const [a15, s15] = useState<Val>('all')
  const [a16, s16] = useState<Val>('all')
  const [a17, s17] = useState<Val>('all')
  const [a18, s18] = useState<Val>('all')

  return (
    <div className="max-w-5xl space-y-3">
      <p className="text-sm text-zinc-700 leading-relaxed">
        3択 [All | On | Off] の選択 UI 18パターン。All が両方見る、On/Off が
        フィルタというよくあるシナリオ。segmented / radio / chip / tab / cycle /
        slider / tri-state checkbox など。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame n={1} title="Basic segmented" note="境界線で3区切り。iOS 標準" value={a1}>
          <BasicSegmented v={a1} s={s1} />
        </Frame>
        <Frame n={2} title="Pill with sliding indicator" note="白い pill が横に滑る" value={a2}>
          <PillSlide v={a2} s={s2} />
        </Frame>
        <Frame n={3} title="Radio row" note="横並びラジオ。3-4個までなら OK" value={a3}>
          <RadioRow v={a3} s={s3} />
        </Frame>
        <Frame n={4} title="Radio cards" note="説明文付き。設定画面向き" value={a4}>
          <RadioCards v={a4} s={s4} />
        </Frame>
        <Frame n={5} title="Chip filter" note="Airbnb/Notion 系のフィルタ Chip" value={a5}>
          <ChipFilter v={a5} s={s5} />
        </Frame>
        <Frame n={6} title="Underline tabs" note="Material 準拠。切替感が強い" value={a6}>
          <UnderlineTabs v={a6} s={s6} />
        </Frame>
        <Frame n={7} title="Filled tabs" note="shadcn/ChatGPT 系。選択が白 pill" value={a7}>
          <FilledTabs v={a7} s={s7} />
        </Frame>
        <Frame n={8} title="Dropdown / Select" note="省スペース。3択でも許容" value={a8}>
          <DropdownSelect v={a8} s={s8} />
        </Frame>
        <Frame n={9} title="Cycle button" note="1ボタンで循環。ツールバー向け" value={a9}>
          <CycleButton v={a9} s={s9} />
        </Frame>
        <Frame n={10} title="3-tick slider" note="スライダーで段階選択。off ← all → on" value={a10}>
          <TickSlider v={a10} s={s10} />
        </Frame>
        <Frame n={11} title="Split emphasis" note="All を分離。他 2 と主従関係" value={a11}>
          <SplitEmphasis v={a11} s={s11} />
        </Frame>
        <Frame n={12} title="Icon-only" note="ツールバー/フィルタ帯" value={a12}>
          <IconSegmented v={a12} s={s12} />
        </Frame>
        <Frame n={13} title="Counted segmented" note="件数付き。GitHub Issues 風" value={a13}>
          <CountedSegmented v={a13} s={s13} />
        </Frame>
        <Frame n={14} title="Tri-state checkbox" note="indeterminate = All。1タップで循環" value={a14}>
          <TriCheckbox v={a14} s={s14} />
        </Frame>
        <Frame n={15} title="Menu bar (dark)" note="macOS Finder風。ダーク圧縮" value={a15}>
          <MenuBar v={a15} s={s15} />
        </Frame>
        <Frame n={16} title="Filter header + inline" note="ラベル + 選択が1行" value={a16}>
          <FilterHeader v={a16} s={s16} />
        </Frame>
        <Frame n={17} title="Vertical list" note="設定モーダルや Command Palette" value={a17}>
          <VerticalList v={a17} s={s17} />
        </Frame>
        <Frame n={18} title="Colored priority" note="各値に固有色。ステータス向け" value={a18} span>
          <ColoredPriority v={a18} s={s18} />
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選ぶ基準</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>All が「両方」なら segmented / chip / tabs — 3つ並べて即比較できる</li>
          <li>All が「未フィルタ (default)」を強調したい → Split emphasis / 別ボタン扱い</li>
          <li>ツールバーで場所ないなら Cycle button / Icon-only</li>
          <li>件数を見せたいなら Counted segmented (GitHub 系)</li>
          <li>3択なら本当は Dropdown はやり過ぎ — クリック2回になる。テーブル filter cell のような場所限定</li>
          <li>Tri-state checkbox の All=indeterminate は、UI と概念の合致が難しい (使う場面を選ぶ)</li>
        </ul>
      </section>
    </div>
  )
}
