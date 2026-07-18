import type { ReactNode } from "react";
import { ArrowDown, Bell, Heart } from "lucide-react";

function Demo({
  label,
  code,
  note,
  children,
}: {
  label: string;
  code: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-baseline justify-between">
        <div className="text-sm font-medium">{label}</div>
        <code className="text-xs text-zinc-500 font-mono">{code}</code>
      </div>
      <div className="p-6 min-h-28 flex items-center justify-center">{children}</div>
      {note && (
        <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-600">
          {note}
        </div>
      )}
    </div>
  );
}

export default function Loops() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        無限に繰り返す基本ループ。ユーザーの注意を引きすぎないよう、画面の主役より控えめに使う。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Demo label="Pulse" code="animate-pulse" note="スケルトン・読み込み中の薄い点滅に。">
          <div className="w-32 h-8 rounded bg-zinc-300 animate-pulse" />
        </Demo>
        <Demo label="Spin" code="animate-spin" note="スピナー・更新ボタンに。">
          <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
        </Demo>
        <Demo
          label="Bounce"
          code="animate-bounce"
          note="スクロールヒント・新着通知の小アイコンに。"
        >
          <ArrowDown className="w-7 h-7 text-zinc-700 animate-bounce" />
        </Demo>
        <Demo label="Ping" code="animate-ping" note="通知バッジの「波紋」効果。">
          <span className="relative inline-flex">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
        </Demo>
        <Demo label="Wiggle" code="animate-wiggle" note="アイコンに注意を引く時。">
          <Bell className="w-7 h-7 text-amber-500 fill-amber-400 animate-wiggle origin-top" />
        </Demo>
        <Demo label="Heartbeat" code="animate-heartbeat" note="いいねボタン・心拍系UIに。">
          <Heart className="w-7 h-7 text-red-500 fill-red-500 animate-heartbeat" />
        </Demo>
        <Demo label="Float" code="animate-float" note="ゆったり上下に漂う。ヒーロー要素に。">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 animate-float" />
        </Demo>
        <Demo label="Glow" code="animate-glow" note="CTAをほんのり強調。">
          <button className="px-4 h-10 rounded-md bg-blue-600 text-white text-sm font-medium animate-glow">
            今すぐ始める
          </button>
        </Demo>
      </div>
    </div>
  );
}
