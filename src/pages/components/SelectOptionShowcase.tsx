import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Command,
  FileText,
  Folder,
  Image,
  Music,
  Pencil,
  Star,
  Trash2,
  User,
  Users,
  Zap,
} from 'lucide-react'

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
    <div className="rounded-md border border-zinc-200 bg-white overflow-visible">
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

function Trigger({
  onClick,
  open,
  children,
  w = 220,
}: {
  onClick: () => void
  open: boolean
  children: React.ReactNode
  w?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm text-left ${
        open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
      }`}
      style={{ width: w }}
    >
      <span className="truncate">{children}</span>
      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 flex-none ml-2" />
    </button>
  )
}

function Panel({
  children,
  w = 220,
}: {
  children: React.ReactNode
  w?: number
}) {
  return (
    <div
      className="absolute top-full mt-1 left-0 z-20 rounded-md border border-zinc-200 bg-white shadow-lg overflow-hidden"
      style={{ width: w }}
    >
      {children}
    </div>
  )
}

/* ── 1. plain text ─────────────────────────── */
function S1() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Bravo')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {['Alpha', 'Bravo', 'Charlie', 'Delta'].map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 ${
                v === o ? 'bg-zinc-50' : ''
              }`}
            >
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 2. text + description ─────────────────── */
function S2() {
  const items = [
    { t: 'Free', d: '個人向け · 3プロジェクトまで' },
    { t: 'Pro', d: '中規模チーム向け · 無制限' },
    { t: 'Enterprise', d: 'SSO / 監査ログ / SLA' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Pro')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={260}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-100 ${
                v === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <div className="text-sm font-medium">{it.t}</div>
              <div className="text-xs text-zinc-500">{it.d}</div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 3. icon + text ───────────────────────── */
function S3() {
  const items = [
    { Icon: FileText, t: 'ドキュメント' },
    { Icon: Folder, t: 'フォルダ' },
    { Icon: Image, t: '画像' },
    { Icon: Music, t: '音声' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('フォルダ')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const active = items.find((i) => i.t === v)
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm text-left w-56 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2">
          {active && <active.Icon className="w-4 h-4 text-zinc-500" />}
          {v}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-2" />
      </button>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <it.Icon className="w-4 h-4 text-zinc-500" />
              {it.t}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 4. icon + text + description ──────────── */
function S4() {
  const items = [
    { Icon: User, t: 'Personal', d: '自分だけがアクセス可' },
    { Icon: Users, t: 'Team', d: 'チームメンバー全員' },
    { Icon: Zap, t: 'Public', d: 'リンクを知る全員' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Team')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={280}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-zinc-100 ${
                v === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <it.Icon className="w-4 h-4 text-zinc-500 mt-0.5" />
              <div>
                <div className="text-sm font-medium">{it.t}</div>
                <div className="text-xs text-zinc-500">{it.d}</div>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 5. icon + shortcut kbd ────────────────── */
function S5() {
  const items = [
    { Icon: Pencil, t: '編集', k: '⌘E' },
    { Icon: Star, t: 'お気に入り', k: '⌘D' },
    { Icon: Trash2, t: '削除', k: '⌘⌫' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('編集')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className="w-full px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100"
            >
              <span className="flex items-center gap-2">
                <it.Icon className="w-4 h-4 text-zinc-500" />
                {it.t}
              </span>
              <kbd className="text-[10px] text-zinc-500 font-mono">{it.k}</kbd>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 6. avatar + name + email ──────────────── */
function S6() {
  const users = [
    { name: '山田 太郎', mail: 'taro@example.com', c: 'from-indigo-500 to-purple-600' },
    { name: '佐藤 花子', mail: 'hanako@example.com', c: 'from-rose-500 to-pink-600' },
    { name: '田中 一郎', mail: 'ichiro@example.com', c: 'from-emerald-500 to-teal-600' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(users[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-2 text-sm text-left w-64 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <span
            className={`w-5 h-5 rounded-full bg-gradient-to-br ${v.c} text-white grid place-items-center text-[10px] font-semibold flex-none`}
          >
            {v.name[0]}
          </span>
          <span className="truncate">{v.name}</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-2 flex-none" />
      </button>
      {open && (
        <Panel w={280}>
          {users.map((u) => (
            <button
              key={u.mail}
              onClick={() => {
                setV(u)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-zinc-100 ${
                v.name === u.name ? 'bg-zinc-50' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${u.c} text-white grid place-items-center text-[11px] font-semibold flex-none`}
              >
                {u.name[0]}
              </div>
              <div className="min-w-0 text-left">
                <div className="text-sm truncate">{u.name}</div>
                <div className="text-xs text-zinc-500 truncate">{u.mail}</div>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 7. color swatch ───────────────────────── */
function S7() {
  const colors = [
    { hex: '#ef4444', name: 'Red' },
    { hex: '#10b981', name: 'Emerald' },
    { hex: '#3b82f6', name: 'Blue' },
    { hex: '#f59e0b', name: 'Amber' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(colors[2])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm text-left w-56 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full ring-1 ring-inset ring-black/10"
            style={{ background: v.hex }}
          />
          {v.name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <Panel>
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => {
                setV(c)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v.hex === c.hex ? 'bg-zinc-50' : ''
              }`}
            >
              <span
                className="w-4 h-4 rounded-full ring-1 ring-inset ring-black/10"
                style={{ background: c.hex }}
              />
              <span>{c.name}</span>
              <span className="ml-auto font-mono text-[10px] text-zinc-400">{c.hex}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 8. country flag ────────────────────── */
function S8() {
  const items = [
    { flag: '🇯🇵', name: '日本', code: '+81' },
    { flag: '🇺🇸', name: 'United States', code: '+1' },
    { flag: '🇬🇧', name: 'United Kingdom', code: '+44' },
    { flag: '🇩🇪', name: 'Germany', code: '+49' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm w-56 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-base leading-none">{v.flag}</span>
          {v.name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.name}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v.name === it.name ? 'bg-zinc-50' : ''
              }`}
            >
              <span className="text-base leading-none">{it.flag}</span>
              <span>{it.name}</span>
              <span className="ml-auto font-mono text-xs text-zinc-500">{it.code}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 9. currency ──────────────────────────── */
function S9() {
  const items = [
    { sym: '¥', code: 'JPY', name: '日本円' },
    { sym: '$', code: 'USD', name: '米ドル' },
    { sym: '€', code: 'EUR', name: 'ユーロ' },
    { sym: '£', code: 'GBP', name: '英ポンド' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm w-56 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="font-mono font-semibold">{v.sym}</span>
          <span className="font-mono">{v.code}</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.code}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-3 hover:bg-zinc-100 ${
                v.code === it.code ? 'bg-zinc-50' : ''
              }`}
            >
              <span className="w-6 text-center font-mono font-semibold">{it.sym}</span>
              <span className="font-mono">{it.code}</span>
              <span className="text-zinc-500">{it.name}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 10. timezone ─────────────────────────── */
function S10() {
  const items = [
    { city: 'Tokyo', off: 'GMT+9', now: '17:23' },
    { city: 'San Francisco', off: 'GMT-8', now: '00:23' },
    { city: 'London', off: 'GMT+0', now: '08:23' },
    { city: 'Sydney', off: 'GMT+11', now: '19:23' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={220}>
        {v.city} ({v.off})
      </Trigger>
      {open && (
        <Panel w={260}>
          {items.map((it) => (
            <button
              key={it.city}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v.city === it.city ? 'bg-zinc-50' : ''
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{it.city}</span>
              <span className="ml-auto text-xs text-zinc-500">{it.off}</span>
              <span className="font-mono text-xs text-zinc-500">{it.now}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 11. badge count on right ─────────────── */
function S11() {
  const items = [
    { t: 'Inbox', n: 128 },
    { t: 'Snoozed', n: 3 },
    { t: 'Archive', n: 2451 },
    { t: 'Spam', n: 0 },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Inbox')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 ${
                v === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <span>{it.t}</span>
              {it.n > 0 && (
                <span className="text-[10px] rounded-full bg-zinc-200 text-zinc-700 px-1.5 py-0.5">
                  {it.n}
                </span>
              )}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 12. checkmark on selected ────────────── */
function S12() {
  const items = ['Low', 'Medium', 'High', 'Critical']
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Medium')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className="w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100"
            >
              <span className="w-4">
                {v === o && <Check className="w-4 h-4 text-emerald-600" />}
              </span>
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 13. checkbox multi-select (stays open) ───── */
function S13() {
  const items = ['Design', 'Bug', 'Docs', 'Enhancement']
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState<Set<string>>(new Set(['Design', 'Bug']))
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const toggle = (t: string) => {
    const n = new Set(sel)
    n.has(t) ? n.delete(t) : n.add(t)
    setSel(n)
  }
  const label =
    sel.size === 0
      ? '選択なし'
      : sel.size === 1
      ? Array.from(sel)[0]
      : `${sel.size}件選択中`
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {label}
      </Trigger>
      {open && (
        <Panel>
          {items.map((o) => (
            <button
              key={o}
              onClick={() => toggle(o)}
              className="w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100"
            >
              <span
                className={`w-4 h-4 rounded border-2 grid place-items-center ${
                  sel.has(o) ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300'
                }`}
              >
                {sel.has(o) && <Check className="w-3 h-3 text-white" />}
              </span>
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 14. status dot ───────────────────────── */
function S14() {
  const items = [
    { t: 'Backlog', c: 'bg-zinc-400' },
    { t: 'In Progress', c: 'bg-blue-500' },
    { t: 'In Review', c: 'bg-amber-500' },
    { t: 'Done', c: 'bg-emerald-500' },
    { t: 'Canceled', c: 'bg-rose-500' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[1])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm w-56 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${v.c}`} />
          {v.t}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${it.c}`} />
              {it.t}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 15. disabled option ─────────────────── */
function S15() {
  const items = [
    { t: '無料プラン', ok: true },
    { t: 'Pro プラン', ok: true },
    { t: 'Enterprise', ok: false },
    { t: '教育機関向け', ok: false },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('無料プラン')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              disabled={!it.ok}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm text-left flex items-center justify-between ${
                it.ok
                  ? 'hover:bg-zinc-100'
                  : 'text-zinc-400 cursor-not-allowed'
              } ${v === it.t ? 'bg-zinc-50' : ''}`}
            >
              <span>{it.t}</span>
              {!it.ok && <span className="text-[10px] text-zinc-400">利用不可</span>}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 16. destructive / danger ────────────── */
function S16() {
  const [open, setOpen] = useState(false)
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        アクションを選択…
      </Trigger>
      {open && (
        <Panel>
          {['プロフィール編集', '設定', 'サブスクリプション'].map((o) => (
            <button
              key={o}
              onClick={() => setOpen(false)}
              className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
            >
              {o}
            </button>
          ))}
          <div className="border-t border-zinc-100" />
          <button
            onClick={() => setOpen(false)}
            className="w-full px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            アカウントを削除
          </button>
        </Panel>
      )}
    </div>
  )
}

/* ── 17. inline actions on hover ────────── */
function S17() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('マイテンプレート')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const items = ['マイテンプレート', '共有中のテンプレ', 'アーカイブ済']
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={280}>
          {items.map((o) => (
            <div
              key={o}
              className={`px-3 py-1.5 text-sm flex items-center justify-between group hover:bg-zinc-100 ${
                v === o ? 'bg-zinc-50' : ''
              }`}
            >
              <button
                onClick={() => {
                  setV(o)
                  setOpen(false)
                }}
                className="flex-1 text-left"
              >
                {o}
              </button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button className="p-1 rounded hover:bg-zinc-200">
                  <Pencil className="w-3 h-3 text-zinc-600" />
                </button>
                <button className="p-1 rounded hover:bg-zinc-200">
                  <Trash2 className="w-3 h-3 text-zinc-600" />
                </button>
              </div>
            </div>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 18. thumbnail ─────────────────────── */
function S18() {
  const items = [
    { t: 'Sunset over Mt.Fuji', c: 'from-orange-400 to-rose-600' },
    { t: 'Ocean waves', c: 'from-cyan-400 to-blue-700' },
    { t: 'Forest canopy', c: 'from-emerald-400 to-green-800' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[1])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between rounded-md border bg-white h-9 px-2 text-sm w-64 ${
          open ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-300'
        }`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className={`w-6 h-6 rounded bg-gradient-to-br ${v.c} flex-none`} />
          <span className="truncate">{v.t}</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 flex-none" />
      </button>
      {open && (
        <Panel w={280}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded bg-gradient-to-br ${it.c} flex-none`} />
              <div className="text-sm truncate text-left">{it.t}</div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 19. search-highlighted ─────────────── */
function S19() {
  const all = ['Vercel', 'Vector graphics', 'Very old drafts', 'Ventures', 'Vault']
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('Ver')
  const [v, setV] = useState('Vercel')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const filtered = all.filter((o) => o.toLowerCase().includes(q.toLowerCase()))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v}
      </Trigger>
      {open && (
        <Panel w={260}>
          <div className="p-2 border-b border-zinc-100">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="検索…"
              className="w-full text-xs px-2 py-1 border border-zinc-200 rounded"
              autoFocus
            />
          </div>
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-xs text-zinc-500">一致なし</div>
          )}
          {filtered.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 ${
                v === o ? 'bg-zinc-50' : ''
              }`}
            >
              {o.split(new RegExp(`(${q})`, 'i')).map((p, k) =>
                q && p.toLowerCase() === q.toLowerCase() ? (
                  <mark
                    key={k}
                    className="bg-amber-200 text-zinc-900 font-semibold rounded"
                  >
                    {p}
                  </mark>
                ) : (
                  <span key={k}>{p}</span>
                ),
              )}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 20. grouped w/ section headers ─────── */
function S20() {
  const groups = [
    { g: 'Frontend', items: ['React', 'Vue', 'Svelte'] },
    { g: 'Backend', items: ['Node', 'Go', 'Rust'] },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('React')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {groups.map((gr, gi) => (
            <div key={gr.g}>
              {gi > 0 && <div className="border-t border-zinc-100" />}
              <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                {gr.g}
              </div>
              {gr.items.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setV(o)
                    setOpen(false)
                  }}
                  className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${
                    v === o ? 'bg-zinc-50' : ''
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 21. recently used ──────────────────── */
function S21() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState('Q4 Report')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  const recent = ['Q4 Report', 'Handoff notes']
  const rest = ['Roadmap 2026', 'Design principles', 'Onboarding']
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            最近使った
          </div>
          {recent.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${
                v === o ? 'bg-zinc-50' : ''
              }`}
            >
              {o}
            </button>
          ))}
          <div className="border-t border-zinc-100" />
          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
            すべて
          </div>
          {rest.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o)
                setOpen(false)
              }}
              className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${
                v === o ? 'bg-zinc-50' : ''
              }`}
            >
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 22. nested / submenu ───────────────── */
function S22() {
  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState<string | null>(null)
  const ref = useOutside<HTMLDivElement>(() => {
    setOpen(false)
    setSubOpen(null)
  })
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        アクション…
      </Trigger>
      {open && (
        <Panel>
          {['Cut', 'Copy'].map((o) => (
            <button
              key={o}
              onClick={() => setOpen(false)}
              className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
            >
              {o}
            </button>
          ))}
          <div
            className="relative px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 cursor-pointer"
            onMouseEnter={() => setSubOpen('paste')}
            onMouseLeave={() => setSubOpen(null)}
          >
            <span>Paste as...</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            {subOpen === 'paste' && (
              <div className="absolute left-full top-0 ml-1 rounded-md border border-zinc-200 bg-white shadow-lg overflow-hidden w-40 z-30">
                {['Plain text', 'Markdown', 'HTML'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setOpen(false)}
                    className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Panel>
      )}
    </div>
  )
}

/* ── 23. loading skeleton ───────────────── */
function S23() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [v, setV] = useState('候補を読み込む…')
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  useEffect(() => {
    if (open && loading) {
      const t = setTimeout(() => setLoading(false), 1400)
      return () => clearTimeout(t)
    }
  }, [open, loading])
  const items = ['Roadmap Q1', 'Q4 Retrospective', 'Onboarding v2']
  return (
    <div ref={ref} className="relative">
      <Trigger
        onClick={() => {
          setOpen(!open)
          setLoading(true)
        }}
        open={open}
      >
        {v}
      </Trigger>
      {open && (
        <Panel>
          {loading
            ? [80, 60, 90, 50].map((w, i) => (
                <div key={i} className="px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-200 animate-pulse" />
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-2 rounded bg-zinc-200 animate-pulse"
                      style={{ width: `${w}%` }}
                    />
                    <div className="h-1.5 rounded bg-zinc-100 animate-pulse w-1/2" />
                  </div>
                </div>
              ))
            : items.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setV(o)
                    setOpen(false)
                  }}
                  className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
                >
                  {o}
                </button>
              ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 24. empty state ────────────────────── */
function S24() {
  const [open, setOpen] = useState(false)
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        テンプレートを選択…
      </Trigger>
      {open && (
        <Panel>
          <div className="px-3 py-6 grid place-items-center text-center">
            <div className="w-10 h-10 rounded-full bg-zinc-100 grid place-items-center mb-2">
              <Star className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-xs text-zinc-600">まだ候補がありません</div>
            <button className="mt-2 text-xs text-blue-600 hover:underline">
              + 新規追加
            </button>
          </div>
        </Panel>
      )}
    </div>
  )
}

/* ── 25. rich card + meta ───────────────── */
function S25() {
  const items = [
    { t: 'Q4 Product Launch', meta: '25 tasks · 3 members', updated: '2h ago', tag: 'On track' },
    { t: 'Design System v2', meta: '11 tasks · 2 members', updated: '1d ago', tag: 'At risk' },
    { t: 'Website Refresh', meta: '4 tasks · 1 member', updated: '3d ago', tag: 'On track' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={260}>
        {v.t}
      </Trigger>
      {open && (
        <Panel w={300}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{it.t}</div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    it.tag === 'On track'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {it.tag}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between text-[11px] text-zinc-500">
                <span>{it.meta}</span>
                <span>{it.updated}</span>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 26. two-column (name + meta right) ─── */
function S26() {
  const items = [
    { t: 'main', d: 'default' },
    { t: 'develop', d: '2 ahead' },
    { t: 'feat/onboarding', d: '11 ahead' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[1])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v.t}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <span className="font-mono">{it.t}</span>
              <span className="text-xs text-zinc-500">{it.d}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 27. tag / chip inside ─────────────── */
function S27() {
  const items = [
    { t: 'ドキュメントを新規作成', tags: ['ai', 'β'] },
    { t: 'テンプレートから', tags: ['pro'] },
    { t: 'インポート', tags: [] as string[] },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={260}>
        {v.t}
      </Trigger>
      {open && (
        <Panel w={300}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <span>{it.t}</span>
              <div className="ml-auto flex gap-1">
                {it.tags.map((tg) => (
                  <span
                    key={tg}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      tg === 'β' || tg === 'pro'
                        ? 'bg-fuchsia-100 text-fuchsia-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 28. progress meter (usage) ───────── */
function S28() {
  const items = [
    { t: 'Free', u: 30 },
    { t: 'Pro', u: 68 },
    { t: 'Team', u: 92 },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[1])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={220}>
        {v.t} ({v.u}%)
      </Trigger>
      {open && (
        <Panel w={260}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <div className="flex items-center justify-between text-sm">
                <span>{it.t}</span>
                <span className="text-xs text-zinc-500">{it.u}% used</span>
              </div>
              <div className="mt-1 h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    it.u > 80
                      ? 'bg-rose-500'
                      : it.u > 50
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${it.u}%` }}
                />
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 29. command-palette style ───────── */
function S29() {
  const items = [
    { Icon: FileText, t: '新しいドキュメント', k: 'D', kind: 'Doc' },
    { Icon: User, t: 'プロフィールを開く', k: 'P', kind: 'Nav' },
    { Icon: Star, t: 'お気に入り一覧', k: 'F', kind: 'View' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[0].t)
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={260}>
        {v}
      </Trigger>
      {open && (
        <Panel w={320}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t)
                setOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${
                v === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <it.Icon className="w-4 h-4 text-zinc-500" />
              <span className="flex-1 truncate text-left">{it.t}</span>
              <span className="text-[10px] text-zinc-400 uppercase">{it.kind}</span>
              <kbd className="text-[10px] font-mono border border-zinc-200 rounded px-1 bg-zinc-50 text-zinc-600 flex items-center gap-0.5">
                <Command className="w-2.5 h-2.5" />
                {it.k}
              </kbd>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

/* ── 30. rich w/ description + badge ─── */
function S30() {
  const items = [
    { Icon: Zap, t: 'Instant', d: '数秒で応答 · 精度は控えめ', badge: '推奨' },
    { Icon: Star, t: 'Balanced', d: '速度と精度のバランス', badge: null as string | null },
    { Icon: FileText, t: 'Extended thinking', d: '長い思考 · 遅いが精度高', badge: 'β' },
  ]
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(items[1])
  const ref = useOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v.t}
      </Trigger>
      {open && (
        <Panel w={320}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 flex items-start gap-2 hover:bg-zinc-100 ${
                v.t === it.t ? 'bg-zinc-50' : ''
              }`}
            >
              <it.Icon className="w-4 h-4 text-zinc-500 mt-0.5" />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{it.t}</div>
                  {it.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        it.badge === '推奨'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-fuchsia-100 text-fuchsia-800'
                      }`}
                    >
                      {it.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500">{it.d}</div>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  )
}

export default function SelectOptionShowcase() {
  const patterns: { title: string; note?: string; Comp: () => React.ReactNode }[] = [
    { title: 'Plain text', Comp: S1 },
    { title: 'Text + description', note: '2行 · 説明つき', Comp: S2 },
    { title: 'Icon + text', Comp: S3 },
    { title: 'Icon + text + description', Comp: S4 },
    { title: 'Icon + shortcut key', note: '右端に ⌘K 等', Comp: S5 },
    { title: 'Avatar + name + email', Comp: S6 },
    { title: 'Color swatch', note: '右に hex', Comp: S7 },
    { title: 'Country flag + code', Comp: S8 },
    { title: 'Currency (symbol/code/name)', Comp: S9 },
    { title: 'Timezone (city + offset + time)', Comp: S10 },
    { title: 'Badge / count right', Comp: S11 },
    { title: 'Checkmark on selected', Comp: S12 },
    { title: 'Checkbox multi-select', note: '開いたまま複数選択', Comp: S13 },
    { title: 'Status dot + name', note: 'Linear/GitHub 系', Comp: S14 },
    { title: 'Disabled option', Comp: S15 },
    { title: 'Destructive / danger', note: '削除など危険操作', Comp: S16 },
    { title: 'Inline action buttons', note: 'hover で編集/削除', Comp: S17 },
    { title: 'Thumbnail image', Comp: S18 },
    { title: 'Search highlighted', note: '入力に応じて絞り込み', Comp: S19 },
    { title: 'Grouped w/ section header', Comp: S20 },
    { title: 'Recently used section', Comp: S21 },
    { title: 'Nested submenu', note: 'Paste as… → hover でサブメニュー', Comp: S22 },
    { title: 'Loading skeleton', note: '開くと 1.4秒 skeleton → 実データ', Comp: S23 },
    { title: 'Empty state', Comp: S24 },
    { title: 'Rich card + meta row', Comp: S25 },
    { title: 'Two-column (name + meta)', Comp: S26 },
    { title: 'Tag / chip inside option', Comp: S27 },
    { title: 'Progress meter (usage)', Comp: S28 },
    { title: 'Command-palette style', Comp: S29 },
    { title: 'Rich w/ description + badge', Comp: S30 },
  ]
  return (
    <div className="max-w-6xl space-y-3">
      <p className="text-sm text-zinc-700">
        Select の <b>オプション行</b> の表現 30パターン。各トリガーを実際にクリックして
        開くと、そのパターンで組んだドロップダウンが出る。Select 本体はどれも同じ
        「ボタン + ChevronDown」で、違いは 1行 の中身だけ。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {patterns.map((p, i) => (
          <Frame key={i} n={i + 1} title={p.title} note={p.note}>
            <p.Comp />
          </Frame>
        ))}
      </div>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">選ぶ基準</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>1情報 → Plain / Icon+text</li>
          <li>説明が要る → +description / rich card</li>
          <li>選択状態を明示 → Checkmark / Checkbox / bg-highlight</li>
          <li>大量から選ぶ → Grouped / Recently used / Search highlighted</li>
          <li>横に追加情報 → shortcut / count / meta / hex / offset</li>
          <li>視覚オブジェクト → color swatch / flag / thumbnail / avatar</li>
          <li>非同期・状態 → skeleton / empty / disabled</li>
          <li>操作を追加 → inline action / submenu / destructive</li>
        </ul>
      </section>
    </div>
  )
}
