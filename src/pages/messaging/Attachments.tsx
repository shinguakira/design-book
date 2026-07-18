import { FileText, Image as ImageIcon, Download, Play, MapPin, Mic } from "lucide-react";

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 text-sm font-medium">
        {label}
      </div>
      <div className="p-5 bg-zinc-50 flex justify-end">{children}</div>
    </div>
  );
}

export default function Attachments() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        メッセージ内の添付ファイル表示パターン。種類別 (画像 / ファイル / 音声 / 動画 / 位置)
        ごとに違うレイアウト。サムネ + メタ情報 + 操作ボタン。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="単一画像">
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md p-1.5 max-w-xs">
            <div className="bg-gradient-to-br from-pink-400 via-violet-500 to-blue-500 rounded-xl h-40 w-56" />
            <div className="px-2 py-1.5 text-xs">いい眺めです</div>
          </div>
        </Frame>

        <Frame label="複数画像 (2×2 グリッド)">
          <div className="bg-blue-500 rounded-2xl rounded-br-md p-1.5 max-w-xs">
            <div className="grid grid-cols-2 gap-1 w-56">
              <div className="bg-gradient-to-br from-amber-400 to-rose-500 rounded-lg h-24" />
              <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg h-24" />
              <div className="bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg h-24" />
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg h-24 relative">
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                  +12
                </div>
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="ファイル (PDF / Doc / Zip)">
          <div className="bg-white border border-zinc-200 rounded-2xl rounded-br-md p-3 flex items-center gap-3 max-w-sm shadow-sm">
            <div className="w-10 h-12 rounded bg-red-500 text-white flex items-center justify-center font-bold text-xs">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">design-spec-v2.pdf</div>
              <div className="text-xs text-zinc-500">2.4 MB · 12ページ</div>
            </div>
            <button className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </Frame>

        <Frame label="音声メッセージ">
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2.5 max-w-xs">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-4 h-4 fill-white" />
              </button>
              <div className="flex items-end gap-0.5 h-8">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-white/70"
                    style={{
                      height: `${20 + Math.sin(i * 0.7) * 30 + Math.cos(i) * 25}%`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs tabular-nums">0:24</span>
            </div>
          </div>
        </Frame>

        <Frame label="動画プレビュー">
          <div className="bg-blue-500 rounded-2xl rounded-br-md p-1.5 max-w-xs">
            <div className="relative">
              <div className="bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl h-40 w-56" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-zinc-900 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded">
                1:24
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="位置情報">
          <div className="bg-white border border-zinc-200 rounded-2xl rounded-br-md overflow-hidden max-w-xs shadow-sm">
            <div
              className="h-32 w-56 relative"
              style={{
                background: "linear-gradient(180deg, #d1fae5 0%, #a7f3d0 60%, #6ee7b7 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_48%,white_50%,transparent_52%),linear-gradient(-45deg,transparent_48%,white_50%,transparent_52%)] bg-[length:24px_24px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="bg-red-500 text-white rounded-full p-2">
                  <MapPin className="w-4 h-4 fill-white" />
                </div>
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="text-sm font-medium">Anthropic オフィス</div>
              <div className="text-xs text-zinc-500">サンフランシスコ, カリフォルニア</div>
            </div>
          </div>
        </Frame>

        <Frame label="リンクプレビュー (OGP)">
          <div className="bg-white border border-zinc-200 rounded-2xl rounded-br-md overflow-hidden max-w-sm shadow-sm">
            <div className="h-28 w-72 bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500" />
            <div className="px-3 py-2">
              <div className="text-[11px] text-zinc-500">anthropic.com</div>
              <div className="text-sm font-semibold leading-tight mt-0.5">
                Introducing Claude Opus 4.7
              </div>
              <div className="text-xs text-zinc-600 mt-1 line-clamp-2">
                Our most capable model yet, with deeper reasoning and faster response times.
              </div>
            </div>
          </div>
        </Frame>

        <Frame label="アップロード中 (進捗バー)">
          <div className="bg-white border border-zinc-200 rounded-2xl rounded-br-md p-3 max-w-sm shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-12 rounded bg-blue-500 text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">presentation.key</div>
                <div className="text-xs text-zinc-500">8.4 MB / 12.0 MB</div>
              </div>
              <button className="text-xs text-zinc-500">キャンセル</button>
            </div>
            <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: "70%" }} />
            </div>
          </div>
        </Frame>

        <Frame label="ボイスメモ (Slack風 with 文字起こし)">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 max-w-md shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <button className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Play className="w-4 h-4 fill-white" />
              </button>
              <div className="flex-1 flex items-end gap-0.5 h-7">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${i < 10 ? "bg-emerald-500" : "bg-zinc-300"}`}
                    style={{
                      height: `${20 + Math.sin(i * 0.5) * 30 + Math.cos(i * 0.7) * 25}%`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-500 tabular-nums">0:34 / 1:42</span>
            </div>
            <div className="border-t border-zinc-100 pt-2 flex items-start gap-2">
              <Mic className="w-3.5 h-3.5 text-zinc-400 mt-0.5" />
              <p className="text-xs text-zinc-600 leading-relaxed">
                明日の会議の件ですが、14時から会議室Aで行います。資料は事前に共有しておきますので、確認をお願いします...
              </p>
            </div>
          </div>
        </Frame>

        <Frame label="ドラッグオーバー時のドロップエリア">
          <div className="w-full max-w-sm rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50 p-8 text-center">
            <ImageIcon className="w-10 h-10 text-blue-500 mx-auto" />
            <div className="text-sm font-medium text-blue-900 mt-2">ここにドロップして送信</div>
            <div className="text-xs text-blue-700 mt-0.5">画像、動画、ファイル (50MBまで)</div>
          </div>
        </Frame>
      </div>
    </div>
  );
}
