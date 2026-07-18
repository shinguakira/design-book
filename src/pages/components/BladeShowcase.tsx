import { useEffect, useRef, useState } from "react";
import { ChevronRight, Database, Globe, HardDrive, Server, Settings, Tag, X } from "lucide-react";

type ResourceId = "web-01" | "web-02" | "db-01" | "storage-01" | "net-01";

const RESOURCES: {
  id: ResourceId;
  name: string;
  type: string;
  Icon: typeof Server;
  status: "Running" | "Stopped" | "Provisioning";
  region: string;
}[] = [
  {
    id: "web-01",
    name: "web-server-01",
    type: "Virtual Machine",
    Icon: Server,
    status: "Running",
    region: "Tokyo",
  },
  {
    id: "web-02",
    name: "web-server-02",
    type: "Virtual Machine",
    Icon: Server,
    status: "Running",
    region: "Tokyo",
  },
  {
    id: "db-01",
    name: "main-database",
    type: "PostgreSQL",
    Icon: Database,
    status: "Running",
    region: "Osaka",
  },
  {
    id: "storage-01",
    name: "asset-storage",
    type: "Object Storage",
    Icon: HardDrive,
    status: "Running",
    region: "Tokyo",
  },
  {
    id: "net-01",
    name: "public-vnet",
    type: "Virtual Network",
    Icon: Globe,
    status: "Running",
    region: "Tokyo",
  },
];

const STATUS_STYLE = {
  Running: "bg-emerald-100 text-emerald-800",
  Stopped: "bg-zinc-100 text-zinc-700",
  Provisioning: "bg-amber-100 text-amber-800",
};

type Blade =
  | { kind: "list" }
  | { kind: "detail"; resourceId: ResourceId }
  | { kind: "settings"; resourceId: ResourceId; tab: "config" | "tags" };

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
      <div className="p-5">{children}</div>
    </div>
  );
}

function useEsc(onClose: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, onClose]);
}

/* ============ メインデモ: スタック ============ */
function StackDemo() {
  const [stack, setStack] = useState<Blade[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 新しいブレードを開くたびに右端へ自動スクロール
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, [stack.length]);

  const open = (b: Blade) => setStack((s) => [...s, b]);
  const closeFrom = (idx: number) => setStack((s) => s.slice(0, idx));

  // 同じ深さに別 blade を開く時はそこから上を捨てて push
  const replaceAt = (idx: number, b: Blade) => setStack((s) => [...s.slice(0, idx), b]);

  useEsc(() => setStack((s) => s.slice(0, -1)), stack.length > 0);

  return (
    <div className="rounded-lg border border-zinc-200 overflow-hidden bg-white">
      {/* メイン画面 */}
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span>Cloud Console</span>
        </div>
        <button
          onClick={() => open({ kind: "list" })}
          className="px-3 h-8 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-500"
        >
          + リソースを表示
        </button>
      </div>
      <div className="relative h-[440px]">
        {/* 背景の「ダッシュボード」っぽい何か */}
        <div className="absolute inset-0 p-6 grid grid-cols-3 gap-3 bg-zinc-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md border border-zinc-200 bg-white p-3">
              <div className="h-3 w-2/3 bg-zinc-200 rounded animate-pulse" />
              <div className="h-2 w-1/2 bg-zinc-100 rounded mt-2" />
              <div className="h-12 w-full bg-zinc-100 rounded mt-2" />
            </div>
          ))}
        </div>

        {/* Blade 群 */}
        {stack.length > 0 && (
          <div
            className="absolute inset-y-0 right-0 bg-black/20 backdrop-blur-[1px] flex"
            style={{ left: 0 }}
            onClick={() => setStack([])}
          >
            <div
              ref={containerRef}
              className="absolute inset-y-0 right-0 flex overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "100%",
              }}
            >
              {stack.map((b, i) => (
                <BladePanel
                  key={i}
                  blade={b}
                  depth={i}
                  isLast={i === stack.length - 1}
                  onClose={() => closeFrom(i)}
                  onOpenChild={(child) =>
                    i === stack.length - 1 ? open(child) : replaceAt(i + 1, child)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="px-5 py-2 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-500 flex justify-between">
        <span>
          スタック数: <b className="text-zinc-700">{stack.length}</b>
        </span>
        <span>背景クリック or Esc で閉じる</span>
      </div>
    </div>
  );
}

function BladePanel({
  blade,
  depth,
  isLast,
  onClose,
  onOpenChild,
}: {
  blade: Blade;
  depth: number;
  isLast: boolean;
  onClose: () => void;
  onOpenChild: (b: Blade) => void;
}) {
  if (blade.kind === "list") {
    return (
      <div
        className="h-full bg-white border-l border-zinc-300 shadow-2xl flex flex-col animate-slide-in-right"
        style={{ width: 420, opacity: isLast ? 1 : 0.92 }}
      >
        <BladeHeader title="リソース一覧" subtitle={`Depth ${depth + 1}`} onClose={onClose} />
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {RESOURCES.map((r) => (
            <button
              key={r.id}
              onClick={() => onOpenChild({ kind: "detail", resourceId: r.id })}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-50 text-left border border-transparent hover:border-zinc-200"
            >
              <r.Icon className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-xs text-zinc-500">{r.type}</div>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STATUS_STYLE[r.status]}`}
              >
                {r.status}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (blade.kind === "detail") {
    const r = RESOURCES.find((x) => x.id === blade.resourceId)!;
    return (
      <div
        className="h-full bg-white border-l border-zinc-300 shadow-2xl flex flex-col animate-slide-in-right"
        style={{ width: 480, opacity: isLast ? 1 : 0.92 }}
      >
        <BladeHeader title={r.name} subtitle={`${r.type} · ${r.region}`} onClose={onClose} />
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="ステータス" value={r.status} />
            <Stat label="リージョン" value={r.region} />
            <Stat label="種別" value={r.type} />
            <Stat label="作成日" value="2026-04-12" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              操作
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  onOpenChild({
                    kind: "settings",
                    resourceId: r.id,
                    tab: "config",
                  })
                }
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-200 hover:border-zinc-400 text-sm"
              >
                <Settings className="w-4 h-4 text-zinc-500" />
                設定を開く
                <ChevronRight className="w-3 h-3 text-zinc-400 ml-auto" />
              </button>
              <button
                onClick={() =>
                  onOpenChild({
                    kind: "settings",
                    resourceId: r.id,
                    tab: "tags",
                  })
                }
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-200 hover:border-zinc-400 text-sm"
              >
                <Tag className="w-4 h-4 text-zinc-500" />
                タグを管理
                <ChevronRight className="w-3 h-3 text-zinc-400 ml-auto" />
              </button>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              アクティビティ
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { t: "5 分前", m: "CPU 使用率が 80% を超えました" },
                { t: "1 時間前", m: "スケーリングルールを更新しました" },
                { t: "昨日", m: "デプロイ #4271 が完了" },
              ].map((a, i) => (
                <li key={i} className="flex gap-3 px-3 py-2 rounded-md bg-zinc-50">
                  <span className="text-zinc-500 w-16 shrink-0">{a.t}</span>
                  <span className="text-zinc-700">{a.m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // settings
  const r = RESOURCES.find((x) => x.id === blade.resourceId)!;
  return (
    <div
      className="h-full bg-white border-l border-zinc-300 shadow-2xl flex flex-col animate-slide-in-right"
      style={{ width: 520, opacity: isLast ? 1 : 0.92 }}
    >
      <BladeHeader
        title={`${r.name} の設定`}
        subtitle={blade.tab === "config" ? "構成" : "タグ"}
        onClose={onClose}
      />
      <div className="flex items-center gap-1 px-4 border-b border-zinc-200 bg-zinc-50">
        {(["config", "tags"] as const).map((t) => (
          <button
            key={t}
            className={`h-9 px-3 text-xs font-medium border-b-2 -mb-px ${
              blade.tab === t ? "border-blue-600 text-blue-700" : "border-transparent text-zinc-500"
            }`}
          >
            {t === "config" ? "構成" : "タグ"}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {blade.tab === "config" ? (
          <div className="space-y-3 text-sm">
            <FormRow label="自動スケーリング" value="有効 (2–8インスタンス)" />
            <FormRow label="再起動ポリシー" value="On failure" />
            <FormRow label="ヘルスチェック" value="HTTP /health · 30秒" />
            <FormRow label="ログレベル" value="info" />
          </div>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {["env:prod", "team:platform", "owner:taro", "cost:001"].map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 h-8 rounded-md border border-zinc-300 text-xs font-medium"
        >
          キャンセル
        </button>
        <button className="px-3 h-8 rounded-md bg-blue-600 text-white text-xs font-medium">
          保存
        </button>
      </div>
    </div>
  );
}

function BladeHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
}) {
  return (
    <div className="border-b border-zinc-200 px-5 py-3 flex items-start gap-3 bg-white">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{title}</div>
        {subtitle && <div className="text-[11px] text-zinc-500 mt-0.5">{subtitle}</div>}
      </div>
      <button
        onClick={onClose}
        className="w-7 h-7 rounded-md hover:bg-zinc-100 text-zinc-500 flex items-center justify-center"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-200 p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
        {label}
      </div>
      <div className="text-sm font-medium mt-0.5">{value}</div>
    </div>
  );
}

function FormRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-zinc-100 pb-2">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/* ============ 小サンプル: 単一ブレード ============ */
function SingleBlade() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-zinc-200 overflow-hidden bg-white relative h-64">
      <div className="absolute inset-0 p-4 bg-zinc-50">
        <button
          onClick={() => setOpen(true)}
          className="px-3 h-8 rounded-md bg-zinc-900 text-white text-xs font-medium"
        >
          ブレードを開く
        </button>
      </div>
      {open && (
        <>
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div
            className="absolute inset-y-0 right-0 bg-white shadow-2xl border-l border-zinc-300 animate-slide-in-right"
            style={{ width: 320 }}
          >
            <BladeHeader
              title="単一ブレード"
              subtitle="Drawer と違い「タイトル + 操作 + フォーム」前提"
              onClose={() => setOpen(false)}
            />
            <div className="p-4 text-sm">
              ブレードは右からスライドイン、Esc / 背景クリックで閉じる。
              <br />
              スタックさせる前段としてもこの形を使う。
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function BladeShowcase() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        <b>Blade</b> は右からスライドインするパネルを <b>横に積み重ねて</b>{" "}
        詳細→詳細→詳細とドリルダウンしていくUI。Azure Portal が代表例で、 Drawer (1枚)
        と違いスタック構造で「いま自分がどの階層にいるか」が
        水平方向に可視化される。管理画面・コンソール系で多用される。
      </p>

      <Frame label="1. 単一ブレード" note="まずは Drawer に近い1枚バージョン">
        <SingleBlade />
      </Frame>

      <Frame
        label="2. スタッキング (本命)"
        note="クリックで右側に新しいブレードを push。中間ブレードを再選択すると上が捨てられる"
      >
        <StackDemo />
      </Frame>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">Drawer との違い</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Drawer</b> — 1枚だけ、閉じたら戻す。タスク完結型 (フィルタ・編集・通知)
          </li>
          <li>
            <b>Blade</b> — 階層をスタック。詳細→さらに詳細→そのまた詳細 と 横スクロールで深く潜る
            (リソースの構成 → 個別設定 → 個別タグ など)
          </li>
          <li>
            背景クリックで <b>すべて閉じる</b>、各 × は <b>その階層から上を閉じる</b>
          </li>
          <li>中間ブレードから別アイテムを選ぶと、それより右はリセットされる</li>
        </ul>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="font-semibold mb-2">注意点</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>横スクロールが必要になりがち。3〜4 階層を実用上の上限に</li>
          <li>モバイルとは相性が悪い (横幅不足)</li>
          <li>「いまどこにいるか」のパンくず / 戻る動線がないと迷子になる</li>
          <li>キーボード操作 (Esc / Tab / 矢印) を必ず網羅する</li>
        </ul>
      </section>
    </div>
  );
}
