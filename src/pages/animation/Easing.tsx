import { useState } from 'react'

const EASINGS = [
  { name: 'linear', label: 'Linear', note: '一定速度。機械的・無機質。' },
  { name: 'ease-in', label: 'Ease In', note: 'ゆっくり始まり加速。消える時に使う。' },
  { name: 'ease-out', label: 'Ease Out', note: '速く始まり減速。現れる時の定番。' },
  { name: 'ease-in-out', label: 'Ease In Out', note: '両端で減速。最も自然で多用される。' },
  { name: 'cubic-bezier(.34,1.56,.64,1)', label: 'Spring (overshoot)', note: 'ちょっと行き過ぎて戻る。遊び心。' },
  { name: 'cubic-bezier(.68,-.55,.27,1.55)', label: 'Bounce-ish', note: '勢いがあって弾む。' },
]

export default function Easing() {
  const [run, setRun] = useState(0)

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-zinc-700">
          同じ距離・同じ時間でも、イージング曲線でまったく別の印象になる。「ease-out + 200ms」が一番ハズさない安全牌。
        </p>
        <button
          onClick={() => setRun((r) => r + 1)}
          className="shrink-0 px-3 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
        >
          ↻ 再生
        </button>
      </div>

      <div className="space-y-3">
        {EASINGS.map((e) => (
          <div
            key={e.name}
            className="rounded-lg border border-zinc-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-baseline justify-between">
              <div>
                <div className="text-sm font-medium">{e.label}</div>
                <code className="text-xs text-zinc-500 font-mono">{e.name}</code>
              </div>
              <div className="text-xs text-zinc-500">{e.note}</div>
            </div>
            <div className="p-4 relative h-16">
              <div className="absolute inset-y-0 left-4 right-4 flex items-center">
                <div className="w-full h-px bg-zinc-200" />
              </div>
              <div
                key={`${e.name}-${run}`}
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900"
                style={{
                  animation: `easing-demo 1.2s ${e.name} both`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes easing-demo {
          from { left: 1rem; }
          to { left: calc(100% - 3.5rem); }
        }
      `}</style>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="font-semibold mb-2">使い分けの目安</div>
        <ul className="list-disc pl-5 space-y-1">
          <li><b>現れる・入る</b> → ease-out (速く来てふわり止まる)</li>
          <li><b>消える・出る</b> → ease-in (留まってから去る)</li>
          <li><b>移動・状態変化</b> → ease-in-out (両端を整える)</li>
          <li><b>遊び・性格を出したい</b> → spring/overshoot (やりすぎ注意)</li>
          <li><b>長さ</b> — 小さい要素 150ms、中サイズ 200〜300ms、大きい/画面遷移 400〜600ms</li>
        </ul>
      </section>
    </div>
  )
}
