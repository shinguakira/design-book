import { useState } from 'react'
import { Send, Smile, Paperclip, Image as ImageIcon } from 'lucide-react'

function Frame({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
        {label}
      </div>
      <div className="p-5 bg-zinc-50">{children}</div>
    </div>
  )
}

export default function InputBasic() {
  const [text, setText] = useState('')
  const empty = text.trim().length === 0

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        シンプルなメッセージ入力。チャットアプリの基本形。送信ボタンは空のとき無効化、入力時にカラーで強調。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="最小限 (input + 送信ボタン)">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              setText('')
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              type="submit"
              disabled={empty}
              className="px-4 h-10 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              送信
            </button>
          </form>
        </Frame>

        <Frame label="アイコンのみ (Slack風)">
          <form
            className="flex items-center gap-2 bg-white border border-zinc-300 rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-zinc-900"
            onSubmit={(e) => {
              e.preventDefault()
              setText('')
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="メッセージを送る"
              className="flex-1 bg-transparent outline-none text-sm py-1 px-2"
            />
            <button
              type="submit"
              disabled={empty}
              title="送信"
              className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </Frame>

        <Frame label="ツールバー付き (Slack / Discord)">
          <div className="bg-white border border-zinc-300 rounded-lg focus-within:ring-2 focus-within:ring-zinc-900">
            <textarea
              rows={2}
              placeholder="#general に送信"
              className="w-full resize-none outline-none px-3 py-2 text-sm rounded-t-lg"
            />
            <div className="flex items-center gap-1 px-2 py-1.5 border-t border-zinc-200">
              <button className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500">
                <Smile className="w-4 h-4" />
              </button>
              <span className="ml-2 text-xs text-zinc-400">
                Markdown 使えます
              </span>
              <div className="ml-auto">
                <button className="px-3 h-7 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500">
                  送信
                </button>
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="文字数カウンタ付き">
          <div className="bg-white border border-zinc-300 rounded-lg">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={140}
              placeholder="いまどうしてる?"
              className="w-full resize-none outline-none px-3 py-2 text-sm"
            />
            <div className="flex items-center justify-between px-3 py-1.5 border-t border-zinc-200">
              <span
                className={`text-xs ${
                  text.length > 130 ? 'text-rose-600' : 'text-zinc-400'
                }`}
              >
                {text.length} / 140
              </span>
              <button
                disabled={empty || text.length > 140}
                className="px-3 h-7 rounded-full bg-blue-500 text-white text-xs font-medium disabled:opacity-40"
              >
                投稿
              </button>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  )
}
