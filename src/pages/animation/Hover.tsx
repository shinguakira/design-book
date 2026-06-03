export default function Hover() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        マウスホバー時の細かな反応。クリック可能・操作可能であることを示す。トランジションは 150〜250ms が定番。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            hover:-translate-y-1 + hover:shadow-lg
          </div>
          <div className="flex items-center justify-center h-32">
            <div className="w-40 h-24 rounded-lg bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-zinc-300">
              Lift
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">hover:scale-105</div>
          <div className="flex items-center justify-center h-32">
            <div className="w-40 h-24 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-sm font-medium transition-transform duration-200 hover:scale-105">
              Scale
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">hover:rotate-3</div>
          <div className="flex items-center justify-center h-32">
            <div className="w-40 h-24 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center text-sm font-medium transition-transform duration-200 hover:rotate-3 hover:scale-105">
              Tilt
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            underline grow (after:scale-x-0)
          </div>
          <div className="flex items-center justify-center h-32">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="relative inline-block text-zinc-900 text-base font-medium after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-zinc-900 after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              詳しく見る
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">group-hover で内部要素</div>
          <div className="flex items-center justify-center h-32">
            <div className="group cursor-pointer flex items-center gap-2 px-4 h-10 rounded-md bg-zinc-900 text-white text-sm font-medium transition-colors hover:bg-zinc-800">
              次へ
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            gradient shift (bg-position)
          </div>
          <div className="flex items-center justify-center h-32">
            <button
              className="px-5 h-10 rounded-md text-white text-sm font-medium transition-[background-position] duration-500 hover:bg-right"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #3b82f6 100%)',
                backgroundSize: '200% 100%',
              }}
            >
              Gradient Shift
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">image zoom (overflow-hidden)</div>
          <div className="flex items-center justify-center h-32">
            <div className="w-40 h-24 rounded-lg overflow-hidden cursor-pointer">
              <div
                className="w-full h-full transition-transform duration-300 hover:scale-110 flex items-center justify-center text-white font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)',
                }}
              >
                IMAGE
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">border highlight</div>
          <div className="flex items-center justify-center h-32">
            <div className="w-40 h-24 rounded-lg bg-white border-2 border-zinc-200 flex items-center justify-center text-sm font-medium transition-colors duration-200 hover:border-blue-500 hover:text-blue-600 cursor-pointer">
              Highlight
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            reveal action (group-hover:opacity-100)
          </div>
          <div className="flex items-center justify-center h-32">
            <div className="group flex items-center gap-3 px-4 py-3 rounded-md bg-white border border-zinc-200 w-56 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-zinc-200" />
              <div className="flex-1 text-sm">タスク</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">
                ✕
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
