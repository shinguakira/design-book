import { useEffect, useState } from 'react'
import { Mic, Square, Trash2, Play, Pause, Send, AudioLines } from 'lucide-react'

function Bars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full ${
            active ? 'bg-red-500' : 'bg-zinc-400'
          } ${active ? 'animate-pulse' : ''}`}
          style={{
            height: `${20 + Math.sin(i * 0.5) * 30 + Math.cos(i * 0.7) * 25}%`,
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}

export default function VoiceInput() {
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!recording) return
    setSeconds(0)
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [recording])

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        音声入力UI。録音状態の可視化 (赤いドット+タイマー+波形) は必須。誤録音を避けるためキャンセル手段を必ず用意。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
            待機状態 → 録音
          </div>
          <div className="p-8 flex items-center justify-center min-h-40 bg-zinc-50">
            {!recording ? (
              <button
                onClick={() => setRecording(true)}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover:scale-105 transition">
                  <Mic className="w-7 h-7" />
                </div>
                <div className="text-xs text-zinc-500">タップして録音開始</div>
              </button>
            ) : (
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-mono tabular-nums">{time}</span>
                </div>
                <Bars active />
                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={() => setRecording(false)}
                    className="w-11 h-11 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center"
                    title="キャンセル"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setRecording(false)}
                    className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center"
                    title="停止"
                  >
                    <Square className="w-5 h-5 fill-white" />
                  </button>
                  <button
                    onClick={() => setRecording(false)}
                    className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center"
                    title="送信"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
            録音後プレビュー (再生 / 送信 / 破棄)
          </div>
          <div className="p-8 bg-zinc-50">
            <div className="rounded-2xl bg-white border border-zinc-200 p-4">
              <div className="flex items-center gap-3">
                <button className="w-11 h-11 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white" />
                </button>
                <div className="flex-1">
                  <Bars active={false} />
                  <div className="flex justify-between text-xs text-zinc-500 mt-1 tabular-nums">
                    <span>0:00</span>
                    <span>0:24</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="text-sm text-zinc-500 hover:text-zinc-900">
                  破棄
                </button>
                <button className="px-4 h-9 rounded-md bg-blue-500 text-white text-sm font-medium flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
            音声バブル (チャット内で再生)
          </div>
          <div className="p-6 bg-zinc-50">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2.5 max-w-xs">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Pause className="w-4 h-4 fill-white" />
                  </button>
                  <Bars active={false} />
                  <span className="text-xs tabular-nums">0:24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
            リアルタイム文字起こし (Whisper / 音声検索)
          </div>
          <div className="p-6 bg-zinc-50">
            <div className="rounded-xl bg-white border border-zinc-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AudioLines className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="text-sm font-medium">話してください...</span>
              </div>
              <div className="text-sm text-zinc-900 leading-relaxed">
                明日の14時から会議室Aで
                <span className="text-zinc-400 animate-pulse">
                  デザインレビューを...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="font-semibold mb-2">UXで気をつけること</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>マイク許可を最初に丁寧に説明 (なぜ必要か)</li>
          <li>長押し or タップ録音は環境で使い分け (スマホは長押し、PCはタップが多い)</li>
          <li>「上スワイプでキャンセル」のようなジェスチャは説明文を表示</li>
          <li>無音検知での自動停止は便利だが、長い間 (5秒) 待つこと</li>
          <li>録音中は他の操作 (送信/添付) を無効化、誤操作を防ぐ</li>
        </ul>
      </section>
    </div>
  )
}
