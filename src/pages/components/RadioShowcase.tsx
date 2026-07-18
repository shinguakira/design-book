import { useState } from "react";
import { Check, Smartphone, Tablet, Monitor } from "lucide-react";

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

export default function RadioShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Default native" note="シンプル">
        <Default />
      </Frame>

      <Frame label="2. Custom drawn" note="完全自前">
        <Custom />
      </Frame>

      <Frame label="3. Segmented pills" note="排他的、横並びの強">
        <Segmented />
      </Frame>

      <Frame label="4. Radio cards" note="大きく見せる選択">
        <Cards />
      </Frame>

      <Frame label="5. Icon cards" note="アイコン中心の選択">
        <IconCards />
      </Frame>

      <Frame label="6. Color radio" note="テーマ色選択">
        <ColorRadio />
      </Frame>

      <Frame label="7. With description" note="詳細を併記">
        <WithDesc />
      </Frame>

      <Frame label="8. Tile (image)" note="画像 + ラベル">
        <ImageTile />
      </Frame>

      <Frame label="9. Inline" note="1行に複数選択肢">
        <Inline />
      </Frame>

      <Frame label="10. Disabled" note="操作不可">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
            <input type="radio" disabled className="w-4 h-4" />
            <span className="text-sm">無効</span>
          </label>
          <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
            <input type="radio" checked readOnly disabled className="w-4 h-4 accent-zinc-900" />
            <span className="text-sm">無効 (選択中)</span>
          </label>
        </div>
      </Frame>
    </div>
  );
}

function Default() {
  const [v, setV] = useState("monthly");
  return (
    <div className="space-y-1.5">
      {[
        { id: "monthly", label: "月額プラン (¥980)" },
        { id: "yearly", label: "年額プラン (¥9,800、2ヶ月分お得)" },
        { id: "lifetime", label: "買い切り (¥29,800)" },
      ].map((o) => (
        <label key={o.id} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="plan-default"
            checked={v === o.id}
            onChange={() => setV(o.id)}
            className="w-4 h-4 accent-zinc-900"
          />
          <span className="text-sm">{o.label}</span>
        </label>
      ))}
    </div>
  );
}

function Custom() {
  const [v, setV] = useState("b");
  return (
    <div className="space-y-2">
      {[
        { id: "a", label: "Option A" },
        { id: "b", label: "Option B (selected)" },
        { id: "c", label: "Option C" },
      ].map((o) => (
        <button key={o.id} onClick={() => setV(o.id)} className="flex items-center gap-3 group">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition ${
              v === o.id ? "border-blue-600" : "border-zinc-300 group-hover:border-zinc-500"
            }`}
          >
            {v === o.id && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
          </span>
          <span className="text-sm">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function Segmented() {
  const [v, setV] = useState<"week" | "month" | "year">("month");
  const opts = [
    { id: "week" as const, label: "週" },
    { id: "month" as const, label: "月" },
    { id: "year" as const, label: "年" },
  ];
  return (
    <div className="inline-flex bg-zinc-100 rounded-md p-0.5">
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => setV(o.id)}
          className={`px-4 h-8 rounded text-sm font-medium transition ${
            v === o.id ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Cards() {
  const [v, setV] = useState("pro");
  const plans = [
    { id: "free", name: "Free", price: "¥0", desc: "個人利用" },
    { id: "pro", name: "Pro", price: "¥1,200", desc: "月1万リクエスト", popular: true },
    { id: "team", name: "Team", price: "¥4,800", desc: "チーム共有" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl">
      {plans.map((p) => {
        const on = v === p.id;
        return (
          <label
            key={p.id}
            className={`relative cursor-pointer rounded-lg border-2 p-3 transition ${
              on
                ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900/10"
                : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <input
              type="radio"
              name="plan"
              checked={on}
              onChange={() => setV(p.id)}
              className="sr-only"
            />
            {p.popular && (
              <span className="absolute -top-2 left-3 inline-block px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">
                人気
              </span>
            )}
            {on && (
              <Check className="absolute top-2 right-2 w-4 h-4 text-zinc-900 bg-white rounded-full p-0.5" />
            )}
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="text-lg font-bold mt-0.5 tabular-nums">
              {p.price}
              <span className="text-xs font-normal text-zinc-500">/月</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">{p.desc}</div>
          </label>
        );
      })}
    </div>
  );
}

function IconCards() {
  const [v, setV] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const opts = [
    { id: "mobile" as const, Icon: Smartphone, label: "モバイル" },
    { id: "tablet" as const, Icon: Tablet, label: "タブレット" },
    { id: "desktop" as const, Icon: Monitor, label: "デスクトップ" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 max-w-md">
      {opts.map((o) => {
        const on = v === o.id;
        return (
          <label
            key={o.id}
            className={`flex flex-col items-center gap-2 cursor-pointer rounded-lg border-2 py-4 transition ${
              on ? "border-blue-600 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <input
              type="radio"
              name="device"
              checked={on}
              onChange={() => setV(o.id)}
              className="sr-only"
            />
            <o.Icon className={`w-7 h-7 ${on ? "text-blue-600" : "text-zinc-500"}`} />
            <span className={`text-xs font-medium ${on ? "text-blue-900" : "text-zinc-600"}`}>
              {o.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function ColorRadio() {
  const [v, setV] = useState("#3b82f6");
  const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#18181b"];
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setV(c)}
          className={`w-9 h-9 rounded-full transition ${
            v === c ? "ring-2 ring-offset-2 ring-zinc-900" : ""
          }`}
          style={{ background: c }}
        >
          {v === c && <Check className="w-4 h-4 text-white mx-auto drop-shadow" />}
        </button>
      ))}
      <code className="ml-3 text-xs text-zinc-500 font-mono">{v}</code>
    </div>
  );
}

function WithDesc() {
  const [v, setV] = useState("public");
  const opts = [
    { id: "public", label: "公開", desc: "誰でも閲覧可能" },
    { id: "org", label: "組織内", desc: "メンバーのみ閲覧可" },
    { id: "private", label: "非公開", desc: "自分のみ" },
  ];
  return (
    <div className="space-y-2 max-w-md">
      {opts.map((o) => {
        const on = v === o.id;
        return (
          <label
            key={o.id}
            className={`flex items-start gap-3 p-3 rounded-md border-2 cursor-pointer transition ${
              on ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                on ? "border-zinc-900" : "border-zinc-300"
              }`}
            >
              {on && <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />}
            </span>
            <div>
              <div className="text-sm font-semibold">{o.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{o.desc}</div>
            </div>
            <input
              type="radio"
              name="visibility"
              checked={on}
              onChange={() => setV(o.id)}
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}

function ImageTile() {
  const [v, setV] = useState("b");
  const themes = [
    { id: "a", gradient: "from-pink-400 to-rose-500" },
    { id: "b", gradient: "from-blue-400 to-violet-500" },
    { id: "c", gradient: "from-emerald-400 to-teal-500" },
    { id: "d", gradient: "from-amber-400 to-orange-500" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl">
      {themes.map((t) => {
        const on = v === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setV(t.id)}
            className={`relative rounded-lg overflow-hidden h-20 transition-all ${
              on ? "ring-2 ring-offset-2 ring-zinc-900 scale-[1.02]" : ""
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
            {on && (
              <Check className="absolute top-1.5 right-1.5 w-4 h-4 text-white bg-zinc-900/40 rounded-full p-0.5 backdrop-blur" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Inline() {
  const [v, setV] = useState("m");
  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {sizes.map((s) => (
        <button
          key={s.id}
          onClick={() => setV(s.id)}
          className={`min-w-10 h-9 px-3 rounded-md border text-sm font-medium ${
            v === s.id
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white border-zinc-300 hover:border-zinc-500"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
