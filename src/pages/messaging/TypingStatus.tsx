import { Clock, Check, CheckCheck, AlertCircle } from "lucide-react";

function Bubble({
  who,
  children,
  status,
}: {
  who: "me" | "them";
  children: React.ReactNode;
  status?: React.ReactNode;
}) {
  if (who === "me") {
    return (
      <div className="flex justify-end items-end gap-1.5">
        {status && <div className="text-xs text-zinc-400">{status}</div>}
        <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2 text-sm max-w-[75%]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-200 rounded-2xl rounded-bl-md px-3 py-2 text-sm max-w-[75%]">
        {children}
      </div>
    </div>
  );
}

export default function TypingStatus() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        「相手が入力中」「送信中」「既読」など、メッセージの状態を伝えるパターン。アイコン +
        文字色で段階を表現する。
      </p>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          配信ステータス
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <div className="divide-y divide-zinc-100 text-sm">
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-14 inline-flex items-center justify-center text-zinc-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium">送信中 / Sending</div>
                <div className="text-xs text-zinc-500">
                  サーバーへ送信中。タップで再試行できると親切。
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-14 inline-flex items-center justify-center text-zinc-500">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium">送信済み / Sent</div>
                <div className="text-xs text-zinc-500">
                  サーバーに届いた (相手のデバイスにはまだ未配信)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-14 inline-flex items-center justify-center text-zinc-500">
                <CheckCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium">配信済み / Delivered</div>
                <div className="text-xs text-zinc-500">相手のデバイスに届いた (未読の状態)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-14 inline-flex items-center justify-center text-blue-500">
                <CheckCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium">既読 / Read</div>
                <div className="text-xs text-zinc-500">相手が読んだ (色変えが慣例)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-5 py-3">
              <div className="w-14 inline-flex items-center justify-center text-red-500">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium">失敗 / Failed</div>
                <div className="text-xs text-zinc-500">送信失敗。タップで再試行を促す。</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          メッセージ + 状態 (バブル横に表示)
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 space-y-3 max-w-md">
          <Bubble who="them">明日の会議は何時から?</Bubble>
          <Bubble
            who="me"
            status={
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                送信中
              </span>
            }
          >
            14時からです
          </Bubble>
          <Bubble
            who="me"
            status={
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
              </span>
            }
          >
            場所は会議室A
          </Bubble>
          <Bubble
            who="me"
            status={
              <span className="flex items-center gap-1">
                <CheckCheck className="w-3 h-3" />
              </span>
            }
          >
            よろしくお願いします
          </Bubble>
          <Bubble
            who="me"
            status={
              <span className="flex items-center gap-1 text-blue-500">
                <CheckCheck className="w-3 h-3" />
                既読
              </span>
            }
          >
            資料も貼っておきますね
          </Bubble>
          <Bubble
            who="me"
            status={
              <span className="flex items-center gap-1 text-red-500">
                <AlertCircle className="w-3 h-3" />
                失敗 タップで再試行
              </span>
            }
          >
            ありがとうございます
          </Bubble>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          入力中インジケータ (Typing Indicator)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500 mb-3">バブル内ドット</div>
            <div className="flex justify-start">
              <div className="bg-zinc-200 rounded-2xl rounded-bl-md px-4 py-3 inline-flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full bg-zinc-500 animate-loading-dot"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-zinc-500 animate-loading-dot"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-zinc-500 animate-loading-dot"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500 mb-3">テキスト + ドット</div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>山田 太郎 が入力中</span>
              <span className="flex gap-0.5">
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
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500 mb-3">複数人 (Slack)</div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>山田 太郎、佐藤 花子 が入力中</span>
              <span className="flex gap-0.5">
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
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500 mb-3">AI 生成中 (カーソル点滅 + 「思考中」)</div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-zinc-500 mb-1">Claude</div>
                <div className="text-sm text-zinc-800 flex items-center gap-1">
                  考えています
                  <span className="inline-block w-1.5 h-4 bg-zinc-700 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          オンライン状態
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-violet-500" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="font-medium">山田 太郎</div>
              <div className="text-xs text-emerald-600">オンライン</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
            </div>
            <div>
              <div className="font-medium">佐藤 花子</div>
              <div className="text-xs text-amber-600">退席中 · 30分前</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-zinc-400" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-zinc-300 border-2 border-white" />
            </div>
            <div>
              <div className="font-medium">田中 一郎</div>
              <div className="text-xs text-zinc-500">オフライン · 2時間前</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
