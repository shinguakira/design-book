import {
  Home,
  Search,
  Plus,
  Heart,
  CircleUser,
  Code,
  Send,
  Video,
  Briefcase,
  X,
} from "lucide-react";

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
      <div className="bg-zinc-100 p-4">{children}</div>
    </div>
  );
}

export default function Footers() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        フッターは「行き止まり」ではなく「再ナビゲーション」の場所。リンク網 + 法的情報 + ソーシャル
        + コピーライトが基本構成。
      </p>

      <Frame
        label="Marketing — Multi-column"
        note="SaaSコーポレートの定番。製品・会社・リソース・法務。"
      >
        <footer className="bg-zinc-900 text-zinc-300 rounded-md">
          <div className="px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
                  <span className="font-bold">Acme</span>
                </div>
                <p className="text-xs text-zinc-400 mt-3 max-w-xs">
                  デザインチームのための、はじめてのプラットフォーム。
                </p>
                <div className="flex gap-2 mt-4">
                  {[Send, Code, Briefcase, Video].map((Icon, i) => (
                    <a
                      key={i}
                      className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-zinc-700"
                    >
                      <Icon className="w-4 h-4 text-zinc-300" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-3">製品</div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a>機能一覧</a>
                  </li>
                  <li>
                    <a>料金</a>
                  </li>
                  <li>
                    <a>API ドキュメント</a>
                  </li>
                  <li>
                    <a>変更履歴</a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-3">会社</div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a>About</a>
                  </li>
                  <li>
                    <a>採用</a>
                  </li>
                  <li>
                    <a>ニュース</a>
                  </li>
                  <li>
                    <a>お問い合わせ</a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-3">リソース</div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a>ブログ</a>
                  </li>
                  <li>
                    <a>ヘルプセンター</a>
                  </li>
                  <li>
                    <a>コミュニティ</a>
                  </li>
                  <li>
                    <a>ステータス</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
            <div>© 2026 Acme, Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a>プライバシー</a>
              <a>利用規約</a>
              <a>Cookie</a>
            </div>
          </div>
        </footer>
      </Frame>

      <Frame label="App — Minimal" note="管理画面・ダッシュボード。コピーライトとリンクのみ。">
        <footer className="bg-white rounded-md border border-zinc-200">
          <div className="px-6 h-12 flex items-center justify-between text-xs text-zinc-500">
            <div>© 2026 Acme</div>
            <div className="flex items-center gap-4">
              <a className="hover:text-zinc-900">ヘルプ</a>
              <a className="hover:text-zinc-900">フィードバック</a>
              <a className="hover:text-zinc-900">ステータス</a>
              <a className="hover:text-zinc-900">v4.7.2</a>
            </div>
          </div>
        </footer>
      </Frame>

      <Frame label="Mobile Tab Bar" note="iOS / Android のボトムナビ。5タブ以内が目安。">
        <div className="mx-auto max-w-sm">
          <footer className="bg-white rounded-lg shadow-sm border border-zinc-200">
            <div className="flex">
              {[
                { Icon: Home, label: "ホーム", active: true },
                { Icon: Search, label: "検索" },
                { Icon: Plus, label: "投稿", primary: true },
                { Icon: Heart, label: "お気に入り" },
                { Icon: CircleUser, label: "マイ" },
              ].map(({ Icon, label, active, primary }) => (
                <button
                  key={label}
                  className={`flex-1 py-2 flex flex-col items-center gap-0.5 ${
                    active ? "text-blue-500" : "text-zinc-500"
                  }`}
                >
                  {primary ? (
                    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center -mt-2 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="text-[10px]">{label}</span>
                </button>
              ))}
            </div>
            <div className="h-1.5 mx-auto w-32 my-1 rounded-full bg-zinc-900" />
          </footer>
        </div>
      </Frame>

      <Frame label="Sticky CTA" note="モバイル下端の常時CTA。EC・予約系で多い。">
        <footer className="rounded-md overflow-hidden border border-zinc-200">
          <div className="bg-white px-4 py-3 flex items-center gap-3">
            <div>
              <div className="text-xs text-zinc-500">合計</div>
              <div className="font-semibold">¥12,800</div>
            </div>
            <button className="flex-1 h-11 rounded-md bg-zinc-900 text-white text-sm font-semibold">
              購入手続きへ
            </button>
          </div>
        </footer>
      </Frame>

      <Frame label="Cookie banner" note="GDPR / 個人情報保護法対応。下端固定。">
        <footer className="rounded-md overflow-hidden">
          <div className="bg-zinc-900 text-white p-4 flex items-start gap-4">
            <div className="flex-1 text-sm">
              <div className="font-semibold mb-1">Cookie の使用について</div>
              <div className="text-zinc-300 text-xs">
                体験向上のため Cookie を使用しています。詳細は
                <a className="underline ml-1">プライバシーポリシー</a>
                をご覧ください。
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-3 h-8 rounded-md border border-zinc-700 text-xs">設定</button>
              <button className="px-3 h-8 rounded-md bg-white text-zinc-900 text-xs font-medium">
                すべて許可
              </button>
              <button className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </Frame>

      <Frame label="Newsletter signup" note="メディア・ブログ系のリピート獲得に効く。">
        <footer className="rounded-md overflow-hidden">
          <div className="bg-gradient-to-br from-violet-600 to-pink-600 text-white px-6 py-8 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <div className="font-bold text-lg">ニュースレターを購読</div>
              <div className="text-sm opacity-90 mt-1">月1回、デザインの最新トピックをお届け。</div>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                placeholder="you@example.com"
                className="flex-1 md:w-72 h-10 rounded-md bg-white/10 backdrop-blur border border-white/30 px-3 text-sm placeholder:text-white/60 outline-none focus:bg-white/20"
              />
              <button className="h-10 px-4 rounded-md bg-white text-zinc-900 text-sm font-semibold">
                登録
              </button>
            </form>
          </div>
        </footer>
      </Frame>
    </div>
  );
}
