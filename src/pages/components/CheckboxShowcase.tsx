import { useState } from 'react'
import { Check, Heart, Star } from 'lucide-react'

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

export default function CheckboxShowcase() {
  const [v, setV] = useState({ a: true, b: false, c: true, d: false, e: true })
  const set = (k: keyof typeof v, val: boolean) =>
    setV((s) => ({ ...s, [k]: val }))

  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Default" note="native + accent">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={v.a}
              onChange={(e) => set('a', e.target.checked)}
              className="w-4 h-4 accent-zinc-900"
            />
            <span className="text-sm">同意する</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={v.b}
              onChange={(e) => set('b', e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm">blue</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={v.c}
              onChange={(e) => set('c', e.target.checked)}
              className="w-4 h-4 accent-emerald-600"
            />
            <span className="text-sm">emerald</span>
          </label>
        </div>
      </Frame>

      <Frame label="2. Custom (drawn)" note="完全自前。塗りつぶしを制御">
        <CustomCheck />
      </Frame>

      <Frame label="3. Rounded / Pill" note="柔らかい印象">
        <RoundedCheck />
      </Frame>

      <Frame label="4. Indeterminate" note="子の一部だけ ON の状態">
        <Indeterminate />
      </Frame>

      <Frame label="5. With description" note="ラベル + 説明">
        <DescCheck />
      </Frame>

      <Frame label="6. Card style" note="クリックエリアを大きく">
        <CardCheck />
      </Frame>

      <Frame label="7. Toggle pill" note="ボタン的なチェック">
        <PillCheck />
      </Frame>

      <Frame label="8. Custom icon (Heart / Star)" note="お気に入り・お気に">
        <IconCheck />
      </Frame>

      <Frame label="9. Multi-color group" note="タグ別の色">
        <MultiColor />
      </Frame>

      <Frame label="10. Disabled" note="操作不可">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
            <input type="checkbox" disabled className="w-4 h-4" />
            <span className="text-sm">無効</span>
          </label>
          <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
            <input type="checkbox" checked readOnly disabled className="w-4 h-4 accent-zinc-900" />
            <span className="text-sm">無効 ON</span>
          </label>
        </div>
      </Frame>
    </div>
  )
}

function CustomCheck() {
  const [on, setOn] = useState(true)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex items-center gap-2 group"
    >
      <span
        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
          on
            ? 'bg-zinc-900 border-2 border-zinc-900'
            : 'border-2 border-zinc-300 group-hover:border-zinc-500'
        }`}
      >
        {on && <Check className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className="text-sm">注文を確定する</span>
    </button>
  )
}

function RoundedCheck() {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex items-center gap-2 group"
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          on
            ? 'bg-emerald-500 border-2 border-emerald-500'
            : 'border-2 border-zinc-300 group-hover:border-emerald-400'
        }`}
      >
        {on && <Check className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className="text-sm">タスクを完了</span>
    </button>
  )
}

function Indeterminate() {
  const [items, setItems] = useState({
    a: true,
    b: false,
    c: true,
  })
  const all = Object.values(items).every(Boolean)
  const none = Object.values(items).every((x) => !x)
  const indet = !all && !none
  return (
    <div className="space-y-1.5 max-w-xs">
      <button
        onClick={() => {
          const next = !all
          setItems({ a: next, b: next, c: next })
        }}
        className="flex items-center gap-2"
      >
        <span
          className={`w-5 h-5 rounded-md flex items-center justify-center ${
            all || indet
              ? 'bg-zinc-900 border-2 border-zinc-900'
              : 'border-2 border-zinc-300'
          }`}
        >
          {all && <Check className="w-3.5 h-3.5 text-white" />}
          {indet && <span className="block w-2 h-0.5 bg-white" />}
        </span>
        <span className="text-sm font-semibold">全選択</span>
      </button>
      {(['a', 'b', 'c'] as const).map((k, i) => (
        <button
          key={k}
          onClick={() => setItems((s) => ({ ...s, [k]: !s[k] }))}
          className="flex items-center gap-2 ml-6"
        >
          <span
            className={`w-4 h-4 rounded flex items-center justify-center ${
              items[k]
                ? 'bg-zinc-900 border-2 border-zinc-900'
                : 'border-2 border-zinc-300'
            }`}
          >
            {items[k] && <Check className="w-2.5 h-2.5 text-white" />}
          </span>
          <span className="text-sm">アイテム {i + 1}</span>
        </button>
      ))}
    </div>
  )
}

function DescCheck() {
  const [on, setOn] = useState(true)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex items-start gap-3 text-left max-w-md"
    >
      <span
        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
          on
            ? 'bg-blue-600 border-2 border-blue-600'
            : 'border-2 border-zinc-300'
        }`}
      >
        {on && <Check className="w-3.5 h-3.5 text-white" />}
      </span>
      <div>
        <div className="text-sm font-medium">ニュースレターを購読</div>
        <div className="text-xs text-zinc-500 mt-0.5">
          月1回、デザインの最新トピックをお届け。いつでも解除できます。
        </div>
      </div>
    </button>
  )
}

function CardCheck() {
  const [on, setOn] = useState<Set<string>>(new Set(['react']))
  const toggle = (k: string) =>
    setOn((s) => {
      const n = new Set(s)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl">
      {[
        { id: 'react', name: 'React', desc: 'コラボ前提のフロント' },
        { id: 'vue', name: 'Vue', desc: 'プログレッシブ' },
        { id: 'svelte', name: 'Svelte', desc: 'コンパイラ駆動' },
      ].map((it) => {
        const sel = on.has(it.id)
        return (
          <label
            key={it.id}
            className={`relative cursor-pointer rounded-lg border-2 p-3 transition ${
              sel
                ? 'border-zinc-900 bg-zinc-50'
                : 'border-zinc-200 hover:border-zinc-300'
            }`}
            onClick={() => toggle(it.id)}
          >
            <span
              className={`absolute top-2 right-2 w-4 h-4 rounded flex items-center justify-center ${
                sel ? 'bg-zinc-900' : 'border-2 border-zinc-300'
              }`}
            >
              {sel && <Check className="w-2.5 h-2.5 text-white" />}
            </span>
            <div className="font-semibold text-sm">{it.name}</div>
            <div className="text-xs text-zinc-500 mt-1">{it.desc}</div>
          </label>
        )
      })}
    </div>
  )
}

function PillCheck() {
  const [sel, setSel] = useState<Set<string>>(new Set(['Figma']))
  const toggle = (t: string) =>
    setSel((s) => {
      const n = new Set(s)
      if (n.has(t)) n.delete(t)
      else n.add(t)
      return n
    })
  return (
    <div className="flex flex-wrap gap-1.5">
      {['Figma', 'Sketch', 'Linear', 'GitHub', 'Notion', 'Slack'].map((t) => {
        const on = sel.has(t)
        return (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`inline-flex items-center gap-1 px-3 h-8 rounded-full border text-sm transition ${
              on
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {on && <Check className="w-3 h-3" />}
            {t}
          </button>
        )
      })}
    </div>
  )
}

function IconCheck() {
  const [hearts, setHearts] = useState<Set<string>>(new Set(['a']))
  const [stars, setStars] = useState<Set<string>>(new Set(['b']))
  const toggle = (setter: typeof setHearts, t: string) =>
    setter((s) => {
      const n = new Set(s)
      if (n.has(t)) n.delete(t)
      else n.add(t)
      return n
    })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        {['a', 'b', 'c', 'd'].map((k) => {
          const on = hearts.has(k)
          return (
            <button key={k} onClick={() => toggle(setHearts, k)}>
              <Heart
                className={`w-6 h-6 transition ${
                  on
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-zinc-300 hover:text-rose-300'
                }`}
              />
            </button>
          )
        })}
        <span className="ml-2 text-sm text-zinc-500">いいね</span>
      </div>
      <div className="flex gap-1 items-center">
        {['a', 'b', 'c', 'd', 'e'].map((k) => {
          const on = stars.has(k)
          return (
            <button key={k} onClick={() => toggle(setStars, k)}>
              <Star
                className={`w-6 h-6 transition ${
                  on
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-zinc-300 hover:text-amber-300'
                }`}
              />
            </button>
          )
        })}
        <span className="ml-2 text-sm text-zinc-500">評価</span>
      </div>
    </div>
  )
}

function MultiColor() {
  const opts = [
    { id: 'a', label: 'Frontend', color: 'blue' },
    { id: 'b', label: 'Backend', color: 'emerald' },
    { id: 'c', label: 'Design', color: 'pink' },
    { id: 'd', label: 'Mobile', color: 'amber' },
  ] as const
  const [on, setOn] = useState<Set<string>>(new Set(['a', 'c']))
  const COLORS: Record<string, { box: string; ring: string }> = {
    blue: { box: 'bg-blue-600 border-blue-600', ring: 'hover:border-blue-400' },
    emerald: { box: 'bg-emerald-600 border-emerald-600', ring: 'hover:border-emerald-400' },
    pink: { box: 'bg-pink-600 border-pink-600', ring: 'hover:border-pink-400' },
    amber: { box: 'bg-amber-500 border-amber-500', ring: 'hover:border-amber-400' },
  }
  return (
    <div className="flex flex-wrap gap-4">
      {opts.map((o) => {
        const sel = on.has(o.id)
        return (
          <button
            key={o.id}
            onClick={() =>
              setOn((s) => {
                const n = new Set(s)
                if (n.has(o.id)) n.delete(o.id)
                else n.add(o.id)
                return n
              })
            }
            className="flex items-center gap-2"
          >
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition ${
                sel
                  ? COLORS[o.color].box
                  : `border-zinc-300 ${COLORS[o.color].ring}`
              }`}
            >
              {sel && <Check className="w-3 h-3 text-white" />}
            </span>
            <span className="text-sm">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
