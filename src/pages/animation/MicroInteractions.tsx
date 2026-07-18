import { useState } from "react";
import { Heart } from "lucide-react";

export default function MicroInteractions() {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);

  const copy = () => {
    navigator.clipboard?.writeText("https://example.com/share/abc").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onLike = () => {
    setLiked((v) => !v);
    setCount((c) => c + (liked ? -1 : 1));
  };

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700">
        ユーザーの操作に対する小さなフィードバック。「反応してる」感覚を作り、操作の成功を伝える。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Like button (pop)</div>
          <div className="flex items-center gap-3">
            <button onClick={onLike} className="select-none active:scale-90 transition-transform">
              <span
                key={liked ? "on" : "off"}
                className={liked ? "inline-block animate-pop" : "inline-block"}
              >
                <Heart
                  className={liked ? "w-8 h-8 text-red-500 fill-red-500" : "w-8 h-8 text-zinc-400"}
                />
              </span>
            </button>
            <div className="text-sm text-zinc-600 tabular-nums">{count}</div>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">animate-pop on toggle</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Copy with checkmark</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-md bg-zinc-100 text-xs font-mono">
              https://example.com/share/abc
            </code>
            <button
              onClick={copy}
              className="w-20 h-10 rounded-md bg-zinc-900 text-white text-sm font-medium relative overflow-hidden"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                  copied ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
                }`}
              >
                Copy
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                  copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                ✓
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Checkbox check animation</div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                checked ? "bg-emerald-500 border-emerald-500 scale-100" : "bg-white border-zinc-300"
              }`}
              onClick={() => setChecked((v) => !v)}
            >
              <span
                className={`text-white text-sm transition-transform duration-200 ${
                  checked ? "scale-100" : "scale-0"
                }`}
              >
                ✓
              </span>
            </span>
            <span className="text-sm text-zinc-700">利用規約に同意する</span>
          </label>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Active press</div>
          <div className="flex gap-2">
            <button className="px-4 h-10 rounded-md bg-zinc-900 text-white text-sm font-medium transition active:scale-95">
              押し込み
            </button>
            <button className="px-4 h-10 rounded-md bg-white border border-zinc-300 text-sm font-medium transition active:bg-zinc-100">
              色変化
            </button>
            <button className="px-4 h-10 rounded-md bg-blue-600 text-white text-sm font-medium transition active:translate-y-0.5 shadow-md active:shadow-sm">
              沈み込み
            </button>
          </div>
          <div className="text-xs text-zinc-500 mt-3 font-mono">active: variant</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Toggle switch (smooth)</div>
          <Toggle />
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="text-sm font-medium mb-3">Counter (tabular-nums)</div>
          <Counter />
        </div>
      </div>
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${
        on ? "bg-emerald-500" : "bg-zinc-300"
      }`}
    >
      <span
        className={`inline-block w-5 h-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Counter() {
  const [n, setN] = useState(0);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setN((v) => v - 1)}
        className="w-9 h-9 rounded-md border border-zinc-300 hover:bg-zinc-50 text-lg"
      >
        −
      </button>
      <div className="min-w-12 text-center text-xl font-semibold tabular-nums">{n}</div>
      <button
        onClick={() => setN((v) => v + 1)}
        className="w-9 h-9 rounded-md border border-zinc-300 hover:bg-zinc-50 text-lg"
      >
        +
      </button>
    </div>
  );
}
