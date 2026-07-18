function Demo({
  label,
  code,
  children,
}: {
  label: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-baseline justify-between">
        <div className="text-sm font-medium">{label}</div>
        <code className="text-xs text-zinc-500 font-mono">{code}</code>
      </div>
      <div className="p-6 min-h-28 flex items-center justify-center">{children}</div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        待ち時間を埋めるインジケータ。1秒以内 → 無くてもよい、1〜10秒 → スピナー、10秒以上 →
        進捗バー が目安。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Demo label="Spinner" code="animate-spin">
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
            読み込み中...
          </div>
        </Demo>

        <Demo label="3-Dot loading" code="animate-loading-dot">
          <div className="flex gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-loading-dot"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-loading-dot"
              style={{ animationDelay: "0.15s" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-loading-dot"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </Demo>

        <Demo label="Skeleton shimmer" code="animate-shimmer">
          <div className="w-full max-w-xs space-y-2">
            {[80, 60, 90].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded animate-shimmer"
                style={{
                  width: `${w}%`,
                  backgroundImage: "linear-gradient(90deg, #e4e4e7 0%, #f4f4f5 50%, #e4e4e7 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            ))}
          </div>
        </Demo>

        <Demo label="Indeterminate progress" code="animate-indeterminate">
          <div className="w-full max-w-xs h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-zinc-900 rounded-full animate-indeterminate" />
          </div>
        </Demo>

        <Demo label="Pulsing dot" code="animate-pulse">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>接続中...</span>
          </div>
        </Demo>

        <Demo label="Skeleton card" code="animate-pulse">
          <div className="w-full max-w-xs flex gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/2 bg-zinc-200 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-zinc-200 rounded animate-pulse" />
            </div>
          </div>
        </Demo>
      </div>
    </div>
  );
}
