import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  ChevronLeft,
  MoreVertical,
  Plus,
  Sparkles,
  Settings,
  LogOut,
  CircleUserRound,
  Zap,
  LayoutGrid,
  Code,
  BookOpen,
  Bot,
} from "lucide-react";

function useOutsideClick<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

function MarketingDropdown({ onClose }: { onClose: () => void }) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  const items = [
    { Icon: Bot, name: "Acme AI", desc: "AIアシスタント" },
    { Icon: LayoutGrid, name: "Acme Design", desc: "デザインツール" },
    { Icon: Code, name: "Acme Code", desc: "コードレビュー" },
    { Icon: BookOpen, name: "Acme Docs", desc: "ドキュメント管理" },
  ];
  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-zinc-200 bg-white shadow-xl p-2 z-20 animate-slide-in-down"
    >
      {items.map((it) => (
        <button
          key={it.name}
          className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 text-left"
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center shrink-0">
            <it.Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-medium">{it.name}</div>
            <div className="text-xs text-zinc-500">{it.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  const items = [
    {
      title: "山田 太郎 さんがコメントしました",
      body: "「この配色いいですね...」",
      time: "5分前",
      unread: true,
    },
    {
      title: "PR #123 がマージされました",
      body: "feat: add design tokens",
      time: "30分前",
      unread: true,
    },
    {
      title: "本番デプロイが完了しました",
      body: "ビルド時間 24秒",
      time: "2時間前",
    },
  ];
  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-zinc-200 bg-white shadow-xl z-20 animate-slide-in-down overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
        <div className="text-sm font-semibold">通知</div>
        <button className="text-xs text-blue-600">すべて既読</button>
      </div>
      <ul className="max-h-72 overflow-y-auto divide-y divide-zinc-100">
        {items.map((n, i) => (
          <li key={i} className="px-4 py-3 hover:bg-zinc-50 cursor-pointer flex gap-3">
            <div
              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                n.unread ? "bg-blue-500" : "bg-transparent"
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{n.title}</div>
              <div className="text-xs text-zinc-500 truncate">{n.body}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-4 py-2 border-t border-zinc-200 text-center">
        <button className="text-xs text-zinc-600 hover:text-zinc-900">すべての通知を見る</button>
      </div>
    </div>
  );
}

function UserMenu({ onClose }: { onClose: () => void }) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white shadow-xl z-20 animate-slide-in-down overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-zinc-200">
        <div className="font-medium text-sm">山田 太郎</div>
        <div className="text-xs text-zinc-500">taro@example.com</div>
      </div>
      <div className="py-1">
        {[
          { Icon: CircleUserRound, label: "プロフィール" },
          { Icon: Settings, label: "設定" },
          { Icon: Zap, label: "アップグレード", accent: true },
        ].map((it) => (
          <button
            key={it.label}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-zinc-50 text-left"
          >
            <it.Icon className={`w-4 h-4 ${it.accent ? "text-amber-500" : "text-zinc-500"}`} />
            <span className={it.accent ? "text-amber-700 font-medium" : ""}>{it.label}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-zinc-200 py-1">
        <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-zinc-50 text-rose-600 text-left">
          <LogOut className="w-4 h-4" />
          ログアウト
        </button>
      </div>
    </div>
  );
}

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

export default function Headers() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dash");

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        ヘッダーは画面の入口。ユーザーが「どこにいて、何ができるか」が3秒で分かる構成が理想。下のヘッダーは触れます
        (ドロップダウン・通知・ユーザーメニュー)。
      </p>

      <Frame label="Marketing" note="「製品」をクリックでメガメニュー">
        <header className="bg-white shadow-sm rounded-md">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
              <span className="font-bold tracking-tight">Acme</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a className="text-zinc-700 hover:text-zinc-900 cursor-pointer">機能</a>
              <div className="relative">
                <button
                  onClick={() => setProductsOpen((o) => !o)}
                  className={`flex items-center gap-1 transition ${
                    productsOpen ? "text-zinc-900" : "text-zinc-700 hover:text-zinc-900"
                  }`}
                >
                  製品
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {productsOpen && <MarketingDropdown onClose={() => setProductsOpen(false)} />}
              </div>
              <a className="text-zinc-700 hover:text-zinc-900 cursor-pointer">料金</a>
              <a className="text-zinc-700 hover:text-zinc-900 cursor-pointer">事例</a>
              <a className="text-zinc-700 hover:text-zinc-900 cursor-pointer">ブログ</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="text-sm text-zinc-700 hover:text-zinc-900">ログイン</button>
              <button className="px-3 h-9 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800">
                無料で始める
              </button>
            </div>
          </div>
        </header>
      </Frame>

      <Frame
        label="App / Dashboard"
        note="ナビは切替可・🔔 で通知パネル・アバターでユーザーメニュー"
      >
        <header className="bg-white shadow-sm rounded-md">
          <div className="px-5 h-14 flex items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
              <span className="font-semibold text-sm">Acme</span>
            </div>
            <nav className="flex items-center gap-1">
              {[
                { id: "dash", label: "ダッシュボード" },
                { id: "proj", label: "プロジェクト" },
                { id: "team", label: "チーム" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`h-8 px-3 rounded-md text-sm transition ${
                    activeTab === t.id
                      ? "bg-zinc-100 font-medium"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  placeholder="検索 (⌘K)"
                  className="w-full h-9 rounded-md border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-sm focus:outline-none focus:bg-white focus:border-zinc-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen((o) => !o);
                    setUserOpen(false);
                  }}
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition relative ${
                    notifOpen ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
                </button>
                {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setUserOpen((o) => !o);
                    setNotifOpen(false);
                  }}
                  className={`w-9 h-9 rounded-full text-white text-xs font-semibold flex items-center justify-center transition ${
                    userOpen
                      ? "bg-violet-700 ring-2 ring-violet-200"
                      : "bg-violet-500 hover:bg-violet-600"
                  }`}
                >
                  YT
                </button>
                {userOpen && <UserMenu onClose={() => setUserOpen(false)} />}
              </div>
            </div>
          </div>
        </header>
      </Frame>

      <Frame label="Centered logo" note="ECサイト・メディア系で多い。ロゴ中央、左右にナビ。">
        <header className="bg-white shadow-sm rounded-md">
          <div className="px-6 h-16 grid grid-cols-3 items-center">
            <nav className="flex items-center gap-5 text-sm">
              <a className="text-zinc-700">SHOP</a>
              <a className="text-zinc-700">NEW</a>
              <a className="text-zinc-700">SALE</a>
            </nav>
            <div className="text-center">
              <div className="font-bold tracking-[0.3em] text-lg">BRAND</div>
            </div>
            <div className="flex items-center justify-end gap-4 text-zinc-700">
              <Search className="w-4 h-4 cursor-pointer" />
              <a className="text-sm">CART (2)</a>
            </div>
          </div>
        </header>
      </Frame>

      <Frame label="Transparent on hero" note="LP最上部。スクロールで背景白に切替えるのが定番。">
        <header className="rounded-md overflow-hidden">
          <div
            className="relative px-6 py-16"
            style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)",
            }}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur" />
                <span className="font-bold">Acme</span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a className="opacity-80 hover:opacity-100">製品</a>
                <a className="opacity-80 hover:opacity-100">料金</a>
                <a className="opacity-80 hover:opacity-100">会社</a>
              </nav>
              <button className="px-3 h-9 rounded-md bg-white/20 backdrop-blur border border-white/30 text-sm font-medium">
                無料で始める
              </button>
            </div>
            <div className="text-center mt-12 text-white">
              <h1 className="text-3xl font-bold">未来をつくろう。</h1>
              <p className="text-sm opacity-80 mt-2">ヒーローと一体化したヘッダー</p>
            </div>
          </div>
        </header>
      </Frame>

      <Frame
        label="Mobile App (back + title + action)"
        note="詳細画面の典型。戻る/タイトル/オプション。"
      >
        <header className="bg-white rounded-md shadow-sm">
          <div className="px-2 h-12 flex items-center">
            <button className="w-10 h-10 flex items-center justify-center text-zinc-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center font-semibold text-sm">注文の詳細</div>
            <button className="w-10 h-10 flex items-center justify-center text-zinc-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>
      </Frame>

      <Frame label="Mobile App (hamburger + brand + actions)" note="トップ画面の典型。">
        <header className="bg-white rounded-md shadow-sm">
          <div className="px-2 h-12 flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center text-zinc-700">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 font-bold tracking-tight">Acme</div>
            <button className="w-10 h-10 flex items-center justify-center text-zinc-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-zinc-700 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
          </div>
        </header>
      </Frame>

      <Frame
        label="With sub-nav (タブが2段)"
        note="セクションを切替えるアプリで多い。Notion / Linear など。"
      >
        <header className="bg-white rounded-md shadow-sm">
          <div className="px-5 h-14 flex items-center justify-between border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-zinc-900" />
              <span className="font-semibold text-sm">Acme</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 h-8 rounded-md hover:bg-zinc-100 text-sm">招待</button>
              <button className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center">
                HS
              </button>
            </div>
          </div>
          <div className="px-4 flex items-center gap-1 h-10">
            {["概要", "タスク", "ドキュメント", "メンバー", "設定"].map((label, i) => (
              <button
                key={label}
                className={`h-8 px-3 rounded-md text-sm ${
                  i === 0 ? "bg-zinc-100 font-medium" : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>
      </Frame>

      <Frame label="Sticky shrink" note="スクロールでヘッダー高が縮む。h-20 → h-14。">
        <header className="bg-white rounded-md shadow-sm">
          <div className="px-6 h-14 flex items-center justify-between border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-900" />
              <span className="font-bold text-sm">Acme</span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-xs">
              <a>機能</a>
              <a>料金</a>
              <a>事例</a>
            </nav>
            <button className="px-3 h-8 rounded-md bg-zinc-900 text-white text-xs font-medium">
              始める
            </button>
          </div>
          <div className="px-6 text-[11px] text-zinc-400 py-1 text-center">
            ↑ スクロール時はこの高さに圧縮 (本来は h-20 が h-14 に)
          </div>
        </header>
      </Frame>

      <Frame label="With promotional banner" note="ヘッダー上部にバナー。キャンペーン告知に。">
        <header className="rounded-md overflow-hidden shadow-sm">
          <div className="bg-zinc-900 text-white text-xs px-4 py-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            年末セール開催中 — 詳細はこちら →
          </div>
          <div className="bg-white px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-zinc-900" />
              <span className="font-bold">Acme</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 h-9 rounded-md bg-blue-600 text-white text-sm font-medium">
              <Plus className="w-3.5 h-3.5" />
              新規作成
            </button>
          </div>
        </header>
      </Frame>
    </div>
  );
}
