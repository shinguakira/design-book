import { useState } from 'react'
import {
  Mail,
  Lock,
  Search,
  AtSign,
  Eye,
  EyeOff,
  Calendar,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

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

function FloatingLabel({ label }: { label: string }) {
  const [val, setVal] = useState('')
  return (
    <div className="relative max-w-xs">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        id={`fl-${label}`}
        placeholder=" "
        className="peer w-full h-12 rounded-md border border-zinc-300 px-3 pt-4 text-sm focus:outline-none focus:border-zinc-900"
      />
      <label
        htmlFor={`fl-${label}`}
        className="absolute left-3 top-1.5 text-[10px] text-zinc-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-zinc-900 transition-all pointer-events-none"
      >
        {label}
      </label>
    </div>
  )
}

function PasswordEye() {
  const [show, setShow] = useState(false)
  const [val, setVal] = useState('mypassword')
  return (
    <div className="relative max-w-xs">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <input
        type={show ? 'text' : 'password'}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full h-9 rounded-md border border-zinc-300 pl-9 pr-9 text-sm focus:outline-none focus:border-zinc-900"
      />
      <button
        onClick={() => setShow((s) => !s)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )
}

function NumberStepper() {
  const [n, setN] = useState(3)
  return (
    <div className="inline-flex max-w-xs">
      <button
        onClick={() => setN((v) => Math.max(0, v - 1))}
        className="w-9 h-9 border border-zinc-300 rounded-l-md bg-white hover:bg-zinc-50"
      >
        −
      </button>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(parseInt(e.target.value) || 0)}
        className="w-16 h-9 border-y border-zinc-300 text-center text-sm font-medium tabular-nums outline-none"
      />
      <button
        onClick={() => setN((v) => v + 1)}
        className="w-9 h-9 border border-zinc-300 rounded-r-md bg-white hover:bg-zinc-50"
      >
        +
      </button>
    </div>
  )
}

function PinInput() {
  const [vals, setVals] = useState(['1', '2', '3', '', '', ''])
  return (
    <div className="flex gap-2">
      {vals.map((v, i) => (
        <input
          key={i}
          maxLength={1}
          value={v}
          onChange={(e) => {
            const c = e.target.value.slice(-1)
            setVals((arr) => arr.map((x, j) => (j === i ? c : x)))
            if (c && i < 5) {
              const next = (e.target.parentElement?.children[i + 1] as HTMLInputElement)
              next?.focus()
            }
          }}
          className="w-10 h-12 rounded-md border border-zinc-300 text-center text-lg font-bold tabular-nums focus:outline-none focus:border-zinc-900"
        />
      ))}
    </div>
  )
}

export default function InputShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Plain" note="ラベル + ヒント。最も汎用">
        <div className="space-y-3 max-w-xs">
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              名前
            </label>
            <input
              placeholder="山田太郎"
              className="w-full h-9 rounded-md border border-zinc-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <div className="text-xs text-zinc-500 mt-1">公開プロフィールに表示</div>
          </div>
        </div>
      </Frame>

      <Frame label="2. Filled (Material)" note="塗り背景 + 下線">
        <div className="space-y-3 max-w-xs">
          <input
            placeholder="名前"
            className="w-full h-12 rounded-t-md bg-zinc-100 border-b-2 border-zinc-400 px-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-zinc-50"
          />
          <input
            placeholder="メール"
            className="w-full h-12 rounded-t-md bg-blue-50 border-b-2 border-blue-400 px-3 text-sm text-blue-900 focus:outline-none focus:border-blue-700"
          />
        </div>
      </Frame>

      <Frame label="3. Underline only" note="極限まで装飾を削る">
        <div className="space-y-3 max-w-xs">
          <input
            placeholder="検索キーワード"
            className="w-full h-9 border-b border-zinc-300 px-1 text-sm focus:outline-none focus:border-zinc-900 bg-transparent"
          />
          <input
            placeholder="タイトル"
            className="w-full h-12 border-b-2 border-zinc-300 px-1 text-lg font-semibold focus:outline-none focus:border-blue-600 bg-transparent"
          />
        </div>
      </Frame>

      <Frame label="4. Floating label" note="フォーカスでラベルが上に">
        <FloatingLabel label="メールアドレス" />
      </Frame>

      <Frame label="5. With leading icon" note="アイコンで種類を示唆">
        <div className="space-y-3 max-w-xs">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              placeholder="you@example.com"
              className="w-full h-9 rounded-md border border-zinc-300 pl-9 pr-3 text-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              placeholder="検索..."
              className="w-full h-9 rounded-md border border-zinc-300 pl-9 pr-3 text-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      </Frame>

      <Frame label="6. Prefix / Suffix add-on" note="単位・ドメイン・通貨">
        <div className="space-y-3 max-w-xs">
          <div className="flex">
            <span className="inline-flex items-center px-3 h-9 rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 text-xs text-zinc-500 font-mono">
              https://
            </span>
            <input
              defaultValue="example.com"
              className="flex-1 h-9 border border-zinc-300 px-3 text-sm focus:outline-none focus:border-zinc-900"
            />
            <span className="inline-flex items-center px-3 h-9 rounded-r-md border border-l-0 border-zinc-300 bg-zinc-50 text-xs text-zinc-500 font-mono">
              .jp
            </span>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 h-9 rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 text-lg text-zinc-500">
              ¥
            </span>
            <input
              defaultValue="1,200"
              className="flex-1 h-9 border border-zinc-300 rounded-r-md px-3 text-right tabular-nums text-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      </Frame>

      <Frame label="7. Password with reveal" note="目アイコンで表示/非表示">
        <PasswordEye />
      </Frame>

      <Frame label="8. Validation states" note="成功・エラー">
        <div className="space-y-3 max-w-xs">
          <div className="relative">
            <input
              defaultValue="you@example.com"
              className="w-full h-9 rounded-md border-2 border-emerald-500 pl-3 pr-9 text-sm focus:outline-none"
            />
            <CheckCircle2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="relative">
              <input
                defaultValue="invalid-email"
                className="w-full h-9 rounded-md border-2 border-rose-500 pl-3 pr-9 text-sm focus:outline-none"
              />
              <XCircle className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xs text-rose-600 mt-1">
              メール形式が正しくありません
            </div>
          </div>
        </div>
      </Frame>

      <Frame label="9. Pill / Search bar" note="柔らかい印象。検索特化">
        <div className="space-y-3 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              placeholder="何かを検索..."
              className="w-full h-10 rounded-full border border-zinc-300 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-900 focus:shadow-lg transition"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              placeholder="Quick search"
              className="w-full h-10 rounded-full bg-zinc-100 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
      </Frame>

      <Frame label="10. Number stepper" note="数値専用 +/-">
        <NumberStepper />
      </Frame>

      <Frame label="11. PIN / OTP" note="6桁の認証コード入力">
        <PinInput />
      </Frame>

      <Frame label="12. Inline edit" note="読取モード → クリックで編集">
        <InlineEdit />
      </Frame>

      <Frame label="13. Date / Calendar" note="日付選択">
        <div className="relative max-w-xs">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="date"
            defaultValue="2026-06-04"
            className="w-full h-9 rounded-md border border-zinc-300 pl-9 pr-3 text-sm focus:outline-none focus:border-zinc-900"
          />
        </div>
      </Frame>

      <Frame label="14. Glass on color" note="背景に映える半透明">
        <div
          className="p-5 rounded-md max-w-md"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          }}
        >
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            <input
              placeholder="username"
              className="w-full h-10 rounded-md bg-white/15 backdrop-blur border border-white/30 pl-9 pr-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:bg-white/25"
            />
          </div>
        </div>
      </Frame>

      <Frame label="15. Sizes" note="xs / sm / md / lg">
        <div className="space-y-2 max-w-xs">
          <input
            placeholder="xs"
            className="w-full h-7 rounded border border-zinc-300 px-2 text-xs focus:outline-none focus:border-zinc-900"
          />
          <input
            placeholder="sm"
            className="w-full h-8 rounded-md border border-zinc-300 px-3 text-sm focus:outline-none focus:border-zinc-900"
          />
          <input
            placeholder="md"
            className="w-full h-9 rounded-md border border-zinc-300 px-3 text-sm focus:outline-none focus:border-zinc-900"
          />
          <input
            placeholder="lg"
            className="w-full h-11 rounded-md border border-zinc-300 px-4 text-base focus:outline-none focus:border-zinc-900"
          />
        </div>
      </Frame>
    </div>
  )
}

function InlineEdit() {
  const [edit, setEdit] = useState(false)
  const [val, setVal] = useState('My project name')
  if (edit) {
    return (
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => setEdit(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') setEdit(false)
        }}
        className="w-full max-w-xs h-9 rounded-md border-2 border-blue-500 px-3 text-base font-semibold outline-none"
      />
    )
  }
  return (
    <button
      onClick={() => setEdit(true)}
      className="text-left px-3 py-1.5 rounded-md hover:bg-zinc-100 text-base font-semibold inline-flex items-center gap-2"
    >
      {val}
      <span className="text-xs text-zinc-400">click to edit</span>
    </button>
  )
}
