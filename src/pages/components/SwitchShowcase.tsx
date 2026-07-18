import { useState } from "react";
import { Bell, Loader2, Moon, Sun } from "lucide-react";

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
      <div className="p-5 flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Sw({
  value,
  onChange,
  className = "",
  knob = "",
  size = "md",
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  knob?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sz = {
    sm: { w: 32, h: 18, t: 14, off: 2, on: 14 },
    md: { w: 44, h: 24, t: 20, off: 2, on: 20 },
    lg: { w: 56, h: 30, t: 26, off: 2, on: 26 },
  }[size];
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative rounded-full transition-all ${className}`}
      style={{ width: sz.w, height: sz.h }}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-all ${knob}`}
        style={{
          width: sz.t,
          height: sz.t,
          left: value ? sz.on : sz.off,
        }}
      />
    </button>
  );
}

export default function SwitchShowcase() {
  const [vals, setVals] = useState({
    a: true,
    b: false,
    c: true,
    d: false,
    e: true,
    f: false,
    g: true,
    h: false,
    i: true,
    j: false,
  });
  const set = (k: keyof typeof vals, v: boolean) => setVals((s) => ({ ...s, [k]: v }));

  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Default (zinc)" note="標準。zinc系">
        <Sw
          value={vals.a}
          onChange={(v) => set("a", v)}
          className={vals.a ? "bg-zinc-900" : "bg-zinc-300"}
          knob="bg-white shadow-sm"
        />
        <span className="text-sm text-zinc-600">通知</span>
      </Frame>

      <Frame label="2. Sizes" note="sm / md / lg">
        <Sw
          value={vals.b}
          onChange={(v) => set("b", v)}
          className={vals.b ? "bg-zinc-900" : "bg-zinc-300"}
          knob="bg-white"
          size="sm"
        />
        <Sw
          value={vals.b}
          onChange={(v) => set("b", v)}
          className={vals.b ? "bg-zinc-900" : "bg-zinc-300"}
          knob="bg-white"
          size="md"
        />
        <Sw
          value={vals.b}
          onChange={(v) => set("b", v)}
          className={vals.b ? "bg-zinc-900" : "bg-zinc-300"}
          knob="bg-white"
          size="lg"
        />
      </Frame>

      <Frame label="3. Color variants" note="意味付け">
        {[
          { id: "a", label: "success", on: "bg-emerald-500" },
          { id: "b", label: "warning", on: "bg-amber-500" },
          { id: "c", label: "danger", on: "bg-rose-500" },
          { id: "d", label: "info", on: "bg-blue-500" },
          { id: "e", label: "primary", on: "bg-violet-500" },
        ].map((v, i) => (
          <div key={v.id} className="flex items-center gap-2">
            <Sw
              value={[vals.a, vals.b, vals.c, vals.d, vals.e][i]}
              onChange={(val) => set(["a", "b", "c", "d", "e"][i] as keyof typeof vals, val)}
              className={[vals.a, vals.b, vals.c, vals.d, vals.e][i] ? v.on : "bg-zinc-300"}
              knob="bg-white"
            />
            <span className="text-xs text-zinc-500">{v.label}</span>
          </div>
        ))}
      </Frame>

      <Frame label="4. iOS style" note="柔らかい立体感 + 弾力">
        <button
          onClick={() => set("c", !vals.c)}
          className="relative w-14 h-8 rounded-full transition-colors duration-300"
          style={{
            background: vals.c ? "#34c759" : "#e9e9eb",
            boxShadow: "inset 0 0 1px rgba(0,0,0,0.1)",
          }}
        >
          <span
            className="absolute top-0.5 w-7 h-7 rounded-full bg-white transition-all duration-300"
            style={{
              left: vals.c ? 26 : 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.06)",
            }}
          />
        </button>
      </Frame>

      <Frame label="5. Track text (ON/OFF)" note="状態を明示">
        <button
          onClick={() => set("d", !vals.d)}
          className={`relative w-16 h-7 rounded-full transition-colors text-[10px] font-bold ${
            vals.d ? "bg-emerald-500 text-white" : "bg-zinc-300 text-zinc-600"
          }`}
        >
          <span className={`absolute top-1/2 -translate-y-1/2 ${vals.d ? "left-2" : "right-2"}`}>
            {vals.d ? "ON" : "OFF"}
          </span>
          <span
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all"
            style={{ left: vals.d ? 38 : 2 }}
          />
        </button>
      </Frame>

      <Frame label="6. Icons inside" note="夜/昼 のトグル">
        <button
          onClick={() => set("e", !vals.e)}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            vals.e ? "bg-indigo-900" : "bg-amber-300"
          }`}
        >
          <span className="absolute left-1.5 top-1/2 -translate-y-1/2">
            <Sun className={`w-3.5 h-3.5 ${vals.e ? "text-indigo-400" : "text-white"}`} />
          </span>
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <Moon className={`w-3.5 h-3.5 ${vals.e ? "text-white" : "text-amber-700"}`} />
          </span>
          <span
            className="absolute top-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center transition-all"
            style={{ left: vals.e ? 28 : 4 }}
          >
            {vals.e ? (
              <Moon className="w-3 h-3 text-indigo-900" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </span>
        </button>
      </Frame>

      <Frame label="7. Pill toggle (Android)" note="マテリアル">
        <button onClick={() => set("f", !vals.f)} className="relative inline-flex items-center">
          <span
            className={`block w-9 h-4 rounded-full transition-colors ${
              vals.f ? "bg-violet-300" : "bg-zinc-300"
            }`}
          />
          <span
            className={`absolute w-5 h-5 rounded-full shadow transition-all ${
              vals.f ? "bg-violet-600" : "bg-zinc-50"
            }`}
            style={{ left: vals.f ? 18 : -2 }}
          />
        </button>
      </Frame>

      <Frame label="8. Loading" note="非同期トグル">
        <LoadingSwitch />
      </Frame>

      <Frame label="9. Switch list (settings)" note="設定画面の定番">
        <ul className="rounded-md border border-zinc-200 divide-y divide-zinc-100 w-full max-w-md">
          {[
            { id: "g" as const, Icon: Bell, label: "通知を受け取る", sub: "プッシュ通知が届く" },
            { id: "h" as const, Icon: Moon, label: "ダークモード", sub: "夜間自動で切替" },
            { id: "i" as const, Icon: Sun, label: "使用統計の共有", sub: "匿名データを送る" },
          ].map((it) => (
            <li key={it.id} className="flex items-center gap-3 px-3 py-2.5">
              <it.Icon className="w-4 h-4 text-zinc-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">{it.label}</div>
                <div className="text-xs text-zinc-500">{it.sub}</div>
              </div>
              <Sw
                value={vals[it.id]}
                onChange={(v) => set(it.id, v)}
                className={vals[it.id] ? "bg-emerald-500" : "bg-zinc-300"}
                knob="bg-white"
              />
            </li>
          ))}
        </ul>
      </Frame>

      <Frame label="10. Disabled" note="操作不可">
        <Sw
          value={true}
          onChange={() => {}}
          className="bg-zinc-200 opacity-50 cursor-not-allowed"
          knob="bg-white"
        />
        <Sw
          value={false}
          onChange={() => {}}
          className="bg-zinc-200 opacity-50 cursor-not-allowed"
          knob="bg-white"
        />
      </Frame>
    </div>
  );
}

function LoadingSwitch() {
  const [val, setVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      setVal((v) => !v);
      setLoading(false);
    }, 800);
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        val ? "bg-emerald-500" : "bg-zinc-300"
      }`}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center transition-all"
        style={{ left: val ? 22 : 2 }}
      >
        {loading && <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />}
      </span>
    </button>
  );
}
