import { Check, CheckCheck } from "lucide-react";

function Frame({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className="p-5 bg-zinc-50">{children}</div>
    </div>
  );
}

export default function ChatBubbles() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        メッセージUIの「吹き出し」のバリエーション。アプリの世界観に合わせて選ぶ。読みやすさは「角丸の大きさ」「色のコントラスト」「行間」で決まる。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="iMessage (Apple)" note="青/グレー、角丸大、しっぽは控えめ">
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex justify-start">
              <div className="bg-zinc-200 text-zinc-900 rounded-2xl rounded-bl-md px-4 py-2 text-sm max-w-[75%]">
                明日のランチどうする?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-2 text-sm max-w-[75%]">
                12時に駅前で集合でどう?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-2 text-sm max-w-[75%]">
                新しいラーメン屋ができたらしい
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-zinc-200 text-zinc-900 rounded-2xl rounded-bl-md px-4 py-2 text-sm max-w-[75%]">
                いいね、行こう
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="WhatsApp" note="緑/白、しっぽあり、配信状態アイコン">
          <div
            className="space-y-2 max-w-md mx-auto p-3 rounded-md"
            style={{ background: "#e5ddd5" }}
          >
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 text-sm max-w-[75%] shadow-sm">
                明日のランチどうする?
                <div className="text-[10px] text-zinc-400 text-right mt-0.5">11:23</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="rounded-lg rounded-tr-none px-3 py-2 text-sm max-w-[75%] shadow-sm"
                style={{ background: "#dcf8c6" }}
              >
                12時に駅前で集合でどう?
                <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-500 mt-0.5">
                  11:24
                  <CheckCheck className="w-3 h-3 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="Slack / Discord" note="幅広・名前+時刻・アイコン左">
          <div className="space-y-3 bg-white p-3 rounded-md">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-violet-500 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                YT
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">山田 太郎</span>
                  <span className="text-xs text-zinc-400">11:24</span>
                </div>
                <div className="text-sm text-zinc-700">
                  デザインレビューの件、明日の14時からで大丈夫ですか?
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-emerald-500 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                HS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">佐藤 花子</span>
                  <span className="text-xs text-zinc-400">11:30</span>
                </div>
                <div className="text-sm text-zinc-700">OKです。Zoomリンク送っておきます</div>
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="ChatGPT / Claude" note="吹き出しなし・余白広め・アシスタント識別">
          <div className="space-y-6 bg-white p-4 rounded-md">
            <div className="flex justify-end">
              <div className="bg-zinc-100 rounded-2xl px-4 py-2.5 text-sm max-w-2xl">
                useState の使い方を教えて
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 shrink-0" />
              <div className="flex-1 min-w-0 text-sm text-zinc-800 leading-relaxed">
                useState は React のフックの1つで、関数コンポーネント内で状態を持つために使います...
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="LINE" note="角丸大・サブテキスト時刻外置き">
          <div className="space-y-1.5 bg-emerald-100/50 p-3 rounded-md">
            <div className="flex gap-2 items-end justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <div className="text-[11px] text-zinc-500 ml-2 mb-0.5">山田 太郎</div>
                <div className="flex items-end gap-1">
                  <div className="bg-white rounded-2xl px-3 py-2 text-sm max-w-[60vw] shadow-sm">
                    お疲れ様です!
                  </div>
                  <span className="text-[10px] text-zinc-500">11:23</span>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-1 justify-end">
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 mr-1">既読 11:25</span>
              </div>
              <div className="bg-emerald-400 text-zinc-900 rounded-2xl px-3 py-2 text-sm">
                確認しました
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="システム通知 (タイムスタンプ等)" note="中央寄せ・小・色なし">
          <div className="space-y-3 bg-white p-3 rounded-md">
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-[11px] text-zinc-500 bg-zinc-100 rounded-full">
                今日
              </span>
            </div>
            <div className="flex justify-start">
              <div className="bg-zinc-200 rounded-2xl px-4 py-2 text-sm">おはよう</div>
            </div>
            <div className="text-center text-[11px] text-zinc-400">
              佐藤 花子 がチャットに参加しました
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl px-4 py-2 text-sm flex items-center gap-2">
                よろしく
                <Check className="w-3 h-3 opacity-70" />
              </div>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  );
}
