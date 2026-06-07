import { ChevronRight, Plus, Bell } from 'lucide-react'

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
      <div className="p-6 bg-zinc-100">{children}</div>
    </div>
  )
}

export default function DesignSystems() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        現代の主要 OS / 企業デザインシステムを並べて比較。「同じ機能を同じカードに乗せる」とき、
        それぞれどう違うかを見る。Apple HIG / Fluent (Microsoft) / Material You (Google) /
        Carbon (IBM) の4種を例で。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Frame label="Apple HIG (iOS / macOS)" note="角丸大・ガラス・薄影・SF Pro">
          <div
            className="max-w-sm mx-auto rounded-2xl p-4 bg-white"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
              fontFamily: '-apple-system, "SF Pro Text", sans-serif',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">新着通知</div>
                <div className="text-[11px] text-zinc-500">5 分前</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
            <button
              className="mt-3 w-full py-2 text-sm font-medium rounded-xl bg-blue-500 text-white"
              style={{ fontFamily: 'inherit' }}
            >
              すべて表示
            </button>
          </div>
        </Frame>

        <Frame label="Fluent (Microsoft / Win11)" note="Acrylic blur・直角寄り・Segoe">
          <div
            className="max-w-sm mx-auto rounded-md p-4 backdrop-blur"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(245,245,250,0.78))',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow:
                '0 8px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
              fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center text-white"
                style={{ background: '#0078d4' }}
              >
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">新着通知</div>
                <div className="text-[11px] text-zinc-500">5 分前</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
            <button
              className="mt-3 w-full py-2 text-sm font-medium rounded-md text-white"
              style={{
                background: '#0078d4',
                boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.2)',
              }}
            >
              すべて表示
            </button>
          </div>
        </Frame>

        <Frame label="Material You (Google M3)" note="動的カラー・丸ボタン・Roboto Flex">
          <div
            className="max-w-sm mx-auto rounded-3xl p-4"
            style={{
              background: '#ece6f0',
              fontFamily: '"Roboto Flex", Roboto, sans-serif',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: '#6750a4' }}
              >
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#1d1b20]">
                  新着通知
                </div>
                <div className="text-[11px] text-[#49454f]">5 分前</div>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#49454f' }} />
            </div>
            <button
              className="mt-3 w-full py-2.5 text-sm font-medium rounded-full text-white"
              style={{ background: '#6750a4' }}
            >
              すべて表示
            </button>
          </div>
        </Frame>

        <Frame label="Carbon (IBM)" note="エンタープライズ・厳格グリッド・Plex">
          <div
            className="max-w-sm mx-auto p-4"
            style={{
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              fontFamily: '"IBM Plex Sans", sans-serif',
            }}
          >
            <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
              <div
                className="w-9 h-9 flex items-center justify-center text-white"
                style={{ background: '#0f62fe' }}
              >
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#161616]">
                  新着通知
                </div>
                <div className="text-[11px] text-[#525252]">5 分前</div>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#525252' }} />
            </div>
            <button
              className="mt-3 w-full py-2 text-sm font-medium text-white"
              style={{ background: '#0f62fe' }}
            >
              すべて表示
            </button>
          </div>
        </Frame>
      </div>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          FAB (新規作成ボタン) 比較
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-8 flex items-center justify-around gap-6">
          <div className="text-center">
            <button
              className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.4)',
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
            <div className="text-[10px] text-zinc-500 mt-2">Apple</div>
          </div>
          <div className="text-center">
            <button
              className="w-14 h-14 rounded-md flex items-center justify-center text-white"
              style={{
                background: '#0078d4',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 -2px 0 rgba(0,0,0,0.2)',
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
            <div className="text-[10px] text-zinc-500 mt-2">Fluent</div>
          </div>
          <div className="text-center">
            <button
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
              style={{
                background: '#6750a4',
                boxShadow: '0 6px 16px rgba(103, 80, 164, 0.4)',
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
            <div className="text-[10px] text-zinc-500 mt-2">Material You</div>
          </div>
          <div className="text-center">
            <button
              className="w-14 h-14 flex items-center justify-center text-white"
              style={{ background: '#0f62fe' }}
            >
              <Plus className="w-6 h-6" />
            </button>
            <div className="text-[10px] text-zinc-500 mt-2">Carbon</div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">設計思想の差</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Apple HIG</b> — 角丸大・薄影・iOS は半透明レイヤー。コンテンツ第一。
          </li>
          <li>
            <b>Fluent</b> — Acrylic blur で奥行き。ボタンは直角寄り、薄い inset shadow。
          </li>
          <li>
            <b>Material You</b> — ボタンは完全な丸 (pill)。動的カラーで端末ごとに見た目が変わる。
          </li>
          <li>
            <b>Carbon</b> — 角張った直角・厳格なグリッド。装飾を削いだエンタープライズ向け。
          </li>
          <li>
            一見似ているが、FAB / カード / ボタン などに明確な「指紋」がある。
          </li>
        </ul>
      </section>
    </div>
  )
}
