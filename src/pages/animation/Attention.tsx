import { ArrowDown, Bell, Heart } from 'lucide-react'

export default function Attention() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        ユーザーに「ここ見て」と知らせる動き。デモは自動でループしますが、
        本番では「エラー発生時」「初回ロード時」など必要なトリガー時のみ発火させる。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Shake (入力エラー)</div>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="you@example.com"
              defaultValue="wrong"
              className="block w-full rounded-md border border-red-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 animate-demo-shake"
            />
            <div className="text-xs text-red-600">
              ※ デモのため定期的に揺れます (本番は Submit 時のみ)
            </div>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-shake</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Heartbeat (Like)</div>
          <div className="flex items-center gap-3">
            <button className="animate-heartbeat">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </button>
            <div className="text-sm text-zinc-600">123 likes</div>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-heartbeat</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Wiggle (通知)</div>
          <div className="flex items-center gap-3">
            <Bell className="w-7 h-7 text-amber-500 fill-amber-400 animate-wiggle origin-top" />
            <span className="inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-red-500 text-white text-xs font-medium px-1.5">
              3
            </span>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-wiggle</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Glow (CTA強調)</div>
          <button className="px-5 h-10 rounded-md bg-blue-600 text-white text-sm font-medium animate-glow">
            限定オファーを見る
          </button>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-glow</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Ping (通知ドット)</div>
          <div className="flex items-center gap-3">
            <span className="relative inline-flex">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="text-sm text-zinc-700">新着メッセージ</span>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-ping</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Bounce (スクロールヒント)</div>
          <div className="flex flex-col items-center gap-1 text-zinc-500">
            <div className="text-xs">続きを見る</div>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-bounce</div>
        </div>
      </div>
    </div>
  )
}
