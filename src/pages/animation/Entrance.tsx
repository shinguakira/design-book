function Cell({
  label,
  code,
  anim,
}: { label: string; code: string; anim: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-baseline justify-between">
        <div className="text-sm font-medium">{label}</div>
        <code className="text-xs text-zinc-500 font-mono">{code}</code>
      </div>
      <div className="h-32 flex items-center justify-center overflow-hidden">
        <div
          className={`w-44 h-16 rounded-md bg-zinc-900 text-white text-sm flex items-center justify-center ${anim}`}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

const STAGGER_ITEMS = [
  '寿司',
  'ピザ',
  'ハンバーガー',
  'ラーメン',
  'サラダ',
]

export default function Entrance() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        要素が画面に現れる時のアニメーション。自動で繰り返し再生されます。
        本物のUIでは「出現 → 静止」の1回だけで、戻る動きはありません。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Cell label="Fade in" code="animate-demo-fade" anim="animate-demo-fade" />
        <Cell label="Scale in" code="animate-demo-scale" anim="animate-demo-scale" />
        <Cell label="From bottom" code="animate-demo-up" anim="animate-demo-up" />
        <Cell label="From top" code="animate-demo-down" anim="animate-demo-down" />
        <Cell label="From left" code="animate-demo-left" anim="animate-demo-left" />
        <Cell label="From right" code="animate-demo-right" anim="animate-demo-right" />
      </div>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Stagger (子要素を順番に)
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 overflow-hidden">
          <div className="space-y-2">
            {STAGGER_ITEMS.map((label, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-md border border-zinc-200 bg-white animate-demo-left"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="text-xs text-zinc-500 mt-3">
            <code className="font-mono">animationDelay</code> を 120ms ずつずらすだけ。
            リスト・カードの初回表示で使う定番。
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">本番で使う時のコツ</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>このページのデモは比較のために大きく・繰り返しているが、
            本番は <b>60〜120px の動き + 250〜400ms</b> で1回だけ</li>
          <li>初回マウントのみ。再表示のたびに animate-fade-in を付けると
            ユーザーに「何かが新しい」と誤認させる</li>
          <li>prefers-reduced-motion を尊重 (本プロジェクトは index.css で対応済)</li>
        </ul>
      </section>
    </div>
  )
}
