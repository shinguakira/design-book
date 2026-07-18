import {
  ChevronLeft,
  Video,
  Phone,
  Plus,
  Mic,
  Smile,
  Image as ImageIcon,
  Wifi,
  BatteryFull,
  Signal,
  CheckCheck,
} from "lucide-react";

function Phone3D({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[360px] rounded-[2.5rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden">
      <div className="bg-white">
        <div className="flex items-center justify-between px-6 py-1.5 text-xs font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryFull className="w-4 h-4" />
          </div>
        </div>
        {children}
        <div className="flex justify-center py-2 bg-white">
          <div className="w-32 h-1 bg-zinc-900 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function MobileChat() {
  return (
    <div className="max-w-5xl space-y-8">
      <p className="text-sm text-zinc-700 leading-relaxed">
        スマホ向けチャット画面のレイアウト。ヘッダー固定、入力欄ボトム固定、間にメッセージリストがスクロール。タップ領域は最低
        44 × 44px を確保。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            ライト
          </div>
          <Phone3D>
            <header className="px-3 py-2.5 flex items-center gap-3 border-b border-zinc-200">
              <button className="text-zinc-700">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm leading-tight">佐藤 花子</div>
                <div className="text-[11px] text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  オンライン
                </div>
              </div>
              <button className="text-zinc-700">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-zinc-700">
                <Video className="w-5 h-5" />
              </button>
            </header>

            <div className="px-3 py-4 space-y-2 bg-zinc-50 h-[460px] overflow-y-auto">
              <div className="text-center text-[11px] text-zinc-400">今日 11:23</div>
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-md px-3 py-2 text-sm max-w-[75%]">
                  明日のレビュー、14時で大丈夫?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2 text-sm max-w-[75%]">
                  OK、Zoomリンク送るね
                </div>
              </div>
              <div className="flex justify-end items-center gap-1 text-[10px] text-zinc-400 pr-1">
                既読 11:25
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-md px-3 py-2 text-sm max-w-[75%]">
                  ありがとう!助かる
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2 text-sm max-w-[75%]">
                  資料も貼っておきました
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-md p-1 max-w-[75%]">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl h-32 w-44" />
                  <div className="px-2 py-1 text-xs">design-mock.png</div>
                </div>
              </div>
            </div>

            <footer className="border-t border-zinc-200 px-2 py-2 flex items-center gap-1.5 bg-white">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-600">
                <Plus className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-600">
                <ImageIcon className="w-5 h-5" />
              </button>
              <div className="flex-1 flex items-center bg-zinc-100 rounded-full px-3 py-1.5">
                <input
                  placeholder="メッセージ"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button className="text-zinc-500">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </button>
            </footer>
          </Phone3D>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            ダーク
          </div>
          <Phone3D>
            <header className="bg-zinc-900 text-white px-3 py-2.5 flex items-center gap-3 border-b border-zinc-800">
              <button className="text-zinc-300">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm leading-tight">チーム #design</div>
                <div className="text-[11px] text-zinc-400">12 メンバー</div>
              </div>
              <button className="text-zinc-300">
                <Phone className="w-5 h-5" />
              </button>
            </header>

            <div className="px-3 py-4 space-y-3 bg-zinc-950 h-[460px] overflow-y-auto">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-500 shrink-0 flex items-center justify-center text-xs font-semibold text-white">
                  YT
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-zinc-400 mb-0.5">山田 太郎 · 11:23</div>
                  <div className="bg-zinc-800 text-zinc-100 rounded-lg rounded-tl-none px-3 py-2 text-sm">
                    こんにちは、レビューよろしくお願いします
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[75%]">
                  <div className="bg-blue-600 text-white rounded-lg rounded-tr-none px-3 py-2 text-sm">
                    確認しました。少しお待ちください
                  </div>
                  <div className="text-[10px] text-zinc-500 text-right mt-0.5">11:25</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0 flex items-center justify-center text-xs font-semibold text-white">
                  HS
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-zinc-400 mb-0.5">佐藤 花子 · 11:30</div>
                  <div className="bg-zinc-800 text-zinc-100 rounded-lg rounded-tl-none px-3 py-2 text-sm">
                    フォントのウェイト、もう少し細くしたほうが読みやすいかも
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 px-1">
                <div className="flex gap-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-loading-dot"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-loading-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-loading-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
                山田 太郎 が入力中...
              </div>
            </div>

            <footer className="bg-zinc-900 border-t border-zinc-800 px-2 py-2 flex items-center gap-1.5">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300">
                <Plus className="w-5 h-5" />
              </button>
              <div className="flex-1 flex items-center bg-zinc-800 rounded-full px-3 py-1.5">
                <input
                  placeholder="メッセージ"
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
                />
              </div>
              <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </button>
            </footer>
          </Phone3D>
        </div>
      </div>
    </div>
  );
}
