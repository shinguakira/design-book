import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Trash2,
  Archive,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
  ChevronRight,
  GripVertical,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  Database,
  Plus,
} from 'lucide-react'

type Status = 'Growing' | 'Stable' | 'Declining'

type Company = {
  name: string
  country: string
  employees: number
  revenue: string
  revenueNum: number
  growth: number
  status: Status
}

const COMPANIES: Company[] = [
  { name: 'Anthropic', country: 'USA', employees: 1200, revenue: '$2.3B', revenueNum: 2300, growth: 380, status: 'Growing' },
  { name: 'OpenAI', country: 'USA', employees: 2500, revenue: '$3.7B', revenueNum: 3700, growth: 220, status: 'Growing' },
  { name: 'Google DeepMind', country: 'UK', employees: 3000, revenue: '$8.0B', revenueNum: 8000, growth: 80, status: 'Stable' },
  { name: 'Meta AI', country: 'USA', employees: 4500, revenue: '$5.0B', revenueNum: 5000, growth: 110, status: 'Stable' },
  { name: 'Mistral', country: 'France', employees: 250, revenue: '$300M', revenueNum: 300, growth: 420, status: 'Growing' },
  { name: 'Cohere', country: 'Canada', employees: 400, revenue: '$200M', revenueNum: 200, growth: 180, status: 'Growing' },
  { name: 'Stability AI', country: 'UK', employees: 200, revenue: '$50M', revenueNum: 50, growth: -20, status: 'Declining' },
  { name: 'Hugging Face', country: 'USA', employees: 350, revenue: '$80M', revenueNum: 80, growth: 200, status: 'Growing' },
]

function Frame({
  label,
  note,
  children,
  span,
}: {
  label: string
  note?: string
  children: React.ReactNode
  span?: boolean
}) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white overflow-hidden ${
        span ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

const STATUS_STYLE: Record<Status, string> = {
  Growing: 'bg-emerald-100 text-emerald-800',
  Stable: 'bg-zinc-100 text-zinc-700',
  Declining: 'bg-rose-100 text-rose-800',
}

const COUNTRY_DOT: Record<string, string> = {
  USA: 'bg-blue-500',
  UK: 'bg-rose-500',
  France: 'bg-indigo-500',
  Canada: 'bg-amber-500',
}

function GrowthCell({ value }: { value: number }) {
  if (value > 50) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium tabular-nums">
        <TrendingUp className="w-3.5 h-3.5" />+{value}%
      </span>
    )
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-rose-600 font-medium tabular-nums">
        <TrendingDown className="w-3.5 h-3.5" />
        {value}%
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-zinc-500 tabular-nums">
      <Minus className="w-3.5 h-3.5" />
      {value}%
    </span>
  )
}

function Sortable() {
  type Key = keyof Pick<Company, 'name' | 'employees' | 'revenueNum' | 'growth'>
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({
    key: 'revenueNum',
    dir: -1,
  })
  const onSort = (key: Key) =>
    setSort((s) => ({
      key,
      dir: s.key === key ? (s.dir === 1 ? -1 : 1) : -1,
    }))
  const rows = useMemo(() => {
    const arr = [...COMPANIES]
    arr.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number')
        return (av - bv) * sort.dir
      return String(av).localeCompare(String(bv)) * sort.dir
    })
    return arr
  }, [sort])
  const Th = ({ k, label, right }: { k: Key; label: string; right?: boolean }) => (
    <th
      onClick={() => onSort(k)}
      className={`px-3 py-2 text-xs font-medium text-zinc-500 cursor-pointer hover:bg-zinc-100 select-none ${
        right ? 'text-right' : 'text-left'
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === k ? (
          sort.dir === 1 ? (
            <ArrowUp className="w-3 h-3 text-zinc-700" />
          ) : (
            <ArrowDown className="w-3 h-3 text-zinc-700" />
          )
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-40" />
        )}
      </span>
    </th>
  )
  return (
    <table className="w-full text-sm">
      <thead className="bg-zinc-50 border-b border-zinc-200">
        <tr>
          <Th k="name" label="Company" />
          <Th k="employees" label="Employees" right />
          <Th k="revenueNum" label="Revenue" right />
          <Th k="growth" label="Growth" right />
        </tr>
      </thead>
      <tbody>
        {rows.slice(0, 5).map((c) => (
          <tr key={c.name} className="border-b border-zinc-100 last:border-0">
            <td className="px-3 py-2">{c.name}</td>
            <td className="px-3 py-2 text-right tabular-nums">
              {c.employees.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right tabular-nums">{c.revenue}</td>
            <td className="px-3 py-2 text-right">
              <GrowthCell value={c.growth} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Selectable() {
  const [sel, setSel] = useState<Set<string>>(new Set())
  const toggle = (n: string) =>
    setSel((s) => {
      const next = new Set(s)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  const allChecked = sel.size === COMPANIES.length
  return (
    <div className="rounded-md border border-zinc-200 overflow-hidden">
      {sel.size > 0 && (
        <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-sm border-b border-blue-200 animate-slide-in-down">
          <b className="text-blue-900">{sel.size} 件選択</b>
          <div className="flex-1" />
          <button className="text-xs text-blue-700 hover:underline flex items-center gap-1">
            <Archive className="w-3 h-3" />
            アーカイブ
          </button>
          <button className="text-xs text-rose-700 hover:underline flex items-center gap-1">
            <Trash2 className="w-3 h-3" />
            削除
          </button>
          <button
            onClick={() => setSel(new Set())}
            className="text-xs text-zinc-500 hover:underline"
          >
            解除
          </button>
        </div>
      )}
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b border-zinc-200">
          <tr>
            <th className="w-8 px-3 py-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() =>
                  setSel(
                    allChecked ? new Set() : new Set(COMPANIES.map((c) => c.name)),
                  )
                }
                className="accent-zinc-900"
              />
            </th>
            <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
              Company
            </th>
            <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
              Country
            </th>
            <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
              Employees
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPANIES.slice(0, 5).map((c) => (
            <tr
              key={c.name}
              className={`border-b border-zinc-100 last:border-0 ${
                sel.has(c.name) ? 'bg-blue-50' : 'hover:bg-zinc-50'
              }`}
            >
              <td className="px-3 py-2">
                <input
                  type="checkbox"
                  checked={sel.has(c.name)}
                  onChange={() => toggle(c.name)}
                  className="accent-zinc-900"
                />
              </td>
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2 text-zinc-600">{c.country}</td>
              <td className="px-3 py-2 text-right tabular-nums">
                {c.employees.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Expandable() {
  const [open, setOpen] = useState<Set<string>>(new Set(['Anthropic']))
  const toggle = (n: string) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  return (
    <table className="w-full text-sm">
      <thead className="bg-zinc-50 border-b border-zinc-200">
        <tr>
          <th className="w-8" />
          <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
            Company
          </th>
          <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
            Revenue
          </th>
        </tr>
      </thead>
      <tbody>
        {COMPANIES.slice(0, 4).map((c) => (
          <Frag key={c.name} c={c} open={open.has(c.name)} onToggle={() => toggle(c.name)} />
        ))}
      </tbody>
    </table>
  )
}

function Frag({
  c,
  open,
  onToggle,
}: { c: Company; open: boolean; onToggle: () => void }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-zinc-100 cursor-pointer hover:bg-zinc-50"
      >
        <td className="pl-3">
          <ChevronRight
            className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </td>
        <td className="px-3 py-2">{c.name}</td>
        <td className="px-3 py-2 text-right tabular-nums">{c.revenue}</td>
      </tr>
      {open && (
        <tr className="border-b border-zinc-100 bg-zinc-50/50">
          <td />
          <td colSpan={2} className="px-3 py-3">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-zinc-500">所在地</div>
                <div className="font-medium">{c.country}</div>
              </div>
              <div>
                <div className="text-zinc-500">従業員</div>
                <div className="font-medium tabular-nums">
                  {c.employees.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-zinc-500">成長率</div>
                <div>
                  <GrowthCell value={c.growth} />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function InlineEdit() {
  const [rows, setRows] = useState(COMPANIES.slice(0, 4))
  const [editing, setEditing] = useState<{ name: string; field: 'employees' } | null>(null)
  const [draft, setDraft] = useState('')
  const start = (name: string, value: number) => {
    setEditing({ name, field: 'employees' })
    setDraft(String(value))
  }
  const save = () => {
    if (!editing) return
    const n = parseInt(draft, 10)
    if (!isNaN(n)) {
      setRows((r) =>
        r.map((c) => (c.name === editing.name ? { ...c, employees: n } : c)),
      )
    }
    setEditing(null)
  }
  return (
    <table className="w-full text-sm">
      <thead className="bg-zinc-50 border-b border-zinc-200">
        <tr>
          <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
            Company
          </th>
          <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
            Employees <span className="text-[10px] text-zinc-400">(click)</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => (
          <tr key={c.name} className="border-b border-zinc-100 last:border-0">
            <td className="px-3 py-2">{c.name}</td>
            <td className="px-3 py-2 text-right">
              {editing?.name === c.name ? (
                <span className="inline-flex items-center gap-1">
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') save()
                      if (e.key === 'Escape') setEditing(null)
                    }}
                    className="w-20 px-1.5 py-0.5 border border-blue-500 rounded text-right tabular-nums text-sm outline-none"
                  />
                  <button
                    onClick={save}
                    className="w-6 h-6 rounded bg-emerald-500 text-white flex items-center justify-center"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="w-6 h-6 rounded bg-zinc-200 text-zinc-600 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => start(c.name, c.employees)}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-zinc-100 tabular-nums group"
                >
                  {c.employees.toLocaleString()}
                  <Pencil className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Paginated() {
  const [page, setPage] = useState(1)
  const perPage = 3
  const totalPages = Math.ceil(COMPANIES.length / perPage)
  const slice = COMPANIES.slice((page - 1) * perPage, page * perPage)
  return (
    <div>
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b border-zinc-200">
          <tr>
            <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
              Company
            </th>
            <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
              Revenue
            </th>
            <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
              Growth
            </th>
          </tr>
        </thead>
        <tbody>
          {slice.map((c) => (
            <tr key={c.name} className="border-b border-zinc-100 last:border-0">
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2 text-right tabular-nums">{c.revenue}</td>
              <td className="px-3 py-2 text-right">
                <GrowthCell value={c.growth} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
        <span>
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, COMPANIES.length)} /
          {' '}
          {COMPANIES.length} 件
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 rounded hover:bg-zinc-100 disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded text-xs tabular-nums ${
                page === i + 1
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 rounded hover:bg-zinc-100 disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ColumnVisibility() {
  const cols = [
    { key: 'country', label: 'Country' },
    { key: 'employees', label: 'Employees' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'growth', label: 'Growth' },
  ] as const
  const [visible, setVisible] = useState<Set<string>>(
    new Set(cols.map((c) => c.key)),
  )
  const toggle = (k: string) =>
    setVisible((s) => {
      const next = new Set(s)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {cols.map((c) => {
          const on = visible.has(c.key)
          return (
            <button
              key={c.key}
              onClick={() => toggle(c.key)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                on
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-500 border-zinc-300'
              }`}
            >
              {on ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {c.label}
            </button>
          )
        })}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b border-zinc-200">
          <tr>
            <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
              Company
            </th>
            {visible.has('country') && (
              <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                Country
              </th>
            )}
            {visible.has('employees') && (
              <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                Employees
              </th>
            )}
            {visible.has('revenue') && (
              <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                Revenue
              </th>
            )}
            {visible.has('growth') && (
              <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                Growth
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {COMPANIES.slice(0, 5).map((c) => (
            <tr key={c.name} className="border-b border-zinc-100 last:border-0">
              <td className="px-3 py-2">{c.name}</td>
              {visible.has('country') && (
                <td className="px-3 py-2 text-zinc-600">{c.country}</td>
              )}
              {visible.has('employees') && (
                <td className="px-3 py-2 text-right tabular-nums">
                  {c.employees.toLocaleString()}
                </td>
              )}
              {visible.has('revenue') && (
                <td className="px-3 py-2 text-right tabular-nums">{c.revenue}</td>
              )}
              {visible.has('growth') && (
                <td className="px-3 py-2 text-right">
                  <GrowthCell value={c.growth} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ReorderableCols() {
  const [order, setOrder] = useState<string[]>([
    'country',
    'employees',
    'revenue',
  ])
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= order.length) return
    setOrder((o) => {
      const next = [...o]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }
  const CELL: Record<string, { label: string; right?: boolean; render: (c: Company) => React.ReactNode }> = {
    country: { label: 'Country', render: (c) => c.country },
    employees: { label: 'Employees', right: true, render: (c) => c.employees.toLocaleString() },
    revenue: { label: 'Revenue', right: true, render: (c) => c.revenue },
  }
  return (
    <table className="w-full text-sm">
      <thead className="bg-zinc-50 border-b border-zinc-200">
        <tr>
          <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
            Company
          </th>
          {order.map((k, i) => {
            const meta = CELL[k]
            return (
              <th
                key={k}
                className={`group px-3 py-2 text-xs font-medium text-zinc-500 ${
                  meta.right ? 'text-right' : 'text-left'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <GripVertical className="w-3 h-3 text-zinc-300 opacity-0 group-hover:opacity-100" />
                  {meta.label}
                  <span className="inline-flex flex-col leading-none opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="text-zinc-400 hover:text-zinc-900 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === order.length - 1}
                      className="text-zinc-400 hover:text-zinc-900 disabled:opacity-30"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </span>
                </span>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {COMPANIES.slice(0, 5).map((c) => (
          <tr key={c.name} className="border-b border-zinc-100 last:border-0">
            <td className="px-3 py-2">{c.name}</td>
            {order.map((k) => {
              const meta = CELL[k]
              return (
                <td
                  key={k}
                  className={`px-3 py-2 tabular-nums ${
                    meta.right ? 'text-right' : ''
                  }`}
                >
                  {meta.render(c)}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function FilterSearch() {
  const [q, setQ] = useState('')
  const rows = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.country.toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <div>
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="絞り込み..."
          className="w-full h-8 rounded-md border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-sm focus:outline-none focus:bg-white focus:border-zinc-400"
        />
      </div>
      {rows.length === 0 ? (
        <div className="border border-dashed border-zinc-300 rounded-md py-6 text-center text-xs text-zinc-400">
          一致なし
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                Company
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name} className="border-b border-zinc-100 last:border-0">
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2 text-zinc-600">{c.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default function TableLayoutsShowcase() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        テーブルの表現と操作のバリエーション16種。
        罫線・密度から、Sort/Filter/Select/Edit/Pagination のような対話まで。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 1 — Basic */}
        <Frame label="Basic" note="ヘッダー行 + ボーダー下線。汎用">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Country
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-zinc-100 last:border-0"
                >
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-zinc-600">{c.country}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {c.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 2 — Striped */}
        <Frame label="Striped (zebra)" note="行の追跡しやすさ。密度高い表に">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Country
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 6).map((c, i) => (
                <tr
                  key={c.name}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}
                >
                  <td className="px-3 py-1.5">{c.name}</td>
                  <td className="px-3 py-1.5 text-zinc-600">{c.country}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">
                    {c.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 3 — Bordered */}
        <Frame label="Bordered" note="全マスに罫線。スプレッドシート/伝票風">
          <table className="w-full text-sm border-collapse border border-zinc-300">
            <thead className="bg-zinc-100">
              <tr>
                <th className="border border-zinc-300 text-left text-xs font-semibold text-zinc-700 px-3 py-2">
                  Company
                </th>
                <th className="border border-zinc-300 text-left text-xs font-semibold text-zinc-700 px-3 py-2">
                  Country
                </th>
                <th className="border border-zinc-300 text-right text-xs font-semibold text-zinc-700 px-3 py-2">
                  Employees
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr key={c.name}>
                  <td className="border border-zinc-300 px-3 py-1.5">
                    {c.name}
                  </td>
                  <td className="border border-zinc-300 px-3 py-1.5">
                    {c.country}
                  </td>
                  <td className="border border-zinc-300 px-3 py-1.5 text-right tabular-nums">
                    {c.employees.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 4 — Borderless */}
        <Frame label="Borderless" note="罫線無、余白で区切る。モダン/カード内に">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-3 pb-3">
                  Company
                </th>
                <th className="text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-3 pb-3">
                  Country
                </th>
                <th className="text-right text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-3 pb-3">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr key={c.name} className="hover:bg-zinc-50">
                  <td className="px-3 py-2.5">{c.name}</td>
                  <td className="px-3 py-2.5 text-zinc-600">{c.country}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {c.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 5 — Rich cells (avatar+status+sparkline-ish) */}
        <Frame
          label="Rich cells"
          note="アバター + ステータス + 進捗バー。ダッシュボードの主役"
          span
        >
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Country
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2 w-48">
                  Revenue share
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((c) => {
                const max = Math.max(...COMPANIES.map((x) => x.revenueNum))
                const pct = (c.revenueNum / max) * 100
                return (
                  <tr
                    key={c.name}
                    className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {c.name[0]}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="inline-flex items-center gap-1.5 text-xs">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${COUNTRY_DOT[c.country] ?? 'bg-zinc-400'}`}
                        />
                        {c.country}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STATUS_STYLE[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zinc-700 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-500 font-mono tabular-nums w-12 text-right">
                          {c.revenue}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <GrowthCell value={c.growth} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Frame>

        {/* 6 — Sortable */}
        <Frame label="Sortable" note="ヘッダー click で昇順/降順">
          <Sortable />
        </Frame>

        {/* 7 — Filterable */}
        <Frame label="Filterable" note="上部の検索で絞り込み">
          <FilterSearch />
        </Frame>

        {/* 8 — Selectable */}
        <Frame label="Selectable + Bulk" note="チェック → 一括バー">
          <Selectable />
        </Frame>

        {/* 9 — Expandable rows */}
        <Frame label="Expandable rows" note="行 click で詳細を下に展開">
          <Expandable />
        </Frame>

        {/* 10 — Inline edit */}
        <Frame
          label="Inline edit"
          note="セル click でその場編集 (Enter 保存 / Esc 取消)"
        >
          <InlineEdit />
        </Frame>

        {/* 11 — Pagination */}
        <Frame label="Paginated" note="ページ分割 + ナビ">
          <Paginated />
        </Frame>

        {/* 12 — Column visibility */}
        <Frame label="Column visibility" note="表示する列をユーザーが選ぶ">
          <ColumnVisibility />
        </Frame>

        {/* 13 — Reorderable columns */}
        <Frame label="Reorderable columns" note="hover で ◀▶ で列順を入替">
          <ReorderableCols />
        </Frame>

        {/* 14 — Sticky header */}
        <Frame label="Sticky header" note="行が多い時、見出しが上に貼り付く">
          <div className="max-h-56 overflow-y-auto rounded-md border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 sticky top-0 border-b border-zinc-200 shadow-[0_1px_0_rgb(228,228,231)]">
                <tr>
                  <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                    Company
                  </th>
                  <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                    Employees
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...COMPANIES, ...COMPANIES].map((c, i) => (
                  <tr
                    key={`${c.name}-${i}`}
                    className="border-b border-zinc-100 last:border-0"
                  >
                    <td className="px-3 py-1.5">{c.name}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums">
                      {c.employees.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* 15 — Sticky first column */}
        <Frame
          label="Sticky first column"
          note="横スクロール時、左の名前列だけ固定"
        >
          <div className="overflow-x-auto rounded-md border border-zinc-200">
            <table className="text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 text-left text-xs font-medium text-zinc-500 px-3 py-2 w-40 shadow-[1px_0_0_rgb(228,228,231)] z-10">
                    Company
                  </th>
                  {['Country', 'Employees', 'Revenue', 'Growth', 'Status', '備考', 'Founded'].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium text-zinc-500 px-3 py-2 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {COMPANIES.slice(0, 5).map((c) => (
                  <tr key={c.name} className="border-b border-zinc-100 last:border-0">
                    <td className="sticky left-0 bg-white text-sm px-3 py-2 font-medium shadow-[1px_0_0_rgb(228,228,231)]">
                      {c.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.country}</td>
                    <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">
                      {c.employees.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">
                      {c.revenue}
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <GrowthCell value={c.growth} />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STATUS_STYLE[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-zinc-500 whitespace-nowrap">
                      —
                    </td>
                    <td className="px-3 py-2 text-zinc-500 whitespace-nowrap">
                      {2010 + (c.name.charCodeAt(0) % 12)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* 16 — Footer totals */}
        <Frame label="Sticky totals footer" note="合計・平均を最下行に固定">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Employees
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Revenue (M$)
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-zinc-100 last:border-0"
                >
                  <td className="px-3 py-1.5">{c.name}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">
                    {c.employees.toLocaleString()}
                  </td>
                  <td className="px-3 py-1.5 text-right tabular-nums">
                    {c.revenueNum.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-zinc-900 text-white">
              <tr>
                <td className="px-3 py-2 text-xs uppercase tracking-wider">
                  Total
                </td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">
                  {COMPANIES.slice(0, 5)
                    .reduce((s, c) => s + c.employees, 0)
                    .toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">
                  {COMPANIES.slice(0, 5)
                    .reduce((s, c) => s + c.revenueNum, 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </Frame>

        {/* 17 — Heatmap */}
        <Frame
          label="Heatmap cells"
          note="値の高低を色濃度で見せる。マトリクス分析向け"
        >
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                  <th
                    key={q}
                    className="text-center text-xs font-medium text-zinc-500 px-2 py-2"
                  >
                    {q}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr key={c.name}>
                  <td className="px-3 py-1.5 font-medium">{c.name}</td>
                  {[0, 1, 2, 3].map((q) => {
                    const v = Math.max(
                      0,
                      Math.round(c.growth / 4 + (q - 1) * 12 + (c.name.charCodeAt(0) % 7)),
                    )
                    const lvl = Math.min(5, Math.floor(v / 30))
                    const colors = [
                      'bg-zinc-50 text-zinc-400',
                      'bg-emerald-100 text-emerald-700',
                      'bg-emerald-200 text-emerald-800',
                      'bg-emerald-400 text-white',
                      'bg-emerald-600 text-white',
                      'bg-emerald-700 text-white',
                    ]
                    return (
                      <td key={q} className="p-0">
                        <div
                          className={`mx-1 my-0.5 py-1.5 text-center text-xs font-medium rounded tabular-nums ${colors[lvl]}`}
                        >
                          {v}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 18 — Actions column */}
        <Frame label="Row actions column" note="kebab メニュー / 即操作">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Country
                </th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 5).map((c) => (
                <tr
                  key={c.name}
                  className="group border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
                >
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-zinc-600">{c.country}</td>
                  <td className="px-2 py-1.5">
                    <button
                      className="w-7 h-7 rounded hover:bg-zinc-200 text-zinc-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                      title="メニュー"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        {/* 19 — Responsive (table → cards on mobile) */}
        <Frame
          label="Responsive cards (mobile)"
          note="狭幅では1行=1カードに。スマホ前提のテーブル"
          span
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-2">
            {COMPANIES.slice(0, 4).map((c) => (
              <li
                key={c.name}
                className="rounded-md border border-zinc-200 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.name}</div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STATUS_STYLE[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div>
                    <dt className="text-zinc-400">Country</dt>
                    <dd>{c.country}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400">Employees</dt>
                    <dd className="tabular-nums">{c.employees.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-400">Revenue</dt>
                    <dd className="tabular-nums">{c.revenue}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <table className="w-full text-sm hidden lg:table">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Company
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Country
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Employees
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 px-3 py-2">
                  Revenue
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 px-3 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.slice(0, 4).map((c) => (
                <tr key={c.name} className="border-b border-zinc-100 last:border-0">
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-zinc-600">{c.country}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {c.employees.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{c.revenue}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STATUS_STYLE[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-[11px] text-zinc-500 mt-2 italic">
            ※ lg以上はテーブル、それ未満はカード。ウィンドウ幅でリサイズ確認
          </div>
        </Frame>

        {/* 20 — Empty + Skeleton */}
        <Frame label="Empty + Skeleton" note="0件案内 + 読込中の骨格" span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-dashed border-zinc-300 p-8 text-center">
              <Database className="w-10 h-10 text-zinc-300 mx-auto" />
              <div className="text-sm font-medium mt-2">
                条件に一致する会社がありません
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                フィルタを変えるか、新規追加してください
              </div>
              <button className="mt-3 inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-zinc-900 text-white text-xs font-medium">
                <Plus className="w-3 h-3" />
                追加する
              </button>
            </div>
            <div className="rounded-md border border-zinc-200 overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_80px] gap-3 px-3 py-2 bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-400">
                <span>Company</span>
                <span className="text-right">Emp.</span>
                <span className="text-right">Rev.</span>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_80px_80px] gap-3 px-3 py-2.5 border-b border-zinc-100 last:border-0 items-center"
                >
                  <div className="h-3 w-2/3 rounded bg-zinc-200 animate-pulse" />
                  <div className="h-3 rounded bg-zinc-100 animate-pulse" />
                  <div className="h-3 rounded bg-zinc-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>密度・読みやすさ</b> → Striped (行追跡) / Borderless (現代的) /
            Bordered (伝票)
          </li>
          <li>
            <b>大量行・縦長</b> → Sticky header + Pagination, または無限スクロール
          </li>
          <li>
            <b>列が多い</b> → Sticky first column + Column visibility
          </li>
          <li>
            <b>操作可能</b> → Sortable / Filterable / Selectable / Inline edit /
            Row actions
          </li>
          <li>
            <b>可視化を兼ねる</b> → Rich cells (avatar/progress) / Heatmap
          </li>
          <li>
            <b>集計を見せたい</b> → Sticky totals footer
          </li>
          <li>
            <b>モバイル想定</b> → Responsive cards (table → 1行1カード)
          </li>
          <li>
            <b>状態の見せ忘れ</b> → Empty / Skeleton はデフォで作る
          </li>
        </ul>
      </section>
    </div>
  )
}
