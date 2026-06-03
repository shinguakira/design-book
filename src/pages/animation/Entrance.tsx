import { useState } from 'react'

export default function Entrance() {
  const [key, setKey] = useState(0)
  const replay = () => setKey((k) => k + 1)

  const Box = ({ className, label }: { className: string; label: string }) => (
    <div
      key={key}
      className={`w-full h-20 rounded-md bg-zinc-900 text-white text-sm flex items-center justify-center ${className}`}
    >
      {label}
    </div>
  )

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-zinc-700">
          要素が画面に現れる時のアニメーション。短く (300〜500ms)、控えめなイージング (ease-out 系) が基本。
        </p>
        <button
          onClick={replay}
          className="shrink-0 px-3 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
        >
          ↻ もう一度
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-fade-in</div>
          <Box className="animate-fade-in" label="Fade in" />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-scale-in</div>
          <Box className="animate-scale-in" label="Scale in" />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-slide-in-up</div>
          <Box className="animate-slide-in-up" label="From bottom" />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-slide-in-down</div>
          <Box className="animate-slide-in-down" label="From top" />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-slide-in-left</div>
          <Box className="animate-slide-in-left" label="From left" />
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 space-y-2">
          <div className="text-xs text-zinc-500 font-mono">animate-slide-in-right</div>
          <Box className="animate-slide-in-right" label="From right" />
        </div>
      </div>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Stagger (子要素を順番に)
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="space-y-2">
            {['寿司', 'ピザ', 'ハンバーガー', 'ラーメン', 'サラダ'].map(
              (label, i) => (
                <div
                  key={`${key}-${i}`}
                  className="px-4 py-2 rounded-md border border-zinc-200 bg-white animate-slide-in-left"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
          <div className="text-xs text-zinc-500 mt-3">
            <code className="font-mono">animationDelay</code> を 80ms ずつずらすだけ。リスト・カードの初回表示で使う定番。
          </div>
        </div>
      </section>
    </div>
  )
}
