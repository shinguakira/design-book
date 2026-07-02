import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Val = 'all' | 'opt1' | 'opt2'
const OPTS: Val[] = ['all', 'opt1', 'opt2']
const L: Record<Val, string> = { all: 'All', opt1: 'Option 1', opt2: 'Option 2' }
const S: Record<Val, string> = { all: 'All', opt1: 'Opt 1', opt2: 'Opt 2' }

function Cell({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
      <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-700">
        {n}. {title}
      </div>
      <div className="p-3 grid place-items-center min-h-14">{children}</div>
    </div>
  )
}

/* 1 connected segmented */
function P1({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-2.5 py-1 text-xs ${i > 0 ? 'border-l border-zinc-300' : ''} ${
            v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 2 rounded pill segmented */
function P2({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-full border border-zinc-300 overflow-hidden">
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

/* 3 sliding pill */
function P3({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v)
  return (
    <div className="inline-flex relative rounded-full bg-zinc-100 p-0.5">
      <div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-white shadow-sm transition-transform"
        style={{ left: 2, width: 'calc((100% - 4px) / 3)', transform: `translateX(${i * 100}%)` }}
      />
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`relative w-14 py-1 text-xs ${v === o ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 4 separated buttons */
function P4({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-1.5">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-2.5 py-1 rounded border text-xs ${
            v === o
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 5 text inline with pipe */
function P5({ v, s }: { v: Val; s: (v: Val) => void }) {
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

/* 6 text inline with slash */
function P6({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {OPTS.map((o, i) => (
        <span key={o} className="flex items-center gap-1">
          {i > 0 && <span className="text-zinc-300">/</span>}
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

/* 7 radio row */
function P7({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-3">
      {OPTS.map((o) => (
        <label key={o} className="flex items-center gap-1.5 cursor-pointer">
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 grid place-items-center ${
              v === o ? 'border-zinc-900' : 'border-zinc-300'
            }`}
          >
            {v === o && <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />}
          </span>
          <input type="radio" checked={v === o} onChange={() => s(o)} className="sr-only" />
          <span className="text-xs">{S[o]}</span>
        </label>
      ))}
    </div>
  )
}

/* 8 chip pills */
function P8({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-1.5">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-2.5 py-0.5 rounded-full text-xs border ${
            v === o
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-zinc-700 border-zinc-300'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 9 underline tabs */
function P9({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-4 border-b border-zinc-200">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`pb-1.5 text-xs relative ${
            v === o ? 'text-zinc-900 font-medium' : 'text-zinc-500'
          }`}
        >
          {S[o]}
          {v === o && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-zinc-900" />}
        </button>
      ))}
    </div>
  )
}

/* 10 filled pill in track */
function P10({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex gap-0.5 rounded-md bg-zinc-100 p-0.5">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-2.5 py-1 rounded text-xs ${
            v === o ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 11 dropdown */
function P11({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="relative inline-block">
      <select
        value={v}
        onChange={(e) => s(e.target.value as Val)}
        className="appearance-none rounded border border-zinc-300 bg-white pl-2 pr-7 py-1 text-xs"
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

/* 12 cycle button */
function P12({ v, s }: { v: Val; s: (v: Val) => void }) {
  const next = () => s(OPTS[(OPTS.indexOf(v) + 1) % 3])
  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-1.5 rounded border border-zinc-300 bg-white px-2.5 py-1 text-xs"
    >
      {S[v]}
      <span className="text-zinc-400">↻</span>
    </button>
  )
}

/* 13 3-tick slider */
function P13({ v, s }: { v: Val; s: (v: Val) => void }) {
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

/* 14 vertical stack */
function P14({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="w-32 rounded border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`w-full px-2.5 py-1 text-xs text-left ${
            i > 0 ? 'border-t border-zinc-200' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'}`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 15 card grid (3 wide) */
function P15({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`rounded border-2 py-2 text-xs font-medium ${
            v === o ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-white'
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 16 bracket wrap */
function P16({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex gap-1.5 font-mono text-xs">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={v === o ? 'text-zinc-900' : 'text-zinc-400'}
        >
          {v === o ? `[${S[o]}]` : ` ${S[o]} `}
        </button>
      ))}
    </div>
  )
}

/* 17 numbered dots (1)(2)(3) */
function P17({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-medium ${
            v === o
              ? 'bg-zinc-900 text-white'
              : 'bg-white text-zinc-500 border border-zinc-300'
          }`}
          title={L[o]}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

/* 18 breadcrumb-arrow */
function P18({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {OPTS.map((o, i) => (
        <span key={o} className="flex items-center gap-1">
          {i > 0 && <span className="text-zinc-300">›</span>}
          <button
            onClick={() => s(o)}
            className={`px-1.5 py-0.5 rounded ${
              v === o ? 'bg-zinc-900 text-white' : 'text-zinc-500'
            }`}
          >
            {S[o]}
          </button>
        </span>
      ))}
    </div>
  )
}

/* 19 vertical segmented (narrow) */
function P19({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex flex-col rounded border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-4 py-1 text-xs ${
            i > 0 ? 'border-t border-zinc-300' : ''
          } ${v === o ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'}`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  )
}

/* 20 accordion-radio (list w/ dot on left) */
function P20({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="w-32 space-y-1">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className="w-full flex items-center gap-2 text-xs"
        >
          <span
            className={`w-2 h-2 rounded-full ${v === o ? 'bg-zinc-900' : 'bg-zinc-300'}`}
          />
          <span className={v === o ? 'text-zinc-900 font-medium' : 'text-zinc-500'}>
            {S[o]}
          </span>
        </button>
      ))}
    </div>
  )
}

export default function TriChoice() {
  const [a, sA] = useState<Val[]>(Array(20).fill('all'))
  const set = (i: number) => (val: Val) => sA((prev) => prev.map((p, k) => (k === i ? val : p)))

  const patterns: { title: string; render: (v: Val, s: (v: Val) => void) => React.ReactNode }[] = [
    { title: 'Connected segmented', render: (v, s) => <P1 v={v} s={s} /> },
    { title: 'Rounded pill segmented', render: (v, s) => <P2 v={v} s={s} /> },
    { title: 'Sliding pill', render: (v, s) => <P3 v={v} s={s} /> },
    { title: 'Separated buttons', render: (v, s) => <P4 v={v} s={s} /> },
    { title: 'Inline text | pipe', render: (v, s) => <P5 v={v} s={s} /> },
    { title: 'Inline text / slash', render: (v, s) => <P6 v={v} s={s} /> },
    { title: 'Radio row', render: (v, s) => <P7 v={v} s={s} /> },
    { title: 'Chip pills', render: (v, s) => <P8 v={v} s={s} /> },
    { title: 'Underline tabs', render: (v, s) => <P9 v={v} s={s} /> },
    { title: 'Filled pill in track', render: (v, s) => <P10 v={v} s={s} /> },
    { title: 'Dropdown', render: (v, s) => <P11 v={v} s={s} /> },
    { title: 'Cycle button', render: (v, s) => <P12 v={v} s={s} /> },
    { title: '3-tick slider', render: (v, s) => <P13 v={v} s={s} /> },
    { title: 'Vertical stack', render: (v, s) => <P14 v={v} s={s} /> },
    { title: 'Card grid (3 wide)', render: (v, s) => <P15 v={v} s={s} /> },
    { title: 'Bracket wrap', render: (v, s) => <P16 v={v} s={s} /> },
    { title: 'Numbered dots', render: (v, s) => <P17 v={v} s={s} /> },
    { title: 'Breadcrumb-arrow', render: (v, s) => <P18 v={v} s={s} /> },
    { title: 'Vertical segmented', render: (v, s) => <P19 v={v} s={s} /> },
    { title: 'Dot + label list', render: (v, s) => <P20 v={v} s={s} /> },
  ]

  return (
    <div className="max-w-6xl space-y-3">
      <p className="text-sm text-zinc-700">
        3択 [All | Option 1 | Option 2] の <b>置き方</b> 20パターン。ラベルは一般化、
        on/off の toggle 隠喩や active 強調そのものはパターン扱いしない。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {patterns.map((p, i) => (
          <Cell key={i} n={i + 1} title={p.title}>
            {p.render(a[i], set(i))}
          </Cell>
        ))}
      </div>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">分類</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>横並列: connected / pill / sliding / separated / chip / underline / filled / breadcrumb</li>
          <li>縦並列: vertical stack / vertical segmented / dot + label list</li>
          <li>1つに畳む: dropdown / cycle button</li>
          <li>位置で示す: 3-tick slider</li>
          <li>面積で示す: card grid</li>
          <li>テキストだけ: inline pipe / inline slash / bracket wrap / numbered dots</li>
          <li>ラジオ的: radio row</li>
        </ul>
      </section>
    </div>
  )
}
