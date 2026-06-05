import { useState } from 'react'
import { ChevronDown, ChevronUp, GripVertical, Trophy } from 'lucide-react'

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

const MEDAL_BG: Record<number, string> = {
  1: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-900 shadow-amber-200',
  2: 'bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-700 shadow-zinc-200',
  3: 'bg-gradient-to-br from-orange-300 to-amber-700 text-orange-50 shadow-orange-200',
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
        順序の見せ方・密度・装飾の強さで雰囲気を変える9パターン。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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

        <Frame label="Boxed numbers" note="角張った印象。論文の参考文献など">
          <ul className="space-y-1">
            {FOODS.map((f, i) => (
              <li
                key={f.name}
                className="flex items-center gap-3 text-sm"
              >
                <div className="w-7 h-7 border border-zinc-300 rounded text-xs font-mono font-semibold flex items-center justify-center text-zinc-600 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>{f.name}</div>
              </li>
            ))}
          </ul>
        </Frame>

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

        <Frame
          label="Striped (zebra)"
          note="密度高め・データ表示風"
        >
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

        <Frame label="Reorderable" note="hover で並べ替えボタン (▲▼)">
          <Reorderable />
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>視線誘導が必要</b> (ランキングなど) →
            番号を強く (Medal / Big faded / Pill)
          </li>
          <li>
            <b>情報を素早く読ませたい</b> (目次・スペック) →
            番号は控えめに (Plain serif / Boxed / Striped)
          </li>
          <li>
            <b>触らせる</b> (To-do / 並べ替え) → Circle + Reorderable
          </li>
          <li>
            番号は <code className="bg-blue-100 px-1 rounded">tabular-nums</code>
            で桁揃え。10件以上が想定なら 2桁ぶん幅を確保
          </li>
        </ul>
      </section>
    </div>
  )
}
