import { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Mic,
  ArrowUp,
  Globe,
  Wrench,
  Square,
  Pencil,
} from 'lucide-react'

type Msg = { id: number; role: 'user' | 'assistant'; text: string }

const INITIAL: Msg[] = [
  {
    id: 1,
    role: 'user',
    text: 'useState の基本的な使い方を、初学者にも分かるように教えて。',
  },
  {
    id: 2,
    role: 'assistant',
    text:
      '`useState` は React のフックの1つで、関数コンポーネント内で「状態」を持つために使います。\n\n基本的な書き方は次の通りです:\n\n```\nconst [count, setCount] = useState(0)\n\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    {count}\n  </button>\n)\n```\n\n`useState(0)` の引数は初期値です。返り値は配列で、`[現在値, 更新関数]` が分割代入で取り出せます。',
  },
]

const RESPONSES = [
  '`useEffect` は副作用 (DOM操作・API・購読など) を扱うためのフックです。\n\n```\nuseEffect(() => {\n  // 実行する副作用\n  return () => { /* cleanup */ }\n}, [deps])\n```\n\n第2引数の依存配列が空 `[]` ならマウント時のみ実行、依存値が変われば再実行されます。',
  '`useRef` は値を保持しつつ「再レンダーを引き起こさない」フックです。DOMノードへの参照や、レンダー外で持ち回したい変数に向いています。',
  '`useContext` は親→子の props バケツリレーを避けるためのフックです。テーマ・認証・i18n などのグローバル状態に向いています。',
  '`useReducer` は複雑な状態遷移を整理するフックです。state の更新ロジックを reducer 関数にまとめられ、`useState` で書くより読みやすくなる場面があります。',
  '`useMemo` と `useCallback` は再計算を抑えるためのフックです。子コンポーネントに渡す値の参照を安定化させ、無駄な再レンダーを防ぐ用途で使います。',
]

function CodeOrText({ text }: { text: string }) {
  const parts = text.split(/```([\s\S]*?)```/)
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <pre
              key={i}
              className="bg-zinc-900 text-zinc-100 rounded-lg p-3 text-xs font-mono overflow-x-auto my-2"
            >
              {part.trim()}
            </pre>
          )
        }
        const inlineParts = part.split(/`([^`]+)`/)
        return (
          <span key={i}>
            {inlineParts.map((p, j) =>
              j % 2 === 1 ? (
                <code
                  key={j}
                  className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono"
                >
                  {p}
                </code>
              ) : (
                <span key={j} className="whitespace-pre-wrap">
                  {p}
                </span>
              ),
            )}
          </span>
        )
      })}
    </>
  )
}

export default function AIChat() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL)
  const [streaming, setStreaming] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [responseIdx, setResponseIdx] = useState(0)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stopRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, streaming])

  const streamResponse = (full: string, parentId: number) => {
    setStreaming('')
    stopRef.current = false
    let i = 0
    const step = () => {
      if (stopRef.current) return
      i += 2 + Math.floor(Math.random() * 3)
      const next = full.slice(0, Math.min(i, full.length))
      setStreaming(next)
      if (i < full.length) {
        setTimeout(step, 25)
      } else {
        setMessages((m) => [
          ...m,
          { id: parentId + 1, role: 'assistant', text: full },
        ])
        setStreaming(null)
      }
    }
    setTimeout(step, 350)
  }

  const send = () => {
    const txt = input.trim()
    if (!txt || streaming !== null) return
    const id = Date.now()
    setMessages((m) => [...m, { id, role: 'user', text: txt }])
    setInput('')
    const full = RESPONSES[responseIdx % RESPONSES.length]
    setResponseIdx((i) => i + 1)
    streamResponse(full, id)
  }

  const stop = () => {
    stopRef.current = true
    if (streaming !== null) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          role: 'assistant',
          text: streaming + '\n\n[停止しました]',
        },
      ])
      setStreaming(null)
    }
  }

  const regen = (msgId: number) => {
    if (streaming !== null) return
    const idx = messages.findIndex((m) => m.id === msgId)
    if (idx <= 0) return
    const userMsg = messages[idx - 1]
    if (userMsg.role !== 'user') return
    setMessages((m) => m.slice(0, idx))
    const full = RESPONSES[responseIdx % RESPONSES.length]
    setResponseIdx((i) => i + 1)
    streamResponse(full, userMsg.id)
  }

  const copy = (m: Msg) => {
    navigator.clipboard?.writeText(m.text).catch(() => {})
    setCopiedId(m.id)
    setTimeout(() => setCopiedId((c) => (c === m.id ? null : c)), 1500)
  }

  const reset = () => {
    stopRef.current = true
    setStreaming(null)
    setMessages(INITIAL)
  }

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        AIアシスタント (ChatGPT / Claude / Gemini) の典型UI。下の入力欄に何か打って送信すると、ストリーミングで応答が流れます。生成中は停止可、各メッセージは再生成・コピー・編集可能。
      </p>

      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-3 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-medium">Claude Opus 4.7</span>
          </div>
          <button
            onClick={reset}
            className="text-xs text-zinc-500 hover:text-zinc-900"
          >
            会話をリセット
          </button>
        </div>

        <div
          ref={scrollRef}
          className="px-6 py-6 space-y-6 max-w-3xl mx-auto h-[500px] overflow-y-auto"
        >
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === 'user' ? (
                <div className="flex justify-end group animate-slide-in-up">
                  <div className="max-w-2xl relative">
                    <div className="bg-zinc-100 rounded-2xl px-4 py-2.5 text-sm text-zinc-900 whitespace-pre-wrap">
                      {m.text}
                    </div>
                    <button
                      onClick={() => setInput(m.text)}
                      className="opacity-0 group-hover:opacity-100 absolute -left-9 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-zinc-100 text-zinc-500 transition"
                      title="編集"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 animate-slide-in-up">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 shrink-0 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-zinc-500 mb-1">
                      Claude
                    </div>
                    <div className="text-sm text-zinc-800 leading-relaxed">
                      <CodeOrText text={m.text} />
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => copy(m)}
                        title="コピー"
                        className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500"
                      >
                        {copiedId === m.id ? (
                          <span className="text-xs text-emerald-600">
                            コピー済
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => regen(m.id)}
                        title="再生成"
                        disabled={streaming !== null}
                        className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500 disabled:opacity-30"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="役に立った"
                        className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="役に立たなかった"
                        className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {streaming !== null && (
            <div className="flex gap-3 animate-slide-in-up">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 shrink-0 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-zinc-500 mb-1">
                  Claude
                </div>
                <div className="text-sm text-zinc-800 leading-relaxed">
                  {streaming === '' ? (
                    <span className="text-zinc-500 inline-flex items-center gap-1">
                      考えています
                      <span className="inline-block w-1.5 h-4 bg-zinc-700 animate-pulse align-middle ml-1" />
                    </span>
                  ) : (
                    <>
                      <CodeOrText text={streaming} />
                      <span className="inline-block w-1.5 h-4 bg-zinc-700 animate-pulse align-middle ml-0.5" />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 p-4 bg-white">
          <div className="max-w-3xl mx-auto rounded-3xl border border-zinc-300 bg-white shadow-sm focus-within:border-zinc-500 transition">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={2}
              placeholder="Claude に返信... (Enter で送信、Shift+Enter で改行)"
              className="w-full resize-none px-4 py-3 outline-none text-sm rounded-3xl"
            />
            <div className="flex items-center justify-between px-3 pb-2">
              <div className="flex items-center gap-1">
                <button
                  title="添付"
                  className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  title="音声入力"
                  className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <span className="mx-1 h-5 w-px bg-zinc-200" />
                <button className="h-8 px-3 rounded-full hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Web 検索
                </button>
                <button className="h-8 px-3 rounded-full hover:bg-zinc-100 text-xs text-zinc-700 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  ツール
                </button>
              </div>
              {streaming !== null ? (
                <button
                  onClick={stop}
                  title="停止"
                  className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                </button>
              ) : (
                <button
                  onClick={send}
                  disabled={!input.trim()}
                  title="送信"
                  className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="text-center text-[11px] text-zinc-400 mt-2">
            Claude は間違うことがあります。重要な情報は確認してください。
          </div>
        </div>
      </div>
    </div>
  )
}
