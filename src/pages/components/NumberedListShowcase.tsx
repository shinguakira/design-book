import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trophy,
  Flame,
} from 'lucide-react'

type Food = { name: string; country: string; score: number }

const FOODS: Food[] = [
  { name: '寿司', country: '日本', score: 92 },
  { name: 'ピザ', country: 'イタリア', score: 88 },
  { name: 'ラーメン', country: '日本', score: 86 },
  { name: '焼肉', country: '韓国', score: 84 },
  { name: 'パスタ', country: 'イタリア', score: 81 },
  { name: 'ハンバーガー', country: 'アメリカ', score: 78 },
  { name: 'カレー', country: 'インド', score: 76 },
  { name: '焼鳥', country: '日本', score: 74 },
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

const MEDAL_BG: Record<number, string> = {
  1: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-900',
  2: 'bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-700',
  3: 'bg-gradient-to-br from-orange-300 to-amber-700 text-orange-50',
}

function roman(n: number) {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let r = ''
  for (const [v, s] of map) {
    while (n >= v) {
      r += s
      n -= v
    }
  }
  return r
}

const BUBBLE_GRADIENTS = [
  'from-pink-400 to-rose-600',
  'from-violet-400 to-purple-600',
  'from-blue-400 to-cyan-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-600',
  'from-sky-400 to-indigo-600',
  'from-fuchsia-400 to-pink-600',
  'from-lime-400 to-emerald-600',
]

const TIER_LABEL = ['S', 'S', 'A', 'A', 'B', 'B', 'C', 'C']
const TIER_BG: Record<string, string> = {
  S: 'bg-rose-500 text-white',
  A: 'bg-amber-500 text-white',
  B: 'bg-emerald-500 text-white',
  C: 'bg-zinc-400 text-white',
}

function Reorderable() {
  const [items, setItems] = useState(FOODS.slice(0, 6))
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    setItems((arr) => {
      const next = [...arr]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }
  return (
    <ul className="rounded-md border border-zinc-200 bg-white divide-y divide-zinc-100">
      {items.map((f, i) => (
        <li
          key={f.name}
          className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50 group"
        >
          <GripVertical className="w-4 h-4 text-zinc-300 cursor-grab" />
          <div className="w-6 text-center text-sm font-semibold text-zinc-400 tabular-nums">
            {i + 1}
          </div>
          <div className="flex-1 text-sm">{f.name}</div>
          <div className="opacity-0 group-hover:opacity-100 transition flex gap-0.5">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="w-6 h-6 rounded hover:bg-zinc-100 text-zinc-500 disabled:opacity-30 flex items-center justify-center"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              className="w-6 h-6 rounded hover:bg-zinc-100 text-zinc-500 disabled:opacity-30 flex items-center justify-center"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function NumberedListShowcase() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        「番号 + 名前」の1行リスト。
        ランキング・目次・タスク・上位リスト等で頻出。
        順序の見せ方・密度・装飾の強さを変えた19パターン。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 1 */}
        <Frame label="Plain serif (newspaper)" note="紙面・目次・PubMed風">
          <ol className="divide-y divide-zinc-200">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="grid grid-cols-[28px_1fr] gap-3 py-1.5 items-baseline"
              >
                <div className="text-right font-serif text-lg font-bold leading-none text-zinc-300">
                  {i + 1}
                </div>
                <div className="text-sm">{f.name}</div>
              </li>
            ))}
          </ol>
        </Frame>

        {/* 2 */}
        <Frame label="Circle numbers" note="アプリの定番。To-do / ステップ">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
                  {i + 1}
                </div>
                <div className="text-sm">{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 3 */}
        <Frame label="Medal ranking" note="Top3 のみ装飾、4位以降はミニマル">
          <ul className="space-y-1">
            {FOODS.map((f, i) => {
              const rank = i + 1
              const medal = MEDAL_BG[rank]
              return (
                <li
                  key={f.name}
                  className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-zinc-50"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold tabular-nums ${
                      medal ?? 'bg-zinc-100 text-zinc-500 text-xs'
                    } ${medal ? 'shadow-sm' : ''}`}
                  >
                    {rank <= 3 ? <Trophy className="w-4 h-4" /> : rank}
                  </div>
                  <div className="flex-1 text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-zinc-400">{f.country}</div>
                </li>
              )
            })}
          </ul>
        </Frame>

        {/* 4 */}
        <Frame label="Boxed numbers" note="角張った印象。論文の参考文献など">
          <ul className="space-y-1">
            {FOODS.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 border border-zinc-300 rounded text-xs font-mono font-semibold flex items-center justify-center text-zinc-600 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 5 */}
        <Frame label="Big faded background" note="番号を大きく薄く、視覚的アクセント">
          <ul className="space-y-1">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="relative flex items-center gap-4 px-2 py-1.5"
              >
                <span
                  className="font-serif text-3xl font-bold text-zinc-100 tabular-nums leading-none w-10 text-right select-none"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-zinc-900">
                  {f.name}
                </span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 6 */}
        <Frame label="Pill numbers" note="柔らかい。チーム順位など">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center justify-center min-w-7 h-5 px-2 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold tabular-nums">
                  #{i + 1}
                </span>
                <span>{f.name}</span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 7 */}
        <Frame label="With right meta" note="数字+名前+右端に値 (スコア・件数)">
          <ul className="divide-y divide-zinc-200">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="grid grid-cols-[28px_1fr_auto] gap-3 py-2 items-baseline"
              >
                <div className="text-right text-sm font-semibold text-zinc-400 tabular-nums">
                  {i + 1}
                </div>
                <div className="text-sm">{f.name}</div>
                <div className="text-sm font-mono tabular-nums text-zinc-600">
                  {f.score}
                </div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 8 */}
        <Frame label="Striped (zebra)" note="密度高め・データ表示風">
          <ul className="overflow-hidden rounded-md border border-zinc-200">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className={`flex items-center gap-3 px-3 py-1.5 text-sm ${
                  i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'
                }`}
              >
                <div className="w-6 text-right font-mono text-xs text-zinc-400 tabular-nums">
                  {i + 1}
                </div>
                <div className="flex-1">{f.name}</div>
                <div className="text-xs text-zinc-500">{f.country}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 9 */}
        <Frame label="Reorderable" note="hover で並べ替えボタン (▲▼)">
          <Reorderable />
        </Frame>

        {/* 10 — Border card with tier color */}
        <Frame label="Bordered card (tiered)" note="行ごとに小カード、左辺がランク帯">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => {
              const colors =
                i < 3
                  ? 'border-l-amber-500'
                  : i < 6
                    ? 'border-l-zinc-400'
                    : 'border-l-orange-700'
              return (
                <li
                  key={f.name}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md bg-white border border-zinc-200 border-l-4 shadow-sm ${colors}`}
                >
                  <div className="font-serif text-xl font-bold tabular-nums text-zinc-800 w-6 text-center">
                    {i + 1}
                  </div>
                  <div className="flex-1 text-sm font-medium">{f.name}</div>
                  <div className="text-[11px] text-zinc-400">{f.country}</div>
                </li>
              )
            })}
          </ul>
        </Frame>

        {/* 11 — Roman numerals */}
        <Frame label="Roman numerals" note="編集的・上品。書籍の章立て向け">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="grid grid-cols-[44px_1fr] gap-3 items-baseline border-b border-zinc-100 pb-1.5"
              >
                <div className="text-right font-serif text-lg italic text-zinc-600 tabular-nums">
                  {roman(i + 1)}
                </div>
                <div className="font-serif text-base">{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 12 — Gradient bubble per rank */}
        <Frame label="Gradient bubbles" note="ランクごとに別グラデ。Linear/Stripe風">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${BUBBLE_GRADIENTS[i % BUBBLE_GRADIENTS.length]} text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-md tabular-nums`}
                >
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 13 — Hexagon */}
        <Frame label="Hexagon" note="幾何学的、ゲームUI / 軍記号風">
          <ul className="space-y-1.5">
            {FOODS.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 bg-zinc-900 text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums"
                  style={{
                    clipPath:
                      'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  {i + 1}
                </div>
                <div className="text-sm">{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 14 — Bar overlay (score visualization) */}
        <Frame
          label="Bar overlay"
          note="番号+名前の背景がスコア比率の塗りつぶしバーになる"
        >
          <ul className="space-y-1">
            {FOODS.map((f, i) => {
              const max = FOODS[0].score
              const pct = (f.score / max) * 100
              return (
                <li
                  key={f.name}
                  className="relative h-8 rounded-md overflow-hidden bg-zinc-50"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-100 to-blue-200"
                    style={{ width: `${pct}%` }}
                  />
                  <div className="relative h-full flex items-center gap-3 px-3 text-sm">
                    <span className="font-semibold tabular-nums text-zinc-700 w-5">
                      {i + 1}
                    </span>
                    <span className="flex-1">{f.name}</span>
                    <span className="font-mono text-xs text-zinc-600 tabular-nums">
                      {f.score}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </Frame>

        {/* 15 — Tier blocks (S/A/B/C) */}
        <Frame label="Tier blocks (S/A/B/C)" note="ティアリスト・カードゲーム評価風">
          <ul className="space-y-1">
            {FOODS.map((f, i) => {
              const tier = TIER_LABEL[i]
              return (
                <li
                  key={f.name}
                  className="flex items-center gap-3 rounded-md overflow-hidden"
                >
                  <div
                    className={`w-12 h-10 ${TIER_BG[tier]} flex items-center justify-center text-lg font-black shrink-0`}
                  >
                    {tier}
                  </div>
                  <div className="flex-1 text-sm font-semibold">{f.name}</div>
                  <div className="text-xs font-mono text-zinc-400 tabular-nums pr-2">
                    #{i + 1}
                  </div>
                </li>
              )
            })}
          </ul>
        </Frame>

        {/* 16 — Subway / metro line */}
        <Frame label="Subway line" note="ロードマップ・タイムライン。縦線で繋ぐ">
          <ul className="relative pl-3">
            <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500 to-emerald-300" />
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="relative flex items-center gap-4 py-2"
              >
                <div className="w-6 h-6 rounded-full bg-white border-[3px] border-emerald-500 text-[10px] font-bold text-emerald-800 flex items-center justify-center shrink-0 z-10 tabular-nums">
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 17 — Neon dark */}
        <Frame label="Neon (dark theme)" note="シネマ・ゲーム配信。鮮烈な発光">
          <div className="rounded-md bg-zinc-950 p-4">
            <ul className="space-y-1.5">
              {FOODS.map((f, i) => (
                <li key={f.name} className="flex items-center gap-3 text-sm">
                  <div
                    className="w-8 text-right font-mono text-2xl font-bold tabular-nums leading-none"
                    style={{
                      color: '#22d3ee',
                      textShadow:
                        '0 0 6px #22d3ee, 0 0 12px #06b6d4, 0 0 24px rgba(6,182,212,0.4)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-zinc-200 tracking-wide">{f.name}</div>
                  {i === 0 && (
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Frame>

        {/* 18 — Dotted leader */}
        <Frame
          label="Dotted leader"
          note="メニュー・目次の古典タイポ。番号 ··· 名前 ··· 値"
        >
          <ul className="space-y-1 font-serif">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="flex items-baseline gap-2 text-sm"
              >
                <span className="tabular-nums text-zinc-500 w-5">{i + 1}</span>
                <span>{f.name}</span>
                <span className="flex-1 border-b border-dotted border-zinc-300 mb-1" />
                <span className="text-zinc-500 tabular-nums">{f.score}</span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 19 — Receipt (monospace, dashed) */}
        <Frame label="Receipt / ticket" note="モノ等幅・破線・KASA音">
          <div className="bg-[#fbf6e7] border-2 border-dashed border-zinc-400 rounded-sm p-4 font-mono">
            <div className="text-center text-[11px] uppercase tracking-[0.3em] text-zinc-600 mb-2">
              ★ TOP 8 ★
            </div>
            <div className="border-t border-dashed border-zinc-400 my-2" />
            <ul className="space-y-0.5 text-[13px] text-zinc-900">
              {FOODS.map((f, i) => (
                <li key={f.name} className="flex items-baseline">
                  <span className="w-6 tabular-nums">{i + 1}.</span>
                  <span className="flex-1">{f.name}</span>
                  <span className="tabular-nums">{f.score}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-dashed border-zinc-400 my-2" />
            <div className="text-center text-[10px] text-zinc-500">
              ありがとうございました
            </div>
          </div>
        </Frame>

        {/* 20 — Card grid (trading cards) */}
        <Frame
          label="Trading card grid"
          note="リスト→グリッド化。カードゲーム / コレクション"
          span
        >
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className={`relative rounded-lg p-3 text-center bg-gradient-to-br ${BUBBLE_GRADIENTS[i % BUBBLE_GRADIENTS.length]} text-white shadow-lg overflow-hidden`}
              >
                <div className="absolute top-1 left-2 font-serif text-xl font-bold tabular-nums opacity-70">
                  #{i + 1}
                </div>
                <div className="absolute top-1 right-2 text-[10px] uppercase tracking-wider opacity-80">
                  {f.country}
                </div>
                <div className="pt-6 pb-1 text-base font-bold">{f.name}</div>
                <div className="text-[11px] font-mono tabular-nums opacity-90">
                  ★ {f.score}
                </div>
              </li>
            ))}
          </ul>
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>視線誘導が必要</b> (ランキング) →
            番号を強く: Medal / Big faded / Gradient bubble / Neon
          </li>
          <li>
            <b>情報を素早く読ませたい</b> (目次) →
            番号は控えめに: Plain serif / Boxed / Striped / Dotted leader
          </li>
          <li>
            <b>触らせる</b> (To-do) → Circle + Reorderable
          </li>
          <li>
            <b>世界観を出す</b> →
            Roman (書籍) / Hexagon (ゲーム) / Neon (配信) /
            Receipt (アナログ) / Trading card (コレクション)
          </li>
          <li>
            <b>スコアを同時に見せる</b> → Bar overlay / Tier blocks / With meta
          </li>
          <li>
            <b>プロセス・順路</b> → Subway line (各ステップを縦に繋ぐ)
          </li>
          <li>
            番号は <code className="bg-blue-100 px-1 rounded">tabular-nums</code>
            で桁揃え。10件以上なら 2桁ぶん幅を確保
          </li>
        </ul>
      </section>
    </div>
  )
}
