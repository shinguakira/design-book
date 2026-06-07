import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  Search,
  X,
  Globe,
  Code,
  Sparkles,
  Bot,
} from 'lucide-react'

const COUNTRIES = [
  '日本',
  'アメリカ',
  'イギリス',
  'フランス',
  'ドイツ',
  '中国',
  '韓国',
  'インド',
  'ブラジル',
  'カナダ',
  'オーストラリア',
  'シンガポール',
  'タイ',
  'ベトナム',
]

function Frame({
  label,
  note,
  children,
}: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function useOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [onClose])
  return ref
}

/* 1. Native */
function Native() {
  const [v, setV] = useState('日本')
  return (
    <select
      value={v}
      onChange={(e) => setV(e.target.value)}
      className="w-full max-w-xs h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
    >
      {COUNTRIES.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  )
}

/* 2. Custom dropdown */
function CustomDropdown() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('日本')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 h-9 rounded-md border bg-white text-sm transition ${
          open
            ? 'border-zinc-900 ring-2 ring-zinc-900/10'
            : 'border-zinc-300 hover:border-zinc-400'
        }`}
      >
        {v}
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-56 overflow-y-auto animate-slide-in-down">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setV(c)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
            >
              <span className="w-3.5 h-3.5">
                {c === v && <Check className="w-3.5 h-3.5 text-zinc-900" />}
              </span>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* 3. Searchable (combobox) ─── 必須 */
function Searchable() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [v, setV] = useState('日本')
  const ref = useOutside<HTMLDivElement>(() => {
    setOpen(false)
    setQ('')
  })
  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        {v}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg z-10 animate-slide-in-down">
          <div className="relative border-b border-zinc-200">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="絞り込み..."
              className="w-full pl-8 pr-2 py-1.5 text-sm outline-none"
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="text-center text-xs text-zinc-400 py-6">
                一致なし
              </div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setV(c)
                    setOpen(false)
                    setQ('')
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
                >
                  <span>{c}</span>
                  {c === v && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* 4. Multi-select with chips ─── 必須 */
function MultiSelect() {
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState<string[]>(['日本', 'アメリカ'])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const toggle = (c: string) =>
    setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  return (
    <div ref={ref} className="relative max-w-md">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`min-h-9 px-2 py-1 rounded-md border bg-white flex flex-wrap items-center gap-1 cursor-pointer transition ${
          open
            ? 'border-zinc-900 ring-2 ring-zinc-900/10'
            : 'border-zinc-300 hover:border-zinc-400'
        }`}
      >
        {sel.length === 0 ? (
          <span className="text-sm text-zinc-400 px-1">複数選択...</span>
        ) : (
          sel.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-xs font-medium"
            >
              {c}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(c)
                }}
                className="text-zinc-500 hover:text-zinc-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-auto shrink-0" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-56 overflow-y-auto animate-slide-in-down">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => toggle(c)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
            >
              <input
                type="checkbox"
                checked={sel.includes(c)}
                readOnly
                className="accent-zinc-900 pointer-events-none"
              />
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* 5. Searchable multi-select ─── 必須 (両方の組合せ) */
function SearchableMulti() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<string[]>(['日本', 'タイ'])
  const ref = useOutside<HTMLDivElement>(() => {
    setOpen(false)
    setQ('')
  })
  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(q.toLowerCase()),
  )
  const toggle = (c: string) =>
    setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  return (
    <div ref={ref} className="relative max-w-md">
      <div
        onClick={() => setOpen(true)}
        className={`min-h-9 px-2 py-1 rounded-md border bg-white flex flex-wrap items-center gap-1 cursor-pointer transition ${
          open
            ? 'border-zinc-900 ring-2 ring-zinc-900/10'
            : 'border-zinc-300 hover:border-zinc-400'
        }`}
      >
        {sel.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium"
          >
            {c}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggle(c)
              }}
              className="text-blue-500 hover:text-blue-900"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {!sel.length && (
          <span className="text-sm text-zinc-400 px-1">タグを選択...</span>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-auto shrink-0" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg z-10 animate-slide-in-down">
          <div className="relative border-b border-zinc-200">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="絞り込み..."
              className="w-full pl-8 pr-2 py-1.5 text-sm outline-none"
            />
          </div>
          <div className="px-2 py-1 text-[10px] text-zinc-400 uppercase tracking-wider border-b border-zinc-100 flex items-center justify-between">
            <span>選択中 {sel.length} 件</span>
            {sel.length > 0 && (
              <button
                onClick={() => setSel([])}
                className="text-zinc-500 hover:text-zinc-900"
              >
                クリア
              </button>
            )}
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="text-center text-xs text-zinc-400 py-6">
                一致なし
              </div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(c)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
                >
                  <input
                    type="checkbox"
                    checked={sel.includes(c)}
                    readOnly
                    className="accent-zinc-900 pointer-events-none"
                  />
                  {c}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* 6. Grouped options */
function Grouped() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Figma')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const groups: Record<string, string[]> = {
    デザイン: ['Figma', 'Sketch', 'Adobe XD'],
    開発: ['VS Code', 'GitHub', 'Vercel'],
    コラボ: ['Notion', 'Slack', 'Linear'],
  }
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm"
      >
        {v}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-64 overflow-y-auto animate-slide-in-down">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g}>
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-50">
                {g}
              </div>
              {items.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setV(t)
                    setOpen(false)
                  }}
                  className="w-full px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
                >
                  {t}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* 7. With icon options */
function WithIcons() {
  const opts = [
    { id: 'web', name: 'Web Search', Icon: Globe },
    { id: 'code', name: 'Code Interpreter', Icon: Code },
    { id: 'creative', name: 'Creative Mode', Icon: Sparkles },
    { id: 'default', name: 'Default', Icon: Bot },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(opts[3])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        <v.Icon className="w-4 h-4 text-zinc-500" />
        {v.name}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-auto" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 animate-slide-in-down">
          {opts.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left ${
                v.id === o.id ? 'bg-zinc-50' : ''
              }`}
            >
              <o.Icon className="w-4 h-4 text-zinc-700" />
              {o.name}
              {v.id === o.id && (
                <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* 8. With label / hint / error */
function Stateful() {
  return (
    <div className="space-y-3 max-w-xs">
      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          国
        </label>
        <select
          defaultValue="日本"
          className="w-full h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          {COUNTRIES.slice(0, 5).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="text-xs text-zinc-500 mt-1">配送先の国を選んでください</div>
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          通貨
        </label>
        <select
          className="w-full h-9 rounded-md border-2 border-rose-500 bg-white px-3 text-sm focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            選んでください
          </option>
          <option>JPY</option>
          <option>USD</option>
        </select>
        <div className="text-xs text-rose-600 mt-1">通貨は必須です</div>
      </div>
    </div>
  )
}

/* 9. Cascading */
const REGIONS: Record<string, string[]> = {
  日本: ['北海道', '東北', '関東', '中部', '関西', '中国', '四国', '九州'],
  アメリカ: ['West', 'Midwest', 'South', 'Northeast'],
  フランス: ['Île-de-France', 'PACA', 'Bretagne'],
}
function Cascading() {
  const [country, setCountry] = useState<keyof typeof REGIONS>('日本')
  const [region, setRegion] = useState(REGIONS['日本'][2])
  return (
    <div className="flex gap-2 max-w-md">
      <select
        value={country}
        onChange={(e) => {
          const v = e.target.value as keyof typeof REGIONS
          setCountry(v)
          setRegion(REGIONS[v][0])
        }}
        className="flex-1 h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white"
      >
        {Object.keys(REGIONS).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="flex-1 h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white"
      >
        {REGIONS[country].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  )
}

/* 10. Sizes */
function Sizes() {
  return (
    <div className="space-y-2 max-w-xs">
      <select className="w-full h-7 rounded border border-zinc-300 px-2 text-xs bg-white">
        <option>xs</option>
      </select>
      <select className="w-full h-8 rounded-md border border-zinc-300 px-3 text-sm bg-white">
        <option>sm</option>
      </select>
      <select className="w-full h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white">
        <option>md</option>
      </select>
      <select className="w-full h-11 rounded-md border border-zinc-300 px-4 text-base bg-white">
        <option>lg</option>
      </select>
    </div>
  )
}

export default function SelectShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Native select" note="OS の見た目に任せる。最もシンプル">
        <Native />
      </Frame>

      <Frame label="2. Custom dropdown" note="統一スタイルのカスタムプルダウン">
        <CustomDropdown />
      </Frame>

      <Frame
        label="3. Searchable (combobox)"
        note="必須。type で絞り込み — 選択肢が多いとき必須"
      >
        <Searchable />
      </Frame>

      <Frame
        label="4. Multi-select with chips"
        note="必須。複数選択 + × で個別解除"
      >
        <MultiSelect />
      </Frame>

      <Frame
        label="5. Searchable multi-select"
        note="必須。3 + 4 の組合せ。タグ選択の最終形"
      >
        <SearchableMulti />
      </Frame>

      <Frame label="6. Grouped options" note="セクション見出し付き">
        <Grouped />
      </Frame>

      <Frame label="7. With icons" note="アイコン + ラベル">
        <WithIcons />
      </Frame>

      <Frame label="8. Label / hint / error" note="フォームで使う基本形">
        <Stateful />
      </Frame>

      <Frame label="9. Cascading (dependent)" note="左で選んだ値で右の候補が変わる">
        <Cascading />
      </Frame>

      <Frame label="10. Sizes" note="xs / sm / md / lg">
        <Sizes />
      </Frame>
    </div>
  )
}
