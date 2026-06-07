import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, Link, Code, Sparkles, Send } from 'lucide-react'

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
      <div className="p-5">{children}</div>
    </div>
  )
}

function AutoResize() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [val, setVal] = useState('行を増やすと自動で縦に伸びます')
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [val])
  return (
    <textarea
      ref={ref}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      rows={1}
      placeholder="自動でリサイズ"
      className="w-full max-w-md min-h-9 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 resize-none overflow-hidden"
    />
  )
}

function CharCounter() {
  const [val, setVal] = useState('')
  const max = 280
  const over = val.length > max
  return (
    <div className="max-w-md">
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={3}
        placeholder="ツイートを書く"
        className={`w-full rounded-md border-2 px-3 py-2 text-sm focus:outline-none ${
          over ? 'border-rose-500' : 'border-zinc-300 focus:border-zinc-900'
        }`}
      />
      <div className="flex justify-end mt-1.5">
        <span
          className={`text-xs tabular-nums ${
            over ? 'text-rose-600 font-semibold' : 'text-zinc-500'
          }`}
        >
          {val.length} / {max}
        </span>
      </div>
    </div>
  )
}

function WithToolbar() {
  return (
    <div className="max-w-md rounded-md border border-zinc-300 overflow-hidden focus-within:border-zinc-500">
      <div className="flex items-center gap-0.5 px-1 py-1 border-b border-zinc-200 bg-zinc-50">
        <button className="p-1.5 rounded hover:bg-zinc-200 text-zinc-700">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-zinc-200 text-zinc-700">
          <Italic className="w-4 h-4" />
        </button>
        <span className="mx-1 h-4 w-px bg-zinc-300" />
        <button className="p-1.5 rounded hover:bg-zinc-200 text-zinc-700">
          <List className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-zinc-200 text-zinc-700">
          <Link className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-zinc-200 text-zinc-700">
          <Code className="w-4 h-4" />
        </button>
      </div>
      <textarea
        rows={4}
        placeholder="ここに本文を書く..."
        className="w-full px-3 py-2 text-sm outline-none resize-none"
      />
    </div>
  )
}

function CodeEditor() {
  return (
    <pre className="rounded-md p-3 bg-zinc-900 text-zinc-100 text-xs font-mono overflow-auto max-w-md">
      <textarea
        rows={5}
        defaultValue={`function greet(name) {\n  return \`Hello, \${name}!\`\n}\n\nconsole.log(greet('world'))`}
        className="w-full bg-transparent text-zinc-100 outline-none resize-none font-mono leading-relaxed"
        spellCheck={false}
      />
    </pre>
  )
}

function AIPrompt() {
  return (
    <div className="max-w-md rounded-2xl border border-zinc-300 bg-white shadow-sm focus-within:border-zinc-500">
      <textarea
        rows={3}
        placeholder="Claude にメッセージを送る..."
        className="w-full px-4 py-3 text-sm outline-none resize-none rounded-2xl"
      />
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex gap-1">
          <button className="h-8 px-2.5 rounded-full hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            ツール
          </button>
        </div>
        <button className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function MentionField() {
  return (
    <div className="max-w-md">
      <div className="rounded-md border border-zinc-300 px-3 py-2 text-sm min-h-20 focus-within:border-zinc-500">
        Hey{' '}
        <span className="inline-block bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 text-xs font-medium">
          @taro
        </span>
        , can you review this PR? thanks!
      </div>
      <div className="text-xs text-zinc-500 mt-1">
        @ でユーザー名、# でチャンネルを引用
      </div>
    </div>
  )
}

function MarkdownPreview() {
  const [val, setVal] = useState(
    '# はじめに\n\nこれは **Markdown** で書かれた*文章*です。\n\n- リスト1\n- リスト2',
  )
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={6}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-mono outline-none focus:border-zinc-500 resize-none"
      />
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm overflow-auto">
        <div
          dangerouslySetInnerHTML={{
            __html: val
              .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold">$1</h1>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/^- (.+)$/gm, '<li>$1</li>')
              .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc pl-5">$1</ul>')
              .replace(/\n\n/g, '</p><p class="my-2">')
              .replace(/^(.+)$/, '<p>$1</p>'),
          }}
        />
      </div>
    </div>
  )
}

export default function TextareaShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Basic" note="ラベル + プレースホルダ">
        <div className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              フィードバック
            </label>
            <textarea
              rows={4}
              placeholder="ご意見をお聞かせください"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-y"
            />
          </div>
        </div>
      </Frame>

      <Frame label="2. Auto-resize" note="行を打つと自動で縦に伸びる">
        <AutoResize />
      </Frame>

      <Frame label="3. Character count" note="残文字数の可視化 + 上限超過">
        <CharCounter />
      </Frame>

      <Frame label="4. With toolbar" note="リッチエディタの入口">
        <WithToolbar />
      </Frame>

      <Frame label="5. Code editor" note="黒背景 + monospace">
        <CodeEditor />
      </Frame>

      <Frame label="6. AI prompt" note="ChatGPT / Claude 風">
        <AIPrompt />
      </Frame>

      <Frame label="7. Mention" note="@ や # でリンク・引用">
        <MentionField />
      </Frame>

      <Frame label="8. Markdown editor + preview" note="2分割">
        <MarkdownPreview />
      </Frame>

      <Frame label="9. Underline only" note="極限まで装飾を削る">
        <textarea
          rows={3}
          placeholder="メモ..."
          className="w-full max-w-md border-b border-zinc-300 px-1 py-1.5 text-sm focus:outline-none focus:border-zinc-900 bg-transparent resize-none"
        />
      </Frame>

      <Frame label="10. Disabled" note="操作不可">
        <textarea
          rows={3}
          disabled
          defaultValue="編集できません"
          className="w-full max-w-md rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 resize-none cursor-not-allowed"
        />
      </Frame>
    </div>
  )
}
