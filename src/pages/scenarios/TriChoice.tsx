import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Val = 'all' | 'opt1' | 'opt2'
const OPTS: Val[] = ['all', 'opt1', 'opt2']
const L: Record<Val, string> = { all: 'All', opt1: 'Option 1', opt2: 'Option 2' }
const S: Record<Val, string> = { all: 'All', opt1: 'Opt 1', opt2: 'Opt 2' }

function Cell({
  n,
  title,
  axis,
  children,
}: {
  n: number
  title: string
  axis: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
      <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50">
        <div className="text-xs font-medium text-zinc-800">
          {n}. {title}
        </div>
        <div className="text-[10px] text-zinc-500">{axis}</div>
      </div>
      <div className="p-3 grid place-items-center min-h-24">{children}</div>
    </div>
  )
}

/* 1 Segmented row — canonical "all-visible, 1D horizontal, discrete cells" */
function Segmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-3 py-1 text-xs ${i > 0 ? 'border-l border-zinc-300' : ''} ${
            v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 2 Card grid — "all-visible, 2D area-weighted (each option gets big surface)" */
function CardGrid({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`rounded border-2 py-3 text-xs font-medium ${
            v === o ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-white'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 3 Text inline — "chrome-free plain text with delimiter" */
function TextInline({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {OPTS.map((o, i) => (
        <span key={o} className="flex items-center gap-2">
          {i > 0 && <span className="text-zinc-300">|</span>}
          <button
            onClick={() => s(o)}
            className={v === o ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}
          >
            {S[o]}
          </button>
        </span>
      ))}
    </div>
  )
}

/* 4 Dropdown — "collapsed to 1 label, others hidden" */
function Dropdown({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="relative inline-block">
      <select
        value={v}
        onChange={(e) => s(e.target.value as Val)}
        className="appearance-none rounded border border-zinc-300 bg-white pl-3 pr-8 py-1 text-xs"
      >
        {OPTS.map((o) => (
          <option key={o} value={o}>
            {L[o]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
    </div>
  )
}

/* 5 Cycle button — "no persistent visualization of options, 1 tap cycles" */
function CycleButton({ v, s }: { v: Val; s: (v: Val) => void }) {
  const next = () => s(OPTS[(OPTS.indexOf(v) + 1) % 3])
  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-1.5 rounded border border-zinc-300 bg-white px-3 py-1 text-xs"
    >
      {S[v]}
      <span className="text-zinc-400">↻</span>
    </button>
  )
}

/* 6 Slider — "linear position, continuous-feeling" */
function Slider({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v)
  return (
    <div>
      <div className="relative w-40 h-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-zinc-900 rounded-full"
          style={{ left: 0, width: `${(i / 2) * 100}%` }}
        />
        {OPTS.map((o, k) => (
          <button
            key={o}
            onClick={() => s(o)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 bg-white"
            style={{ left: `${(k / 2) * 100}%`, borderColor: i === k ? '#18181b' : '#d4d4d8' }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between w-40 text-[10px] text-zinc-500">
        {OPTS.map((o) => (
          <span key={o}>{S[o]}</span>
        ))}
      </div>
    </div>
  )
}

/* 7 Dial / knob — "angular position, rotational metaphor" */
function Dial({ v, s }: { v: Val; s: (v: Val) => void }) {
  const angles: Record<Val, number> = { all: 0, opt1: -60, opt2: 60 }
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-inner border-2 border-zinc-200"
        style={{ transform: `rotate(${angles[v]}deg)`, transition: 'transform 200ms' }}
      >
        <div className="absolute left-1/2 top-1 w-0.5 h-4 -translate-x-1/2 bg-zinc-900 rounded" />
      </div>
      <div className="flex flex-col gap-0.5 text-[10px]">
        {OPTS.map((o) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`text-left ${v === o ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}
          >
            {S[o]}
          </button>
        ))}
      </div>
    </div>
  )
}

/* 8 Wheel picker — "vertical drum scroll (iOS style)" */
function WheelPicker({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v)
  return (
    <div className="relative w-24 h-20 rounded-md bg-gradient-to-b from-zinc-100 via-white to-zinc-100 overflow-hidden border border-zinc-200">
      <div
        className="absolute left-0 right-0 transition-transform"
        style={{ transform: `translateY(${(1 - i) * 24}px)`, top: '50%', marginTop: -12 }}
      >
        {OPTS.map((o) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`h-6 flex items-center justify-center w-full text-xs ${
              v === o ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
            }`}
          >
            {S[o]}
          </button>
        ))}
      </div>
      <div className="absolute inset-x-2 top-1/2 h-6 -translate-y-1/2 rounded pointer-events-none border-y border-zinc-300" />
    </div>
  )
}

/* 9 Radial / pie menu — "3 wedges arranged around a center" */
function RadialMenu({ v, s }: { v: Val; s: (v: Val) => void }) {
  const labelPos = (a: number, r: number) => {
    const rad = (a * Math.PI) / 180
    return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) }
  }
  const wedge = (start: number, end: number) => {
    const s1 = ((start - 90) * Math.PI) / 180
    const s2 = ((end - 90) * Math.PI) / 180
    const x1 = 50 + 45 * Math.cos(s1)
    const y1 = 50 + 45 * Math.sin(s1)
    const x2 = 50 + 45 * Math.cos(s2)
    const y2 = 50 + 45 * Math.sin(s2)
    return `M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`
  }
  const wedges: { val: Val; d: string; label: { x: number; y: number } }[] = [
    { val: 'all', d: wedge(-60, 60), label: labelPos(-90, 30) },
    { val: 'opt1', d: wedge(60, 180), label: labelPos(30, 30) },
    { val: 'opt2', d: wedge(180, 300), label: labelPos(150, 30) },
  ]
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      {wedges.map((w) => (
        <g key={w.val}>
          <path
            d={w.d}
            fill={v === w.val ? '#18181b' : '#f4f4f5'}
            stroke="#e4e4e7"
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => s(w.val)}
          />
          <text
            x={w.label.x}
            y={w.label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill={v === w.val ? 'white' : '#71717a'}
            style={{ pointerEvents: 'none' }}
          >
            {S[w.val]}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* 10 Venn / set diagram — "All = intersection, options = wings" */
function VennDiagram({ v, s }: { v: Val; s: (v: Val) => void }) {
  const active = (target: Val) => v === target
  return (
    <svg viewBox="0 0 140 80" className="w-40 h-24">
      <circle
        cx="55"
        cy="40"
        r="30"
        fill={active('opt1') ? 'rgba(24,24,27,0.9)' : 'rgba(24,24,27,0.15)'}
        stroke="#18181b"
        strokeWidth="1"
        onClick={() => s('opt1')}
        className="cursor-pointer"
      />
      <circle
        cx="85"
        cy="40"
        r="30"
        fill={active('opt2') ? 'rgba(24,24,27,0.9)' : 'rgba(24,24,27,0.15)'}
        stroke="#18181b"
        strokeWidth="1"
        onClick={() => s('opt2')}
        className="cursor-pointer"
      />
      <path
        d="M70 15 A 30 30 0 0 1 70 65 A 30 30 0 0 1 70 15 Z"
        fill={active('all') ? '#f43f5e' : 'transparent'}
        onClick={() => s('all')}
        className="cursor-pointer"
      />
      <text x="40" y="43" fontSize="7" fill={active('opt1') ? 'white' : '#3f3f46'} textAnchor="middle" style={{pointerEvents:'none'}}>Opt 1</text>
      <text x="100" y="43" fontSize="7" fill={active('opt2') ? 'white' : '#3f3f46'} textAnchor="middle" style={{pointerEvents:'none'}}>Opt 2</text>
      <text x="70" y="43" fontSize="7" fill={active('all') ? 'white' : '#3f3f46'} textAnchor="middle" style={{pointerEvents:'none'}}>All</text>
    </svg>
  )
}

/* 11 Asymmetric split — "All is dominant / separated from the Option pair" */
function AsymmetricSplit({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => s('all')}
        className={`px-3 py-1 rounded-md text-xs font-medium border ${
          v === 'all'
            ? 'bg-zinc-900 text-white border-zinc-900'
            : 'bg-white text-zinc-700 border-zinc-300'
        }`}
      >
        All
      </button>
      <span className="text-zinc-300 text-xs">or</span>
      <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
        {(['opt1', 'opt2'] as Val[]).map((o, i) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`px-2 py-1 text-xs ${i > 0 ? 'border-l border-zinc-300' : ''} ${
              v === o ? 'bg-zinc-100 text-zinc-900 font-medium' : 'bg-white text-zinc-600'
            }`}
          >
            {S[o]}
          </button>
        ))}
      </div>
    </div>
  )
}

/* 12 Z-stack cards — "3 depth-stacked, selected pulls to front" */
function ZStack({ v, s }: { v: Val; s: (v: Val) => void }) {
  const zIndex: Record<Val, number> = {
    all: v === 'all' ? 3 : 1,
    opt1: v === 'opt1' ? 3 : 2,
    opt2: v === 'opt2' ? 3 : 2,
  }
  const items: { val: Val; offset: number; base: string }[] = [
    { val: 'opt2', offset: 24, base: 'bg-blue-100 border-blue-300 text-blue-900' },
    { val: 'opt1', offset: 12, base: 'bg-amber-100 border-amber-300 text-amber-900' },
    { val: 'all', offset: 0, base: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
  ]
  return (
    <div className="relative w-32 h-20">
      {items.map((it) => {
        const active = v === it.val
        return (
          <button
            key={it.val}
            onClick={() => s(it.val)}
            className={`absolute rounded border text-xs w-28 h-14 font-medium transition-transform ${it.base}`}
            style={{
              left: it.offset,
              top: it.offset,
              zIndex: zIndex[it.val],
              transform: active ? 'translateY(-6px) scale(1.05)' : 'none',
              boxShadow: active ? '0 6px 12px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {S[it.val]}
          </button>
        )
      })}
    </div>
  )
}

export default function TriChoice() {
  const [a, sA] = useState<Val[]>(Array(12).fill('all'))
  const set = (i: number) => (val: Val) => sA((prev) => prev.map((p, k) => (k === i ? val : p)))

  const patterns: {
    title: string
    axis: string
    render: (v: Val, s: (v: Val) => void) => React.ReactNode
  }[] = [
    { title: 'Segmented row', axis: '横1D · 全可視 · 離散セル', render: (v, s) => <Segmented v={v} s={s} /> },
    { title: 'Card grid', axis: '2D · 面積重み · 全可視', render: (v, s) => <CardGrid v={v} s={s} /> },
    { title: 'Text inline', axis: 'chrome なし · テキスト＋区切り', render: (v, s) => <TextInline v={v} s={s} /> },
    { title: 'Dropdown', axis: '1つに畳む · 他は隠す', render: (v, s) => <Dropdown v={v} s={s} /> },
    { title: 'Cycle button', axis: '永続表示なし · タップで循環', render: (v, s) => <CycleButton v={v} s={s} /> },
    { title: 'Slider (3-stop)', axis: '直線位置で示す', render: (v, s) => <Slider v={v} s={s} /> },
    { title: 'Dial / knob', axis: '角度で示す · 回転メタファ', render: (v, s) => <Dial v={v} s={s} /> },
    { title: 'Wheel picker', axis: 'ドラムスクロール (iOS)', render: (v, s) => <WheelPicker v={v} s={s} /> },
    { title: 'Radial / pie menu', axis: '中心から放射状 · 3 wedge', render: (v, s) => <RadialMenu v={v} s={s} /> },
    { title: 'Venn diagram', axis: '集合で示す · All=交差', render: (v, s) => <VennDiagram v={v} s={s} /> },
    { title: 'Asymmetric split', axis: '非対称 · All を主 / Option を従', render: (v, s) => <AsymmetricSplit v={v} s={s} /> },
    { title: 'Z-stack cards', axis: '奥行きで示す · 最前面が選択', render: (v, s) => <ZStack v={v} s={s} /> },
  ]

  return (
    <div className="max-w-6xl space-y-3">
      <p className="text-sm text-zinc-700">
        3択 [All | Option 1 | Option 2] の <b>構造</b> パターン12種。
        「単に3つ横並び」を1個に集約し、他は
        1D→2D→畳む→循環→線→角→ドラム→放射→集合→非対称→奥行き と、置き方の
        軸そのものを変えたもの。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {patterns.map((p, i) => (
          <Cell key={i} n={i + 1} title={p.title} axis={p.axis}>
            {p.render(a[i], set(i))}
          </Cell>
        ))}
      </div>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">見せ方の軸</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>選択肢を全部見せるか (Segmented / Card / Venn) vs 畳むか (Dropdown / Cycle)</li>
          <li>離散 (button/tab) vs 連続的 (Slider / Dial / Wheel)</li>
          <li>直交 (row/column) vs 放射 (Radial / Dial / Wheel)</li>
          <li>対称 (どれも等価) vs 非対称 (All が特別 = Asymmetric split / Venn)</li>
          <li>2D 表現 (Card / Venn / Z-stack) vs 1D 表現 (Segmented / Slider)</li>
          <li>抽象 (buttons) vs 物理メタファ (Dial / Wheel / Z-stack)</li>
        </ul>
        <div className="mt-2 text-[11px] text-blue-800">
          省いたもの: rounded/pill/underline/chip/inline-slash など、
          「Segmented の見た目バリエ」でしかないもの。構造は同一なので1個で代表。
        </div>
      </section>
    </div>
  )
}
