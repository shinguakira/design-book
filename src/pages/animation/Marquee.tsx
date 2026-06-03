import { Zap, Gem, Flame, Rocket, Sparkles, Target, Palette, Globe } from 'lucide-react'

const LOGOS = [Palette, Zap, Gem, Flame, Rocket, Sparkles, Globe, Target]

export default function Marquee() {
  const ITEMS = ['React', 'Vite', 'Tailwind', 'TypeScript', 'GraphQL', 'Rails', 'Postgres', 'Redis']

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        画面を横切り続けるテキスト/ロゴ列。ロゴクラウド・ティッカー・パートナー一覧などに。
      </p>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          基本 (テキスト)
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-4">
              {[...ITEMS, ...ITEMS].map((t, i) => (
                <span
                  key={i}
                  className="mx-8 text-sm font-semibold text-zinc-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          ロゴクラウド (両端フェード付き)
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)',
            }}
          >
            <div className="flex animate-marquee py-6">
              {[...LOGOS, ...LOGOS].map((LogoIcon, i) => (
                <span key={i} className="mx-10 shrink-0 text-zinc-600">
                  <LogoIcon className="w-9 h-9" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 mt-2 font-mono">
          mask-image で両端をフェードアウト → ループの継ぎ目が消える
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          ティッカー (ニュース・通知)
        </div>
        <div className="rounded-lg bg-zinc-900 text-white overflow-hidden">
          <div className="flex items-center">
            <div className="px-4 py-2.5 bg-red-600 text-xs font-bold shrink-0">
              LIVE
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex animate-marquee whitespace-nowrap py-2.5">
                <span className="mx-8 text-sm">
                  • Brighty Pro が来週リリース予定
                </span>
                <span className="mx-8 text-sm">
                  • 新機能「ダークモード」を追加しました
                </span>
                <span className="mx-8 text-sm">
                  • 12月末まで年額プラン20%OFFキャンペーン
                </span>
                <span className="mx-8 text-sm">
                  • Brighty Pro が来週リリース予定
                </span>
                <span className="mx-8 text-sm">
                  • 新機能「ダークモード」を追加しました
                </span>
                <span className="mx-8 text-sm">
                  • 12月末まで年額プラン20%OFFキャンペーン
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="font-semibold mb-2">注意点</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>本文を流さない (読めない)。装飾・ロゴ・短文のみ</li>
          <li>prefers-reduced-motion ユーザーには止める (本プロジェクトは自動対応)</li>
          <li>WCAG 2.2.2 — 5秒以上動く要素には停止手段を用意</li>
        </ul>
      </section>
    </div>
  )
}
