import { useEffect, useRef, useState } from "react";
import {
  Upload,
  File as FileIcon,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  Pause,
  Play,
  FolderUp,
  Sparkles,
} from "lucide-react";

type LiveState = "queued" | "uploading" | "done" | "failed";
type LiveFile = {
  id: number;
  name: string;
  size: string;
  state: LiveState;
  progress: number;
  fail?: boolean;
};

const DEMO_PRESET: Omit<LiveFile, "state" | "progress">[] = [
  { id: 1, name: "design-mock-v2.png", size: "2.4 MB" },
  { id: 2, name: "spec.pdf", size: "3.1 MB" },
  { id: 3, name: "video-large.mp4", size: "8.7 MB", fail: true },
  { id: 4, name: "notes.md", size: "12 KB" },
];

function LiveDemo() {
  const [files, setFiles] = useState<LiveFile[] | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const reset = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setFiles(null);
  };

  const start = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];

    const queued: LiveFile[] = DEMO_PRESET.map((f) => ({
      ...f,
      state: "queued",
      progress: 0,
    }));
    setFiles(queued);

    queued.forEach((f, idx) => {
      const startDelay = 400 + idx * 600;
      timers.current.push(
        window.setTimeout(() => {
          setFiles(
            (prev) => prev?.map((x) => (x.id === f.id ? { ...x, state: "uploading" } : x)) ?? null,
          );
          const tick = () => {
            setFiles((prev) => {
              if (!prev) return prev;
              const target = prev.find((x) => x.id === f.id);
              if (!target || target.state !== "uploading") return prev;
              const next = Math.min(100, target.progress + 6 + Math.random() * 8);
              if (next >= 100) {
                return prev.map((x) =>
                  x.id === f.id
                    ? {
                        ...x,
                        progress: 100,
                        state: f.fail ? "failed" : "done",
                      }
                    : x,
                );
              }
              timers.current.push(window.setTimeout(tick, 120));
              return prev.map((x) => (x.id === f.id ? { ...x, progress: next } : x));
            });
          };
          tick();
        }, startDelay),
      );
    });
  };

  const retryFailed = () => {
    setFiles(
      (prev) =>
        prev?.map((x) => (x.state === "failed" ? { ...x, state: "queued", progress: 0 } : x)) ??
        null,
    );
    const failed = files?.filter((x) => x.state === "failed") ?? [];
    failed.forEach((f, idx) => {
      timers.current.push(
        window.setTimeout(
          () => {
            setFiles(
              (prev) =>
                prev?.map((x) => (x.id === f.id ? { ...x, state: "uploading" } : x)) ?? null,
            );
            const tick = () => {
              setFiles((prev) => {
                if (!prev) return prev;
                const target = prev.find((x) => x.id === f.id);
                if (!target || target.state !== "uploading") return prev;
                const next = Math.min(100, target.progress + 10);
                if (next >= 100) {
                  return prev.map((x) =>
                    x.id === f.id ? { ...x, progress: 100, state: "done" } : x,
                  );
                }
                timers.current.push(window.setTimeout(tick, 100));
                return prev.map((x) => (x.id === f.id ? { ...x, progress: next } : x));
              });
            };
            tick();
          },
          200 + idx * 200,
        ),
      );
    });
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev?.filter((x) => x.id !== id) ?? null);
  };

  const total = files?.length ?? 0;
  const done = files?.filter((x) => x.state === "done").length ?? 0;
  const failed = files?.filter((x) => x.state === "failed").length ?? 0;
  const allFinished = total > 0 && done + failed === total;

  return (
    <div className="rounded-lg border-2 border-zinc-900 bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">ライブシミュレーション</span>
        </div>
        {files && (
          <button onClick={reset} className="text-xs text-zinc-300 hover:text-white">
            リセット
          </button>
        )}
      </div>

      {!files && (
        <div className="p-6">
          <button
            onClick={start}
            className="block w-full border-2 border-dashed border-zinc-300 rounded-lg p-10 text-center hover:border-zinc-900 hover:bg-zinc-50 transition group"
          >
            <Upload className="w-10 h-10 text-zinc-400 group-hover:text-zinc-900 mx-auto transition" />
            <div className="mt-3 text-sm font-medium">
              クリックして4ファイルのアップロードをシミュレート
            </div>
            <div className="text-xs text-zinc-500 mt-1">1つはわざと失敗します (再試行可)</div>
          </button>
        </div>
      )}

      {files && (
        <div>
          <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between text-sm">
              <span>
                <b>
                  {done + failed} / {total}
                </b>{" "}
                ファイル
                {failed > 0 && <span className="text-rose-600 ml-2">{failed} 件失敗</span>}
              </span>
              <span className="text-xs text-zinc-500 tabular-nums">
                {Math.round(files.reduce((s, f) => s + f.progress, 0) / total)}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  allFinished && failed === 0
                    ? "bg-emerald-500"
                    : allFinished
                      ? "bg-amber-500"
                      : "bg-blue-500"
                }`}
                style={{
                  width: `${files.reduce((s, f) => s + f.progress, 0) / total}%`,
                }}
              />
            </div>
          </div>
          <ul className="p-2">
            {files.map((f) => (
              <li key={f.id} className="flex items-center gap-3 px-3 py-2 rounded-md">
                <div className="w-9 h-10 rounded bg-zinc-100 flex items-center justify-center shrink-0">
                  <FileIcon className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm truncate">{f.name}</span>
                    <span className="text-xs text-zinc-500 shrink-0 tabular-nums">{f.size}</span>
                  </div>
                  {f.state === "uploading" && (
                    <div className="mt-1 h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  )}
                  {f.state === "queued" && (
                    <div className="text-[11px] text-zinc-500 mt-0.5">待機中...</div>
                  )}
                  {f.state === "failed" && (
                    <div className="text-[11px] text-rose-600 mt-0.5">ネットワークエラー</div>
                  )}
                  {f.state === "done" && (
                    <div className="text-[11px] text-emerald-600 mt-0.5">アップロード完了</div>
                  )}
                </div>
                <div className="shrink-0 w-8 flex justify-end">
                  {f.state === "done" && <Check className="w-4 h-4 text-emerald-500" />}
                  {f.state === "failed" && <AlertCircle className="w-4 h-4 text-rose-500" />}
                  {(f.state === "queued" || f.state === "uploading") && (
                    <button
                      onClick={() => removeFile(f.id)}
                      className="text-zinc-400 hover:text-zinc-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {allFinished && failed > 0 && (
            <div className="px-4 py-3 border-t border-zinc-200 bg-amber-50 flex justify-between items-center">
              <span className="text-xs text-amber-900">{failed} 件が失敗しました</span>
              <button
                onClick={retryFailed}
                className="text-xs px-3 h-7 rounded-md bg-rose-600 text-white font-medium flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" />
                失敗のみ再試行
              </button>
            </div>
          )}
        </div>
      )}
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
      <div className="p-5">{children}</div>
    </div>
  );
}

function FileLine({
  name,
  size,
  state,
  progress,
}: {
  name: string;
  size: string;
  state: "queued" | "uploading" | "done" | "failed" | "paused";
  progress?: number;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-50">
      <div className="w-9 h-10 rounded bg-zinc-100 flex items-center justify-center shrink-0">
        <FileIcon className="w-4 h-4 text-zinc-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm truncate">{name}</span>
          <span className="text-xs text-zinc-500 shrink-0">{size}</span>
        </div>
        {(state === "uploading" || state === "paused") && progress !== undefined && (
          <div className="mt-1 h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                state === "uploading" ? "bg-blue-500" : "bg-zinc-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {state === "queued" && <div className="text-[11px] text-zinc-500 mt-0.5">待機中...</div>}
        {state === "failed" && (
          <div className="text-[11px] text-rose-600 mt-0.5">ネットワークエラー</div>
        )}
      </div>
      <div className="shrink-0">
        {state === "queued" && (
          <button className="text-zinc-400 hover:text-zinc-700">
            <X className="w-4 h-4" />
          </button>
        )}
        {state === "uploading" && (
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
              <Pause className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {state === "paused" && (
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
              <Play className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {state === "done" && <Check className="w-4 h-4 text-emerald-500" />}
        {state === "failed" && (
          <button className="w-7 h-7 rounded text-rose-500 hover:bg-rose-50 flex items-center justify-center">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function UploadFlow() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        アップロードUIの状態遷移。上はクリックで実際に動くシミュレーション、下は各状態のスナップショット。
      </p>

      <LiveDemo />

      <Frame label="ドロップエリア (アイドル)">
        <label className="block max-w-md mx-auto border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center hover:border-zinc-400 cursor-pointer transition">
          <input type="file" multiple className="hidden" />
          <Upload className="w-8 h-8 text-zinc-400 mx-auto" />
          <div className="mt-2 text-sm font-medium">ファイルをドロップ or クリックして選択</div>
          <div className="text-xs text-zinc-500 mt-1">最大 50MB · 同時に20ファイルまで</div>
        </label>
      </Frame>

      <Frame label="ドラッグ中 (ハイライト)" note="ドラッグオーバーで色とアイコンが変わる">
        <div
          onMouseEnter={() => setDragOver(true)}
          onMouseLeave={() => setDragOver(false)}
          className={`max-w-md mx-auto border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-zinc-300"
          }`}
        >
          <div className={dragOver ? "animate-bounce" : ""}>
            <Upload className={`w-8 h-8 mx-auto ${dragOver ? "text-blue-500" : "text-zinc-400"}`} />
          </div>
          <div className={`mt-2 text-sm font-medium ${dragOver ? "text-blue-900" : ""}`}>
            {dragOver ? "ここに離して送信" : "(マウスを乗せるとドラッグ中UIに切替)"}
          </div>
          <div className={`text-xs mt-1 ${dragOver ? "text-blue-700" : "text-zinc-500"}`}>
            {dragOver ? "3 ファイルを追加します" : "PNG, JPG, PDF (10MBまで)"}
          </div>
        </div>
      </Frame>

      <Frame label="フォルダごとアップロード" note="webkitdirectory 対応の指示">
        <div className="max-w-md mx-auto rounded-lg border border-zinc-200 p-6 text-center">
          <FolderUp className="w-10 h-10 text-zinc-400 mx-auto" />
          <div className="mt-2 text-sm font-medium">フォルダを丸ごとアップロード</div>
          <div className="text-xs text-zinc-500 mt-1">フォルダ構造を保ったまま転送</div>
          <div className="mt-4 flex justify-center gap-2">
            <button className="px-3 h-9 rounded-md bg-zinc-900 text-white text-sm">
              フォルダを選択
            </button>
            <button className="px-3 h-9 rounded-md border border-zinc-300 text-sm">
              ファイルを選択
            </button>
          </div>
        </div>
      </Frame>

      <Frame label="キュー (アップロード前)" note="選択後、まだ送信していない状態">
        <div className="rounded-lg border border-zinc-200 max-w-2xl">
          <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <div className="text-sm">
              <b>3 ファイル</b> を送信 · 合計 8.4 MB
            </div>
            <div className="flex gap-2">
              <button className="text-xs text-zinc-500 hover:text-zinc-900">
                すべてキャンセル
              </button>
              <button className="text-xs px-2 py-0.5 rounded bg-zinc-900 text-white">
                アップロード開始
              </button>
            </div>
          </div>
          <div className="p-2">
            <FileLine name="design-spec-v2.pdf" size="2.4 MB" state="queued" />
            <FileLine name="hero-image.png" size="3.1 MB" state="queued" />
            <FileLine name="notes.md" size="2.9 MB" state="queued" />
          </div>
        </div>
      </Frame>

      <Frame label="アップロード中 (個別進捗)">
        <div className="rounded-lg border border-zinc-200 max-w-2xl">
          <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between text-sm">
              <span>
                <b>2 / 3</b> ファイル · 全体 64%
              </span>
              <span className="text-xs text-zinc-500">残り 12秒</span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: "64%" }} />
            </div>
          </div>
          <div className="p-2">
            <FileLine name="design-spec-v2.pdf" size="2.4 MB" state="done" />
            <FileLine name="hero-image.png" size="3.1 MB" state="uploading" progress={45} />
            <FileLine name="notes.md" size="2.9 MB" state="queued" />
          </div>
        </div>
      </Frame>

      <Frame label="一時停止 / 再開" note="モバイル環境などで">
        <div className="rounded-lg border border-zinc-200 max-w-2xl">
          <div className="p-2">
            <FileLine name="presentation.key" size="42.0 MB" state="paused" progress={30} />
          </div>
        </div>
      </Frame>

      <Frame label="完了 (全成功)">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 max-w-2xl">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-emerald-900">
                3 ファイルすべてアップロード完了
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">合計 8.4 MB · 8秒</div>
            </div>
            <button className="text-sm text-emerald-700 underline">共有リンクを取得</button>
          </div>
        </div>
      </Frame>

      <Frame label="一部失敗 (混在状態)" note="再試行ボタンを個別に">
        <div className="rounded-lg border border-zinc-200 max-w-2xl">
          <div className="px-4 py-3 border-b border-zinc-200 bg-amber-50 text-sm text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />2 / 3 ファイルが完了 · 1 件が失敗
          </div>
          <div className="p-2">
            <FileLine name="design-spec-v2.pdf" size="2.4 MB" state="done" />
            <FileLine name="hero-image.png" size="3.1 MB" state="done" />
            <FileLine name="notes.md" size="2.9 MB" state="failed" />
          </div>
          <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 flex justify-end gap-2">
            <button className="text-xs text-zinc-500">失敗を取り除く</button>
            <button className="text-xs px-2 py-0.5 rounded bg-rose-600 text-white">
              失敗のみ再試行
            </button>
          </div>
        </div>
      </Frame>

      <Frame label="検証エラー (送信前)" note="サイズ・形式・件数オーバー">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-sm">
            <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-rose-900">video.mp4 は大きすぎます</div>
              <div className="text-xs text-rose-700 mt-0.5">
                上限 50MB に対して 124MB · 分割または圧縮してください
              </div>
            </div>
            <button className="text-rose-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-sm">
            <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-rose-900">config.exe は許可されていません</div>
              <div className="text-xs text-rose-700 mt-0.5">許可: PNG, JPG, PDF, ZIP のみ</div>
            </div>
            <button className="text-rose-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Frame>

      <Frame label="クォータ表示" note="残容量・使用量バー">
        <div className="rounded-lg border border-zinc-200 max-w-md p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">ストレージ</span>
            <span className="text-zinc-500">
              7.8 GB / <b>10.0 GB</b>
            </span>
          </div>
          <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 transition-all" style={{ width: "78%" }} />
          </div>
          <div className="text-xs text-zinc-500 mt-2">残り 2.2 GB · このアップロード後 7.84 GB</div>
        </div>
      </Frame>
    </div>
  );
}
