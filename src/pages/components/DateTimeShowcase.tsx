import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

function Frame({
  n,
  title,
  note,
  children,
}: {
  n: number
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white">
      <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50">
        <div className="text-xs font-medium text-zinc-800">
          {n}. {title}
        </div>
        {note && <div className="text-[10px] text-zinc-500">{note}</div>}
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

/* ── 1. native date ─────────────────────── */
function NativeDate() {
  return (
    <input
      type="date"
      defaultValue="2026-07-09"
      className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-44"
    />
  )
}

/* ── 2. native time ─────────────────────── */
function NativeTime() {
  return (
    <input
      type="time"
      defaultValue="13:45"
      className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-32"
    />
  )
}

/* ── 3. native datetime-local ───────────── */
function NativeDatetime() {
  return (
    <input
      type="datetime-local"
      defaultValue="2026-07-09T13:45"
      className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-56"
    />
  )
}

/* ── 4. text mask date (YYYY/MM/DD auto slash) ── */
function MaskDate() {
  const [v, setV] = useState('2026/07/09')
  const onChange = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 8)
    let out = d
    if (d.length > 4) out = `${d.slice(0, 4)}/${d.slice(4, 6)}${d.length > 6 ? '/' + d.slice(6) : ''}`
    else if (d.length > 0) out = d
    setV(out)
  }
  return (
    <input
      value={v}
      onChange={(e) => onChange(e.target.value)}
      placeholder="YYYY/MM/DD"
      className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-40 font-mono"
    />
  )
}

/* ── 5. text mask time (HH:MM auto colon) ─── */
function MaskTime() {
  const [v, setV] = useState('13:45')
  const onChange = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 4)
    let out = d
    if (d.length > 2) out = `${d.slice(0, 2)}:${d.slice(2)}`
    setV(out)
  }
  return (
    <input
      value={v}
      onChange={(e) => onChange(e.target.value)}
      placeholder="HH:MM"
      className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-24 font-mono"
    />
  )
}

/* Monthly-grid helper (Sunday-start) */
function useMonth(year: number, month: number) {
  const first = new Date(year, month, 1)
  const startPad = first.getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)
  while (cells.length % 7) cells.push(null)
  return cells
}

/* ── 6. popover calendar (compact trigger + dropdown) ─── */
function PopoverCalendar() {
  const [open, setOpen] = useState(false)
  const [d, setD] = useState({ y: 2026, m: 6, d: 9 })
  const cells = useMonth(d.y, d.m)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 h-8 px-3 rounded-md border text-sm ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
        <span className="font-mono">{`${d.y}/${String(d.m + 1).padStart(2, '0')}/${String(d.d).padStart(2, '0')}`}</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 rounded-md border border-zinc-200 bg-white shadow-lg p-3 w-64">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setD({ ...d, m: d.m === 0 ? 11 : d.m - 1, y: d.m === 0 ? d.y - 1 : d.y })}
              className="p-1 rounded hover:bg-zinc-100"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="text-sm font-medium">{d.y}年 {d.m + 1}月</div>
            <button
              onClick={() => setD({ ...d, m: d.m === 11 ? 0 : d.m + 1, y: d.m === 11 ? d.y + 1 : d.y })}
              className="p-1 rounded hover:bg-zinc-100"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-[10px] text-zinc-500 mb-1">
            {['日', '月', '火', '水', '木', '金', '土'].map((w) => (
              <div key={w} className="text-center">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((c, i) => (
              <button
                key={i}
                disabled={c === null}
                onClick={() => c && setD({ ...d, d: c })}
                className={`h-7 text-xs rounded ${
                  c === null
                    ? ''
                    : c === d.d
                    ? 'bg-zinc-900 text-white'
                    : 'hover:bg-zinc-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── 7. full inline calendar ────────────── */
function InlineCalendar() {
  const [d, setD] = useState({ y: 2026, m: 6, d: 9 })
  const cells = useMonth(d.y, d.m)
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-64">
      <div className="flex items-center justify-between mb-2 text-sm">
        <button
          onClick={() => setD({ ...d, m: d.m === 0 ? 11 : d.m - 1, y: d.m === 0 ? d.y - 1 : d.y })}
          className="p-1 rounded hover:bg-zinc-100"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="font-medium">{d.y}年 {d.m + 1}月</div>
        <button
          onClick={() => setD({ ...d, m: d.m === 11 ? 0 : d.m + 1, y: d.m === 11 ? d.y + 1 : d.y })}
          className="p-1 rounded hover:bg-zinc-100"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-[10px] text-zinc-500 mb-1">
        {['日', '月', '火', '水', '木', '金', '土'].map((w) => (
          <div key={w} className="text-center">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((c, i) => (
          <button
            key={i}
            disabled={c === null}
            onClick={() => c && setD({ ...d, d: c })}
            className={`h-7 text-xs rounded ${
              c === null ? '' : c === d.d ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 8. year picker (grid) ──────────────── */
function YearPicker() {
  const [y, setY] = useState(2026)
  const base = Math.floor(y / 12) * 12
  const years = Array.from({ length: 12 }).map((_, i) => base + i)
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-56">
      <div className="text-xs text-zinc-500 mb-2">
        {base}–{base + 11}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {years.map((yr) => (
          <button
            key={yr}
            onClick={() => setY(yr)}
            className={`h-8 text-xs rounded ${
              yr === y ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
            }`}
          >
            {yr}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 9. month picker (grid) ─────────────── */
function MonthPicker() {
  const [m, setM] = useState(6)
  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-56">
      <div className="text-xs text-zinc-500 mb-2">2026年</div>
      <div className="grid grid-cols-3 gap-1">
        {months.map((ml, i) => (
          <button
            key={ml}
            onClick={() => setM(i)}
            className={`h-8 text-xs rounded ${
              i === m ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
            }`}
          >
            {ml}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 10. year+month picker (year list + month grid) ─── */
function YearMonthPicker() {
  const [y, setY] = useState(2026)
  const [m, setM] = useState(6)
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-64 flex gap-3">
      <div className="border-r border-zinc-100 pr-2 h-40 overflow-y-auto">
        {[2023, 2024, 2025, 2026, 2027, 2028].map((yr) => (
          <button
            key={yr}
            onClick={() => setY(yr)}
            className={`block w-14 text-xs py-1 rounded ${
              yr === y ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
            }`}
          >
            {yr}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 flex-1">
        {['1','2','3','4','5','6','7','8','9','10','11','12'].map((ml, i) => (
          <button
            key={ml}
            onClick={() => setM(i)}
            className={`h-7 text-[11px] rounded ${
              i === m ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
            }`}
          >
            {ml}月
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 11. week picker (highlight whole row) ── */
function WeekPicker() {
  const [w, setW] = useState(2)
  const cells = useMonth(2026, 6)
  const rows: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-64">
      <div className="text-xs text-zinc-500 mb-2">2026年 7月</div>
      <div className="grid grid-cols-7 text-[10px] text-zinc-500 mb-1">
        {['日', '月', '火', '水', '木', '金', '土'].map((wd) => (
          <div key={wd} className="text-center">{wd}</div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <button
          key={ri}
          onClick={() => setW(ri)}
          className={`grid grid-cols-7 gap-0.5 w-full my-0.5 rounded ${
            ri === w ? 'bg-blue-100 ring-1 ring-blue-400' : 'hover:bg-zinc-50'
          }`}
        >
          {row.map((c, ci) => (
            <span key={ci} className="h-7 grid place-items-center text-xs">
              {c ?? ''}
            </span>
          ))}
        </button>
      ))}
    </div>
  )
}

/* ── 12. time slot grid (30min) ─────────── */
function TimeSlots() {
  const [t, setT] = useState('10:30')
  const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30']
  return (
    <div className="rounded-md border border-zinc-200 p-3 w-64">
      <div className="text-xs text-zinc-500 mb-2">開始時刻</div>
      <div className="grid grid-cols-3 gap-1">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => setT(s)}
            className={`h-8 text-xs rounded font-mono ${
              t === s ? 'bg-zinc-900 text-white' : 'border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 13. time wheel (drum scroll) ───────── */
function TimeWheel() {
  const [h, setH] = useState(13)
  const [m, setM] = useState(45)
  const Wheel = ({
    range,
    value,
    onChange,
    pad,
  }: {
    range: number[]
    value: number
    onChange: (n: number) => void
    pad: boolean
  }) => (
    <div className="w-14 h-24 relative rounded-md bg-gradient-to-b from-zinc-100 via-white to-zinc-100 border border-zinc-200 overflow-hidden">
      <div className="h-full overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
        <div style={{ height: 32 }} />
        {range.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`h-8 w-full snap-center text-sm font-mono ${
              n === value ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
            }`}
          >
            {pad ? String(n).padStart(2, '0') : n}
          </button>
        ))}
        <div style={{ height: 32 }} />
      </div>
      <div className="absolute inset-x-1 top-1/2 h-8 -translate-y-1/2 rounded pointer-events-none border-y border-zinc-300" />
    </div>
  )
  return (
    <div className="flex items-center gap-1">
      <Wheel range={Array.from({ length: 24 }).map((_, i) => i)} value={h} onChange={setH} pad />
      <span className="font-mono text-lg">:</span>
      <Wheel range={[0, 15, 30, 45]} value={m} onChange={setM} pad />
    </div>
  )
}

/* ── 14. analog clock dial ──────────────── */
function ClockDial() {
  const [h, setH] = useState(3)
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 100 100" className="w-28 h-28">
        <circle cx="50" cy="50" r="46" fill="#fafafa" stroke="#d4d4d8" />
        {Array.from({ length: 12 }).map((_, i) => {
          const n = i + 1
          const a = ((n - 3) * Math.PI * 2) / 12
          const x = 50 + 34 * Math.cos(a)
          const y = 50 + 34 * Math.sin(a)
          return (
            <g key={n}>
              <circle
                cx={x}
                cy={y}
                r={n === h ? 8 : 6}
                fill={n === h ? '#18181b' : 'transparent'}
                stroke={n === h ? '#18181b' : '#d4d4d8'}
                className="cursor-pointer"
                onClick={() => setH(n)}
              />
              <text
                x={x}
                y={y + 3}
                fontSize="8"
                textAnchor="middle"
                fill={n === h ? 'white' : '#3f3f46'}
                style={{ pointerEvents: 'none' }}
              >
                {n}
              </text>
            </g>
          )
        })}
        <line
          x1="50"
          y1="50"
          x2={50 + 25 * Math.cos(((h - 3) * Math.PI * 2) / 12)}
          y2={50 + 25 * Math.sin(((h - 3) * Math.PI * 2) / 12)}
          stroke="#18181b"
          strokeWidth="2"
        />
        <circle cx="50" cy="50" r="3" fill="#18181b" />
      </svg>
      <div className="font-mono text-sm text-zinc-700">
        {String(h).padStart(2, '0')}:00
      </div>
    </div>
  )
}

/* ── 15. Date of birth (Y/M/D dropdowns) ── */
function DOB() {
  const [y, setY] = useState('1990')
  const [m, setM] = useState('06')
  const [d, setD] = useState('15')
  const years = Array.from({ length: 100 }).map((_, i) => 2026 - i)
  const months = Array.from({ length: 12 }).map((_, i) => String(i + 1).padStart(2, '0'))
  const days = Array.from({ length: 31 }).map((_, i) => String(i + 1).padStart(2, '0'))
  return (
    <div className="flex items-center gap-2">
      <select value={y} onChange={(e) => setY(e.target.value)} className="rounded-md border border-zinc-300 h-8 px-2 text-sm">
        {years.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <span className="text-xs text-zinc-500">年</span>
      <select value={m} onChange={(e) => setM(e.target.value)} className="rounded-md border border-zinc-300 h-8 px-2 text-sm">
        {months.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <span className="text-xs text-zinc-500">月</span>
      <select value={d} onChange={(e) => setD(e.target.value)} className="rounded-md border border-zinc-300 h-8 px-2 text-sm">
        {days.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <span className="text-xs text-zinc-500">日</span>
    </div>
  )
}

/* ── 16. age only ───────────────────────── */
function AgeInput() {
  const [age, setAge] = useState(30)
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        min={0}
        max={120}
        className="rounded-md border border-zinc-300 h-8 px-2 text-sm w-20 font-mono"
      />
      <span className="text-xs text-zinc-500">歳</span>
      <span className="ml-2 text-[11px] text-zinc-400">生年 ≒ {2026 - age}</span>
    </div>
  )
}

/* ── 17. appointment (calendar + slots) ─── */
function Appointment() {
  const [d, setD] = useState({ y: 2026, m: 6, d: 9 })
  const [t, setT] = useState('10:30')
  const cells = useMonth(d.y, d.m)
  const slots = ['09:00','09:30','10:00','10:30','11:00','11:30']
  return (
    <div className="flex gap-3">
      <div className="rounded-md border border-zinc-200 p-2 w-56">
        <div className="text-xs font-medium mb-1">2026年 7月</div>
        <div className="grid grid-cols-7 text-[9px] text-zinc-500 mb-0.5">
          {['日','月','火','水','木','金','土'].map((w) => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((c, i) => (
            <button
              key={i}
              disabled={c === null}
              onClick={() => c && setD({ ...d, d: c })}
              className={`h-6 text-[10px] rounded ${
                c === null ? '' : c === d.d ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="w-28">
        <div className="text-xs font-medium mb-1">時間</div>
        <div className="grid grid-cols-2 gap-1">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setT(s)}
              className={`h-7 text-[10px] rounded font-mono ${
                t === s ? 'bg-zinc-900 text-white' : 'border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 18. reservation range (2 dates + nights) ─── */
function Reservation() {
  const [checkIn, setCheckIn] = useState('2026-07-09')
  const [checkOut, setCheckOut] = useState('2026-07-12')
  const nights = Math.max(0, Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  ))
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-500 w-16">Check-in</label>
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
          className="rounded-md border border-zinc-300 h-8 px-2 text-sm" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-500 w-16">Check-out</label>
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
          className="rounded-md border border-zinc-300 h-8 px-2 text-sm" />
      </div>
      <div className="text-xs text-zinc-600 pt-1 border-t border-zinc-100">
        <span className="font-semibold text-zinc-900">{nights}</span> 泊
      </div>
    </div>
  )
}

/* ── 19. reminder quick presets ─────────── */
function ReminderPresets() {
  const presets = [
    { t: '5分後', v: 5 },
    { t: '15分後', v: 15 },
    { t: '1時間後', v: 60 },
    { t: '明日の朝9時', v: -1 },
    { t: '来週月曜', v: -2 },
  ]
  const [sel, setSel] = useState(15)
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {presets.map((p) => (
          <button
            key={p.t}
            onClick={() => setSel(p.v)}
            className={`px-3 py-1 rounded-full text-xs ${
              sel === p.v ? 'bg-zinc-900 text-white' : 'border border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {p.t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-zinc-500">または指定:</span>
        <input type="datetime-local" defaultValue="2026-07-09T14:00"
          className="rounded-md border border-zinc-300 h-7 px-2 text-xs" />
      </div>
    </div>
  )
}

/* ── 20. recurring schedule ─────────────── */
function Recurring() {
  const weekdays = ['月', '火', '水', '木', '金', '土', '日']
  const [days, setDays] = useState<Set<number>>(new Set([1, 3, 5]))
  const [t, setT] = useState('19:00')
  const toggle = (i: number) => {
    const n = new Set(days)
    n.has(i) ? n.delete(i) : n.add(i)
    setDays(n)
  }
  return (
    <div className="space-y-2">
      <div>
        <div className="text-xs text-zinc-500 mb-1">曜日 (複数選択可)</div>
        <div className="flex gap-1">
          {weekdays.map((w, i) => (
            <button
              key={w}
              onClick={() => toggle(i)}
              className={`w-8 h-8 rounded-full text-xs ${
                days.has(i)
                  ? 'bg-zinc-900 text-white'
                  : 'border border-zinc-300 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-500 w-8">時刻</label>
        <input
          type="time"
          value={t}
          onChange={(e) => setT(e.target.value)}
          className="rounded-md border border-zinc-300 h-8 px-2 text-sm"
        />
      </div>
    </div>
  )
}

/* ── 21. deadline (date + optional time) ─ */
function Deadline() {
  const [d, setD] = useState('2026-07-15')
  const [withTime, setWithTime] = useState(false)
  const [t, setT] = useState('17:00')
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="date" value={d} onChange={(e) => setD(e.target.value)}
          className="rounded-md border border-zinc-300 h-8 px-2 text-sm" />
        {withTime && (
          <input type="time" value={t} onChange={(e) => setT(e.target.value)}
            className="rounded-md border border-zinc-300 h-8 px-2 text-sm" />
        )}
      </div>
      <label className="flex items-center gap-2 text-xs text-zinc-600">
        <input
          type="checkbox"
          checked={withTime}
          onChange={(e) => setWithTime(e.target.checked)}
          className="accent-zinc-900"
        />
        時刻も指定する
      </label>
    </div>
  )
}

/* ── 22. availability grid (7d × time) ─── */
function Availability() {
  const [sel, setSel] = useState<Set<string>>(new Set(['2-2', '2-3', '4-1']))
  const days = ['月', '火', '水', '木', '金', '土', '日']
  const hours = ['09', '10', '11', '13', '14', '15']
  const toggle = (k: string) => {
    const n = new Set(sel)
    n.has(k) ? n.delete(k) : n.add(k)
    setSel(n)
  }
  return (
    <div className="text-[10px]">
      <div className="grid grid-cols-8 gap-0.5">
        <div />
        {days.map((d) => <div key={d} className="text-center text-zinc-500">{d}</div>)}
        {hours.map((h, hi) => (
          <React.Fragment key={`h-${hi}`}>
            <div className="text-right pr-1 text-zinc-500">{h}:00</div>
            {days.map((_, di) => {
              const k = `${di}-${hi}`
              const on = sel.has(k)
              return (
                <button
                  key={k}
                  onClick={() => toggle(k)}
                  className={`h-5 rounded-sm ${on ? 'bg-emerald-500' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                />
              )
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-zinc-500">クリックで空き時間を選択 ({sel.size}スロット)</div>
    </div>
  )
}

/* ── 23. relative "in X hours" ──────────── */
function Relative() {
  const [n, setN] = useState(2)
  const [unit, setUnit] = useState('hour')
  const now = new Date('2026-07-09T13:45:00')
  const ms = unit === 'min' ? n * 60000 : unit === 'hour' ? n * 3600000 : n * 86400000
  const target = new Date(now.getTime() + ms)
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs">今から</span>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          min={1}
          className="w-16 rounded-md border border-zinc-300 h-8 px-2 text-sm font-mono"
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}
          className="rounded-md border border-zinc-300 h-8 px-2 text-sm">
          <option value="min">分後</option>
          <option value="hour">時間後</option>
          <option value="day">日後</option>
        </select>
      </div>
      <div className="text-[11px] text-zinc-600 font-mono border-t border-zinc-100 pt-1">
        → {target.toLocaleString('ja-JP', { hour12: false })}
      </div>
    </div>
  )
}

/* ── 24. quarter picker (fiscal) ────────── */
function QuarterPicker() {
  const [y, setY] = useState(2026)
  const [q, setQ] = useState(2)
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button onClick={() => setY(y - 1)} className="p-1 rounded hover:bg-zinc-100">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <div className="font-mono text-sm">{y}</div>
        <button onClick={() => setY(y + 1)} className="p-1 rounded hover:bg-zinc-100">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setQ(n)}
            className={`h-10 text-xs rounded ${
              q === n ? 'bg-zinc-900 text-white' : 'border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <div className="font-semibold">Q{n}</div>
            <div className="text-[9px] opacity-70">
              {['1-3月', '4-6月', '7-9月', '10-12月'][n - 1]}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DateTimeShowcase() {
  const rep: { title: string; note?: string; Comp: () => React.ReactNode }[] = [
    { title: 'Native date', note: '<input type="date">', Comp: NativeDate },
    { title: 'Native time', note: '<input type="time">', Comp: NativeTime },
    { title: 'Native datetime-local', Comp: NativeDatetime },
    { title: 'Text mask date', note: 'YYYY/MM/DD 自動区切り', Comp: MaskDate },
    { title: 'Text mask time', note: 'HH:MM 自動区切り', Comp: MaskTime },
    { title: 'Popover calendar', note: 'input + カレンダードロップダウン', Comp: PopoverCalendar },
    { title: 'Inline month calendar', note: '常時カレンダー表示', Comp: InlineCalendar },
    { title: 'Year picker (grid)', note: '12年をタイル表示', Comp: YearPicker },
    { title: 'Month picker (grid)', note: '12ヶ月をタイル表示', Comp: MonthPicker },
    { title: 'Year + month combined', note: '年リスト + 月グリッド', Comp: YearMonthPicker },
    { title: 'Week picker', note: '週単位でハイライト', Comp: WeekPicker },
    { title: 'Time slot grid', note: '30分刻みのタイル', Comp: TimeSlots },
    { title: 'Time wheel (iOS drum)', note: '時分ドラム', Comp: TimeWheel },
    { title: 'Analog clock dial', note: '時計盤タップ', Comp: ClockDial },
  ]
  const scen: { title: string; note?: string; Comp: () => React.ReactNode }[] = [
    { title: '生年月日', note: '年/月/日 の 3-dropdown', Comp: DOB },
    { title: '年齢入力のみ', note: '生年推定', Comp: AgeInput },
    { title: '予約 (日付+時間帯)', note: 'カレンダー + 時間スロット', Comp: Appointment },
    { title: '宿泊予約 (期間+泊数)', note: 'check-in/out + 泊数計算', Comp: Reservation },
    { title: 'リマインダー (プリセット)', note: '5分/15分/1時間/明日 …', Comp: ReminderPresets },
    { title: '定期スケジュール', note: '曜日 (複数) + 時刻', Comp: Recurring },
    { title: '締切 (日付 + 任意で時刻)', note: '時刻トグル', Comp: Deadline },
    { title: '空き時間表 (7日×時間)', note: 'ヒートマップ的グリッド', Comp: Availability },
    { title: '相対時刻 ("X時間後")', note: '今からの相対指定', Comp: Relative },
    { title: '四半期 (会計期)', note: 'Q1-Q4 タイル', Comp: QuarterPicker },
  ]

  return (
    <div className="max-w-6xl space-y-6">
      <p className="text-sm text-zinc-700">
        日付・時刻入力の <b>表現パターン</b> と <b>シナリオ別パターン</b> をまとめたもの。
        表現は「どう選ばせるか」、シナリオは「その使い所での組み合わせ」。
      </p>

      <section>
        <h2 className="text-sm font-semibold text-zinc-800 mb-2 border-b border-zinc-200 pb-1">
          表現パターン (14種)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {rep.map((p, i) => (
            <Frame key={i} n={i + 1} title={p.title} note={p.note}>
              <p.Comp />
            </Frame>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-800 mb-2 border-b border-zinc-200 pb-1">
          シナリオ別 (10種)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {scen.map((p, i) => (
            <Frame key={i} n={rep.length + i + 1} title={p.title} note={p.note}>
              <p.Comp />
            </Frame>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">選ぶ基準</div>
        <ul className="list-disc pl-4 space-y-0.5 flex flex-col gap-0">
          <li className="flex items-start gap-1"><Calendar className="w-3 h-3 mt-0.5 flex-none" />シンプルなら native 系 — スマホは OS ピッカーで最強</li>
          <li>フォーマット制約が厳しい (帳票/銀行) → text mask</li>
          <li>頻繁に UI で選び直す → popover / inline calendar</li>
          <li>年月しか要らない (請求月/期間) → year+month combined</li>
          <li>過去100年から選ぶ (生年月日) → 3-dropdown が最速</li>
          <li className="flex items-start gap-1"><Clock className="w-3 h-3 mt-0.5 flex-none" />時刻だけ・分刻みが荒い → time slot grid</li>
          <li>予約系は「日付 → 時間帯」の2段階に分けると絶対迷わない</li>
          <li>リマインダー・締切系は「プリセット + カスタム」のハイブリッドが親切</li>
        </ul>
      </section>
    </div>
  )
}
