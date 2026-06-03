export default function SixtyThirtyTen() {
  return (
    <div className="max-w-4xl space-y-6">
      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>
          画面を 3色で構成するときの黄金比のルール。
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>
            <b>60%</b> — メインカラー (背景・大きい面積)。落ち着いた色を選ぶ。
          </li>
          <li>
            <b>30%</b> — サブカラー (セクション・カード・差し色になる中面積)。メインを補完。
          </li>
          <li>
            <b>10%</b> — アクセントカラー (CTA・通知・強調)。最も彩度の高い色をここだけに集中させる。
          </li>
        </ul>
        <p className="text-zinc-600">
          逆にすると (アクセントを60%) 目が疲れる UI になる。
        </p>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          サンプル: 60 (zinc-50) / 30 (white) / 10 (blue-600)
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-zinc-200">
              <div className="text-xs text-zinc-500">今月の売上</div>
              <div className="text-2xl font-semibold mt-1">¥1,240,000</div>
              <div className="text-xs text-emerald-600 mt-1">前月比 +12%</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-zinc-200">
              <div className="text-xs text-zinc-500">アクティブユーザー</div>
              <div className="text-2xl font-semibold mt-1">3,421</div>
              <div className="text-xs text-emerald-600 mt-1">前月比 +5%</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-zinc-200">
              <div className="text-xs text-zinc-500">解約率</div>
              <div className="text-2xl font-semibold mt-1">1.8%</div>
              <div className="text-xs text-rose-600 mt-1">前月比 +0.3%</div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-600 text-white text-sm font-medium px-5 h-10 rounded-md hover:bg-blue-500">
              レポートを書き出す
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          色の割合の見え方
        </div>
        <div className="flex h-10 rounded-md overflow-hidden border border-zinc-200">
          <div className="bg-zinc-50 flex items-center justify-center text-xs text-zinc-600" style={{ width: '60%' }}>
            60% メイン
          </div>
          <div className="bg-white flex items-center justify-center text-xs text-zinc-600 border-l border-zinc-200" style={{ width: '30%' }}>
            30% サブ
          </div>
          <div className="bg-blue-600 flex items-center justify-center text-xs text-white" style={{ width: '10%' }}>
            10%
          </div>
        </div>
      </section>
    </div>
  )
}
