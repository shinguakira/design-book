import { useState } from 'react'
import {
  Plus,
  Mic,
  Smile,
  Send,
  Camera,
  Image as ImageIcon,
  FileText,
  MapPin,
  Sticker,
  CircleUserRound,
  Square,
} from 'lucide-react'

function Phone({
  children,
  hint,
}: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-2">
      <div className="mx-auto w-[320px] rounded-[2rem] border-[8px] border-zinc-900 bg-white shadow-xl overflow-hidden">
        <div className="bg-zinc-50 h-[420px] flex flex-col justify-end">
          {children}
        </div>
      </div>
      {hint && (
        <div className="text-xs text-zinc-500 text-center">{hint}</div>
      )}
    </div>
  )
}

export default function InputMobile() {
  const [text, setText] = useState('')
  const [voiceMode, setVoiceMode] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        スマホのチャット入力。下端固定 (sticky bottom)、片手操作前提でボタンの位置・サイズを最適化。タップ領域 44px 以上、誤タップ防止のスペーシングを意識。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Phone hint="基本: + / 入力 / 顔 / 音声切替">
          <div className="flex-1 p-3 text-xs text-zinc-400 text-center flex items-center justify-center">
            (メッセージ表示エリア)
          </div>
          <div className="border-t border-zinc-200 bg-white px-2 py-2 flex items-end gap-1.5">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600">
              <Plus className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-end bg-zinc-100 rounded-3xl px-3 py-2 max-h-32">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={1}
                placeholder="メッセージ"
                className="flex-1 bg-transparent outline-none text-sm resize-none"
              />
              <button className="text-zinc-500 ml-1">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            {text.trim() ? (
              <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </Phone>

        <Phone hint="+ タップで添付シートが下から">
          <div className="flex-1 p-3 text-xs text-zinc-400 text-center flex items-center justify-center">
            (メッセージ表示エリア)
          </div>
          <div className="border-t border-zinc-200 bg-white px-2 py-2 flex items-center gap-1.5">
            <button
              onClick={() => setSheetOpen((s) => !s)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                sheetOpen ? 'bg-blue-500 text-white rotate-45' : 'text-zinc-600'
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center bg-zinc-100 rounded-3xl px-3 py-2">
              <input
                placeholder="メッセージ"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          {sheetOpen && (
            <div className="border-t border-zinc-200 bg-white py-3 grid grid-cols-4 gap-1 animate-slide-in-up">
              {[
                { Icon: Camera, label: 'カメラ', color: 'bg-pink-500' },
                {
                  Icon: ImageIcon,
                  label: 'アルバム',
                  color: 'bg-violet-500',
                },
                { Icon: FileText, label: 'ファイル', color: 'bg-blue-500' },
                { Icon: MapPin, label: '位置情報', color: 'bg-emerald-500' },
                { Icon: Sticker, label: 'スタンプ', color: 'bg-amber-500' },
                {
                  Icon: CircleUserRound,
                  label: '連絡先',
                  color: 'bg-cyan-500',
                },
              ].map(({ Icon, label, color }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1.5 py-2"
                >
                  <div
                    className={`w-11 h-11 rounded-full ${color} text-white flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] text-zinc-700">{label}</span>
                </button>
              ))}
            </div>
          )}
        </Phone>

        <Phone hint="マイク長押し → 録音モード (Telegram風)">
          <div className="flex-1 p-3 text-xs text-zinc-400 text-center flex items-center justify-center">
            (メッセージ表示エリア)
          </div>
          {!voiceMode ? (
            <div className="border-t border-zinc-200 bg-white px-2 py-2 flex items-center gap-1.5">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600">
                <Plus className="w-5 h-5" />
              </button>
              <div className="flex-1 flex items-center bg-zinc-100 rounded-3xl px-3 py-2">
                <input
                  placeholder="メッセージ"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <button
                onMouseDown={() => setVoiceMode(true)}
                onMouseUp={() => setVoiceMode(false)}
                onTouchStart={() => setVoiceMode(true)}
                onTouchEnd={() => setVoiceMode(false)}
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="border-t border-rose-200 bg-rose-50 px-3 py-3 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs font-mono tabular-nums">0:08</span>
                <div className="flex-1 flex items-center gap-0.5 h-6">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-rose-500 rounded-full animate-pulse"
                      style={{
                        height: `${30 + Math.sin(i) * 30 + Math.cos(i * 2) * 30}%`,
                        animationDelay: `${i * 60}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setVoiceMode(false)}
                className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center"
              >
                <Square className="w-4 h-4 fill-white" />
              </button>
            </div>
          )}
        </Phone>
      </div>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="font-semibold mb-2">モバイル特有のポイント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>送信 / 音声ボタンの切替は「入力テキストの有無」で行うのが定番 (LINE / WhatsApp)</li>
          <li>添付シートは下からスライドイン (iOS Action Sheet 風)</li>
          <li>キーボード表示中はメッセージリストを縮めて、最新が見えるよう自動スクロール</li>
          <li>音声入力は「押しっぱなしで録音 / 離して送信 / 上スワイプでキャンセル」が定石</li>
          <li>入力欄は安全領域 (safe area) を考慮して padding-bottom を確保</li>
        </ul>
      </section>
    </div>
  )
}
