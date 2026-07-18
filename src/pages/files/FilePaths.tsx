import { useState } from "react";
import { Copy, Check, File, ChevronRight, Folder } from "lucide-react";

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

const FULL_PATH = "/Users/dev/Documents/Projects/myapp/src/components/ui/Button.tsx";

function CopyableInline({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(path).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition"
      title={copied ? "コピーしました" : "パスをコピー"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

function middleEllipsis(s: string, max: number) {
  if (s.length <= max) return s;
  const keep = Math.floor((max - 3) / 2);
  return `${s.slice(0, keep)}...${s.slice(-keep)}`;
}

export default function FilePaths() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        ファイルパスを画面に出すときの表示・省略・補完パターン。長いパスを「読みやすく、見失わせず、すぐコピーできる」のがゴール。
      </p>

      <Frame label="省略パターン" note="幅制約のあるリスト・テーブルセルで使う">
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-[8rem_1fr] gap-3 items-center">
            <div className="text-xs text-zinc-500 font-mono">フル</div>
            <div className="font-mono text-zinc-700 break-all">{FULL_PATH}</div>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-3 items-center">
            <div className="text-xs text-zinc-500 font-mono">後ろ省略</div>
            <div className="font-mono text-zinc-700 truncate max-w-md">{FULL_PATH}</div>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-3 items-center">
            <div className="text-xs text-zinc-500 font-mono">前省略</div>
            <div
              className="font-mono text-zinc-700 truncate max-w-md"
              dir="rtl"
              style={{ textAlign: "left" }}
            >
              {"‎" + FULL_PATH}
            </div>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-3 items-center">
            <div className="text-xs text-zinc-500 font-mono">中央省略</div>
            <div className="font-mono text-zinc-700">{middleEllipsis(FULL_PATH, 40)}</div>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-3 items-center">
            <div className="text-xs text-zinc-500 font-mono">フォルダのみ + ファイル太字</div>
            <div className="font-mono text-zinc-500 truncate max-w-md">
              /Users/dev/Documents/Projects/myapp/src/components/ui/
              <span className="text-zinc-900 font-semibold">Button.tsx</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 mt-4">
          中央省略は「先頭の context
          (どのプロジェクトか)」と「末尾のファイル名」両方が見えるので、リスト表示で最も読みやすい。
        </div>
      </Frame>

      <Frame label="hover でフルパス表示 (Tooltip)" note="リストで省略しつつ、必要なら見せる">
        <div className="space-y-2 max-w-md">
          {[
            FULL_PATH,
            "/var/log/system/2026-01-01-application-error.log",
            "/home/dev/repos/long-org-name/very-deep-monorepo/packages/ui/src/index.tsx",
          ].map((p, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-200 hover:border-zinc-400 transition"
            >
              <File className="w-4 h-4 text-zinc-400 shrink-0" />
              <span className="font-mono text-xs text-zinc-700 truncate flex-1">{p}</span>
              <span className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] text-white font-mono z-10">
                {p}
              </span>
              <CopyableInline path={p} />
            </div>
          ))}
        </div>
      </Frame>

      <Frame label="hover で展開 (リストの行が広がる)" note="Tooltip が出る場所が狭い時">
        <div className="space-y-2 max-w-md">
          {[FULL_PATH, "/var/log/system/2026-01-01-application-error.log"].map((p, i) => (
            <div key={i} className="px-3 py-2 rounded-md border border-zinc-200 group">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="font-mono text-xs text-zinc-700 truncate group-hover:hidden flex-1">
                  {p}
                </span>
                <span className="font-mono text-xs text-zinc-700 hidden group-hover:block flex-1 break-all">
                  {p}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Frame>

      <Frame label="Breadcrumb 表示" note="セグメントごとに辿れる・クリック可能">
        <nav className="flex items-center gap-1 text-sm flex-wrap">
          {["~", "Documents", "Projects", "myapp", "src", "components", "ui"].map((seg, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />}
              <button
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-zinc-100 ${
                  i === arr.length - 1 ? "text-zinc-900 font-medium" : "text-zinc-500"
                }`}
              >
                {i < arr.length - 1 && (
                  <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                )}
                {seg}
              </button>
            </span>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <span className="flex items-center gap-1 text-zinc-900 font-semibold ml-1">
            <File className="w-3.5 h-3.5 text-zinc-500" />
            Button.tsx
          </span>
        </nav>
      </Frame>

      <Frame label="Breadcrumb (長いとき省略 + ホバー展開)" note="深い階層で幅が足りないときの定番">
        <div className="group relative flex items-center gap-1 text-sm">
          <button className="text-zinc-500 hover:text-zinc-900">~</button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <button className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded px-1.5 py-0.5">
            ...
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <button className="text-zinc-500 hover:text-zinc-900">src</button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <button className="text-zinc-500 hover:text-zinc-900">components</button>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-zinc-900 font-medium">Button.tsx</span>

          <div className="opacity-0 group-hover:opacity-100 transition absolute top-7 left-12 bg-white border border-zinc-200 rounded-md shadow-lg py-1 min-w-32 z-10">
            <div className="px-3 py-1.5 text-xs text-zinc-500">省略箇所</div>
            {["Documents", "Projects", "myapp"].map((s) => (
              <button
                key={s}
                className="block w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-100 flex items-center gap-1.5"
              >
                <Folder className="w-3 h-3 text-amber-500 fill-amber-100" />
                {s}
              </button>
            ))}
          </div>
        </div>
      </Frame>

      <Frame label="セパレータの色分け / クリックでコピー" note="開発系UIで多い (Notion / GitHub)">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 font-mono text-sm">
            <span className="text-zinc-400">/Users/dev</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400">Documents</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400">Projects</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-700">myapp</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-700">src</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-semibold">Button.tsx</span>
          </div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-zinc-100 font-mono text-xs">
            <span className="text-zinc-700">{FULL_PATH}</span>
            <CopyableInline path={FULL_PATH} />
          </div>
        </div>
      </Frame>

      <Frame label="ワイルドカード / 変数表記" note="設定UI・テンプレートで使う">
        <div className="space-y-2 font-mono text-sm">
          <div>
            <span className="text-zinc-500">/var/log/</span>
            <span className="bg-amber-100 text-amber-900 px-1 rounded">{"{service}"}</span>
            <span className="text-zinc-500">/</span>
            <span className="bg-amber-100 text-amber-900 px-1 rounded">{"{date}"}</span>
            <span className="text-zinc-500">.log</span>
          </div>
          <div>
            <span className="text-zinc-500">src/</span>
            <span className="bg-zinc-200 text-zinc-700 px-1 rounded">**</span>
            <span className="text-zinc-500">/*.test.</span>
            <span className="bg-zinc-200 text-zinc-700 px-1 rounded">{"{ts,tsx}"}</span>
          </div>
        </div>
      </Frame>

      <Frame label="状態付きパス" note="不在 / 削除済 / 読込中 などの表記">
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <File className="w-3.5 h-3.5 text-zinc-400" />
            <span className="line-through text-zinc-400">/Users/dev/Documents/old-file.txt</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-sans">
              削除済
            </span>
          </div>
          <div className="flex items-center gap-2">
            <File className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-rose-600">/Users/dev/missing/file.txt</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-sans">
              ファイルが見つかりません
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-3.5 h-3.5 border border-zinc-300 border-t-zinc-700 rounded-full animate-spin" />
            <span>解決中...</span>
          </div>
        </div>
      </Frame>
    </div>
  );
}
