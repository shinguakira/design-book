import { useState } from "react";
import {
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  ChevronDown,
  Search,
  Star,
  Trash2,
  Archive,
  Folder,
  Bookmark,
  Plus,
} from "lucide-react";

type Tool = {
  name: string;
  kind: "開発" | "デザイン" | "コミュニケーション" | "ナレッジ管理" | "プロジェクト管理";
  desc: string;
  users: string;
  gradient: string;
};

const TOOLS: Tool[] = [
  {
    name: "Figma",
    kind: "デザイン",
    desc: "コラボ前提のデザインツール",
    users: "4M+",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    name: "Sketch",
    kind: "デザイン",
    desc: "macOS の老舗",
    users: "1M+",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Adobe XD",
    kind: "デザイン",
    desc: "Adobe の UI/UX",
    users: "500K+",
    gradient: "from-fuchsia-400 to-purple-500",
  },
  {
    name: "Linear",
    kind: "プロジェクト管理",
    desc: "高速な issue tracker",
    users: "300K+",
    gradient: "from-violet-400 to-indigo-500",
  },
  {
    name: "Notion",
    kind: "ナレッジ管理",
    desc: "all-in-one workspace",
    users: "30M+",
    gradient: "from-zinc-500 to-zinc-700",
  },
  {
    name: "Slack",
    kind: "コミュニケーション",
    desc: "チームチャット",
    users: "20M+",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Discord",
    kind: "コミュニケーション",
    desc: "コミュニティ",
    users: "150M+",
    gradient: "from-indigo-400 to-violet-500",
  },
  {
    name: "GitHub",
    kind: "開発",
    desc: "Git ホスティング",
    users: "100M+",
    gradient: "from-zinc-700 to-zinc-900",
  },
  {
    name: "VS Code",
    kind: "開発",
    desc: "Microsoft 製エディタ",
    users: "15M+",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    name: "Vercel",
    kind: "開発",
    desc: "FE ホスティング",
    users: "500K+",
    gradient: "from-zinc-800 to-black",
  },
];

function Frame({
  label,
  note,
  children,
  span,
  bodyClass = "",
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
  span?: boolean;
  bodyClass?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white overflow-hidden ${
        span ? "lg:col-span-2" : ""
      }`}
    >
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
        <div className="text-sm font-medium">{label}</div>
        {note && <div className="text-xs text-zinc-500 mt-0.5">{note}</div>}
      </div>
      <div className={`p-5 ${bodyClass}`}>{children}</div>
    </div>
  );
}

function Initial({ tool }: { tool: Tool }) {
  return (
    <div
      className={`w-8 h-8 rounded-md bg-gradient-to-br ${tool.gradient} text-white text-xs font-bold flex items-center justify-center shrink-0`}
    >
      {tool.name[0]}
    </div>
  );
}

const BY_KIND = TOOLS.reduce(
  (acc, t) => {
    if (!acc[t.kind]) acc[t.kind] = [];
    acc[t.kind].push(t);
    return acc;
  },
  {} as Record<Tool["kind"], Tool[]>,
);

function SwitchableView() {
  const [mode, setMode] = useState<"list" | "grid">("list");
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500">{TOOLS.length} ツール</span>
        <div className="inline-flex bg-zinc-100 rounded-md p-0.5">
          <button
            onClick={() => setMode("list")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              mode === "list" ? "bg-white shadow-sm" : "text-zinc-500"
            }`}
          >
            <ListIcon className="w-3.5 h-3.5" /> List
          </button>
          <button
            onClick={() => setMode("grid")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              mode === "grid" ? "bg-white shadow-sm" : "text-zinc-500"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Grid
          </button>
        </div>
      </div>
      {mode === "list" ? (
        <ul className="divide-y divide-zinc-100 border border-zinc-200 rounded-md">
          {TOOLS.slice(0, 6).map((t) => (
            <li key={t.name} className="flex items-center gap-3 px-3 py-2 text-sm">
              <Initial tool={t} />
              <div className="flex-1">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-zinc-500">{t.kind}</div>
              </div>
              <div className="text-xs text-zinc-400">{t.users}</div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TOOLS.slice(0, 6).map((t) => (
            <li key={t.name} className="rounded-md border border-zinc-200 p-3 text-center">
              <div className="mx-auto mb-2">
                <Initial tool={t} />
              </div>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-zinc-500">{t.users}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Selectable() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (name: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  const allChecked = selected.size === TOOLS.length;
  return (
    <div className="rounded-md border border-zinc-200 overflow-hidden">
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-sm border-b border-blue-200 animate-slide-in-down">
          <b className="text-blue-900">{selected.size} 件選択</b>
          <div className="flex-1" />
          <button className="text-xs text-blue-700 hover:underline flex items-center gap-1">
            <Archive className="w-3 h-3" /> アーカイブ
          </button>
          <button className="text-xs text-rose-700 hover:underline flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> 削除
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-zinc-500 hover:underline"
          >
            解除
          </button>
        </div>
      )}
      <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={() => setSelected(allChecked ? new Set() : new Set(TOOLS.map((t) => t.name)))}
          className="accent-zinc-900"
        />
        全選択
      </div>
      <ul className="divide-y divide-zinc-100">
        {TOOLS.slice(0, 6).map((t) => (
          <li
            key={t.name}
            className={`flex items-center gap-3 px-3 py-2 text-sm ${
              selected.has(t.name) ? "bg-blue-50" : "hover:bg-zinc-50"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.has(t.name)}
              onChange={() => toggle(t.name)}
              className="accent-zinc-900"
            />
            <Initial tool={t} />
            <span className="flex-1">{t.name}</span>
            <span className="text-xs text-zinc-400">{t.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TreeNested() {
  const [open, setOpen] = useState<Set<string>>(new Set(Object.keys(BY_KIND)));
  const toggle = (k: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  return (
    <ul className="space-y-0.5">
      {Object.entries(BY_KIND).map(([kind, items]) => {
        const isOpen = open.has(kind);
        return (
          <li key={kind}>
            <button
              onClick={() => toggle(kind)}
              className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-zinc-50"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              <Folder className="w-4 h-4 text-amber-500 fill-amber-100" />
              <span className="text-sm font-medium flex-1 text-left">{kind}</span>
              <span className="text-[10px] text-zinc-400">{items.length}</span>
            </button>
            {isOpen && (
              <ul className="ml-6 border-l border-zinc-200 pl-3 space-y-0.5 mt-0.5">
                {items.map((t) => (
                  <li
                    key={t.name}
                    className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-zinc-50 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    {t.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function ListLayoutsShowcase() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        同じデータでも、リストの「並べ方」「区切り方」「密度」「操作の付け方」で印象がまったく変わります。
        本ページは同じ10ツールを16通りの List 表現で見せ比べ。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* 1 Cozy / dense */}
        <Frame label="Cozy (dense)" note="行間を詰めて多くを見せる。スプレッドシート風。">
          <ul className="divide-y divide-zinc-100 text-sm border border-zinc-200 rounded-md">
            {TOOLS.map((t) => (
              <li key={t.name} className="flex items-center gap-2 px-2 py-1 hover:bg-zinc-50">
                <span className="font-medium">{t.name}</span>
                <span className="text-zinc-400 text-xs">·</span>
                <span className="text-xs text-zinc-500">{t.kind}</span>
                <span className="flex-1" />
                <span className="text-xs text-zinc-400 font-mono tabular-nums">{t.users}</span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 2 Spacious */}
        <Frame label="Spacious" note="余白を広く、1つに集中させる。読み物・記事一覧。">
          <ul className="divide-y divide-zinc-200">
            {TOOLS.slice(0, 4).map((t) => (
              <li key={t.name} className="py-4">
                <div className="flex items-center gap-3 mb-1.5">
                  <Initial tool={t} />
                  <div className="font-semibold">{t.name}</div>
                  <span className="ml-auto text-[11px] text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-100">
                    {t.kind}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {t.desc} — 月間アクティブユーザー {t.users}。
                </p>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 3 Two-column (CSS columns) */}
        <Frame label="Two-column" note="CSS columns で2段。テキスト中心のリンク一覧に。">
          <ul className="columns-2 gap-8 text-sm space-y-1">
            {TOOLS.map((t) => (
              <li key={t.name} className="break-inside-avoid flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                {t.name}
              </li>
            ))}
          </ul>
        </Frame>

        {/* 4 Multi-column 3 */}
        <Frame label="Multi-column (3)" note="さらに密度を上げる。フッターのリンク群など。">
          <ul className="columns-3 gap-6 text-xs space-y-1 text-zinc-700">
            {TOOLS.map((t) => (
              <li key={t.name} className="break-inside-avoid">
                {t.name}
              </li>
            ))}
          </ul>
        </Frame>

        {/* 5 Grid cards */}
        <Frame label="Grid cards" note="均等な大きさのカード。サービス選択画面など。">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TOOLS.slice(0, 6).map((t) => (
              <li
                key={t.name}
                className="rounded-md border border-zinc-200 p-3 text-center hover:border-zinc-400"
              >
                <div className="mx-auto mb-2">
                  <Initial tool={t} />
                </div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{t.kind}</div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 6 Bento (asymmetric) */}
        <Frame label="Bento" note="サイズを混ぜた非対称グリッド。最近の流行。">
          <div className="grid grid-cols-4 gap-2 auto-rows-[64px]">
            {TOOLS.slice(0, 7).map((t, i) => {
              const spans = [
                "col-span-2 row-span-2",
                "col-span-2 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-2 row-span-1",
                "col-span-2 row-span-1",
                "col-span-2 row-span-1",
              ];
              return (
                <div
                  key={t.name}
                  className={`rounded-lg bg-gradient-to-br ${t.gradient} text-white p-3 flex flex-col justify-end ${spans[i]}`}
                >
                  <div className="text-xs opacity-80">{t.kind}</div>
                  <div className="font-semibold">{t.name}</div>
                </div>
              );
            })}
          </div>
        </Frame>

        {/* 7 Inline pills */}
        <Frame label="Inline pills" note="行で区切らず、チップで横に流す。タグクラウド風。">
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map((t) => (
              <li key={t.name}>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs hover:bg-zinc-200">
                  {t.name}
                  <span className="text-[10px] text-zinc-400">·</span>
                  <span className="text-[10px] text-zinc-500">{t.users}</span>
                </span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 8 Horizontal scroll */}
        <Frame label="Horizontal scroll" note="スマホ親和性◎。Netflix風の「並んだカード」。">
          <div className="-mx-5 px-5 overflow-x-auto">
            <ul className="flex gap-2 w-max pb-2">
              {TOOLS.map((t) => (
                <li
                  key={t.name}
                  className={`w-40 shrink-0 rounded-lg bg-gradient-to-br ${t.gradient} text-white p-3 flex flex-col justify-between h-32`}
                >
                  <div className="text-[10px] uppercase tracking-wider opacity-80">{t.kind}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs opacity-90">{t.users} users</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Frame>

        {/* 9 Grouped with headers */}
        <Frame label="Grouped (with headers)" note="同種をまとめる。設定・連絡先・受信箱。">
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {Object.entries(BY_KIND).map(([kind, items]) => (
              <section key={kind}>
                <div className="sticky top-0 bg-white text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-2 py-1 border-b border-zinc-100">
                  {kind}
                </div>
                <ul className="divide-y divide-zinc-100">
                  {items.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center gap-3 px-2 py-1.5 hover:bg-zinc-50"
                    >
                      <Initial tool={t} />
                      <span className="text-sm">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Frame>

        {/* 10 Tree */}
        <Frame label="Tree / nested" note="階層を表現。VS Code のファイルツリー風。">
          <TreeNested />
        </Frame>

        {/* 11 Avatar list */}
        <Frame label="Avatar list" note="顔/イニシャル + 名前 + サブ情報。チームメンバー・受信箱。">
          <ul className="space-y-2">
            {TOOLS.slice(0, 5).map((t) => (
              <li key={t.name} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} text-white font-bold flex items-center justify-center shrink-0`}
                >
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.desc}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  {t.users}
                </span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 12 Switchable list/grid */}
        <Frame label="Switchable view" note="ユーザーが List ⇄ Grid を切替える。EC・写真管理。">
          <SwitchableView />
        </Frame>

        {/* 13 Selectable / bulk */}
        <Frame label="Selectable (bulk)" note="チェックで複数選択 → 上部に一括アクションバー。">
          <Selectable />
        </Frame>

        {/* 14 Hoverable actions */}
        <Frame label="Hover actions" note="操作ボタンは普段隠す、ホバーで露出。">
          <ul className="divide-y divide-zinc-100 border border-zinc-200 rounded-md">
            {TOOLS.slice(0, 5).map((t) => (
              <li key={t.name} className="group flex items-center gap-3 px-3 py-2">
                <Initial tool={t} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-zinc-500 truncate">{t.desc}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    title="お気に入り"
                    className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="保存"
                    className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="削除"
                    className="w-7 h-7 rounded hover:bg-rose-50 text-rose-500 flex items-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 15 Searchable inline filter */}
        <Frame label="Inline search" note="リスト上部の検索で即フィルタ。">
          <InlineSearch />
        </Frame>

        {/* 16 Empty / Skeleton */}
        <Frame label="Empty + Skeleton" note="データ無 → 案内、ロード中 → 骨格を見せる。" span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-md border border-dashed border-zinc-300 p-8 text-center">
              <Folder className="w-10 h-10 text-zinc-300 mx-auto" />
              <div className="text-sm font-medium mt-2">まだツールが追加されていません</div>
              <div className="text-xs text-zinc-500 mt-1">右下のボタンから新しいツールを追加</div>
              <button className="mt-3 inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-zinc-900 text-white text-xs font-medium">
                <Plus className="w-3 h-3" />
                追加する
              </button>
            </div>
            <div className="rounded-md border border-zinc-200 divide-y divide-zinc-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-md bg-zinc-200 animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-1/3 rounded bg-zinc-200 animate-pulse" />
                    <div className="h-2 w-2/3 rounded bg-zinc-100 animate-pulse" />
                  </div>
                  <div className="h-2 w-10 rounded bg-zinc-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>とにかく多くを見せたい</b> → Cozy / Two-column / Multi-column / Inline pills
          </li>
          <li>
            <b>1つに集中させたい</b> → Spacious / Avatar list
          </li>
          <li>
            <b>並列に比較させたい</b> → Grid cards / Bento / Switchable
          </li>
          <li>
            <b>属性で整理したい</b> → Grouped / Tree
          </li>
          <li>
            <b>動的に操作させたい</b> → Selectable / Hover actions / Inline search
          </li>
          <li>
            <b>スマホ親和性</b> → Horizontal scroll / Spacious / Bento
          </li>
          <li>
            <b>状態を見せ忘れない</b> → Empty / Skeleton はデフォで作る
          </li>
        </ul>
      </section>
    </div>
  );
}

function InlineSearch() {
  const [q, setQ] = useState("");
  const filtered = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.kind.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div>
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="絞り込み..."
          className="w-full h-8 rounded-md border border-zinc-200 bg-zinc-50 pl-8 pr-2 text-sm focus:outline-none focus:bg-white focus:border-zinc-400"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-6 text-xs text-zinc-400">一致なし</div>
      ) : (
        <ul className="divide-y divide-zinc-100 border border-zinc-200 rounded-md max-h-48 overflow-y-auto">
          {filtered.map((t) => (
            <li
              key={t.name}
              className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-50"
            >
              <ChevronDown className="w-3 h-3 text-zinc-300 -rotate-90" />
              {t.name}
              <span className="ml-auto text-xs text-zinc-400">{t.kind}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
