import { useState } from 'react'
import {
  Plus,
  Mic,
  ArrowUp,
  Globe,
  Wrench,
  Image as ImageIcon,
  FileText,
  Camera,
  Folder,
  Sparkles,
  X,
} from 'lucide-react'

export default function InputRich() {
  const [text, setText] = useState('')
  const [attachOpen, setAttachOpen] = useState(false)
  const empty = text.trim().length === 0

  return (
    <div className="max-w-5xl space-y-8">
      <p className="text-sm text-zinc-700 leading-relaxed">
        ChatGPT / Claude / Gemini 系のリッチ入力。複数行テキスト + 添付ボタン + 音声入力 + ツール切替 + 送信。空のときは送信ボタン無効。
      </p>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          ChatGPT スタイル (角丸大・グレー縁)
        </div>
        <div className="rounded-3xl border border-zinc-300 bg-white shadow-sm">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="ChatGPT にメッセージを送る..."
            className="w-full resize-none px-4 py-3 outline-none text-sm rounded-3xl"
          />
          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setAttachOpen((o) => !o)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  attachOpen
                    ? 'bg-zinc-900 text-white'
                    : 'hover:bg-zinc-100 text-zinc-600'
                }`}
              >
                <Plus
                  className={`w-4 h-4 transition-transform ${attachOpen ? 'rotate-45' : ''}`}
                />
              </button>
              <button className="h-8 px-3 rounded-full hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Web 検索
              </button>
              <button className="h-8 px-3 rounded-full hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                ツール
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Mic className="w-4 h-4" />
              </button>
              <button
                disabled={empty}
                className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center disabled:bg-zinc-300"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {attachOpen && (
            <div className="border-t border-zinc-200 px-2 py-2 grid grid-cols-4 gap-1 animate-slide-in-up">
              {[
                { Icon: Camera, label: 'カメラ' },
                { Icon: ImageIcon, label: '写真' },
                { Icon: FileText, label: 'ファイル' },
                { Icon: Folder, label: 'クラウド' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 px-2 py-3 rounded-lg hover:bg-zinc-100"
                >
                  <Icon className="w-5 h-5 text-zinc-700" />
                  <span className="text-xs text-zinc-600">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Claude スタイル (添付チップ付き)
        </div>
        <div className="rounded-2xl border border-zinc-300 bg-white shadow-sm">
          <div className="px-4 pt-3 flex gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 border border-zinc-200 px-2 py-1 text-xs">
              <ImageIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-700">design-mock.png</span>
              <button className="text-zinc-400 hover:text-zinc-700">
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 border border-zinc-200 px-2 py-1 text-xs">
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-700">spec.pdf</span>
              <button className="text-zinc-400 hover:text-zinc-700">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <textarea
            rows={2}
            defaultValue="この資料を要約してください"
            className="w-full resize-none px-4 py-3 outline-none text-sm"
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Plus className="w-4 h-4" />
              </button>
              <button className="h-9 px-3 rounded-lg hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                スタイル
              </button>
            </div>
            <button className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-400">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Gemini スタイル (大きく中央、グラデ縁)
        </div>
        <div
          className="rounded-full border-2 p-px"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
            borderColor: 'transparent',
          }}
        >
          <div className="rounded-full bg-white flex items-center gap-2 pl-5 pr-2 py-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <input
              placeholder="Geminiに聞いてみる..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
              <Mic className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">設計時のポイント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>送信ボタンは空のとき必ず無効化 (誤送信防止)</li>
          <li>Enter で送信 / Shift+Enter で改行 が定番。モバイルは常に改行</li>
          <li>テキストエリアは行数に応じて自動拡張 (max 8〜10行で打ち止め + スクロール)</li>
          <li>添付ファイルはチップで表示し、× で個別削除可能に</li>
          <li>送信中はボタンを「停止」アイコンに変えてキャンセル可能に</li>
        </ul>
      </section>
    </div>
  )
}
