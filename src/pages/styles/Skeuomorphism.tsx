import { useState } from "react";
import { Power, Phone, Mail, FileText, MapPin, Plus, Minus, Star } from "lucide-react";

function Frame({
  label,
  note,
  children,
  span,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
  span?: boolean;
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
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ─── 1. Wood — shelf / tab nav ────────────────────── */
function WoodShelf() {
  const [active, setActive] = useState("Home");
  return (
    <div
      className="rounded-lg overflow-hidden p-4"
      style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 7px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 13px),
          linear-gradient(180deg, #a87740 0%, #7a4f23 100%)
        `,
        boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.45), inset 0 3px 6px rgba(255,255,255,0.15)",
      }}
    >
      <div className="flex gap-1.5 flex-wrap">
        {["Home", "Files", "Notes", "Settings"].map((tab) => {
          const on = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="px-4 py-1.5 rounded text-sm font-semibold text-amber-50 transition"
              style={{
                background: on
                  ? "linear-gradient(180deg, #f7d39e 0%, #c08953 100%)"
                  : "linear-gradient(180deg, #c89d6a 0%, #875a2c 100%)",
                boxShadow: on
                  ? "inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 1px rgba(0,0,0,0.5)"
                  : "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 4px rgba(0,0,0,0.5)",
                textShadow: "0 1px 1px rgba(0,0,0,0.5)",
                color: on ? "#5c2f0d" : "#fdf4e0",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div
        className="mt-3 text-xs text-amber-50"
        style={{ textShadow: "0 1px 1px rgba(0,0,0,0.7)" }}
      >
        Selected: {active}
      </div>
    </div>
  );
}

/* ─── 2. Leather — stitched textarea ────────────────────── */
function LeatherJournal() {
  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, #6b3f2e 0%, #4a2a1d 60%, #2c180f 100%)",
        boxShadow: "inset 0 0 0 2px #2c180f, inset 0 0 0 3px #936b4c, 0 6px 14px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="rounded p-3"
        style={{
          background: "linear-gradient(180deg, #faf3df 0%, #ecd8a9 100%)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.3)",
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent 0 22px, rgba(120,80,40,0.25) 22px 23px),
            linear-gradient(180deg, #faf3df 0%, #ecd8a9 100%)
          `,
        }}
      >
        <div className="text-xs text-amber-800 font-semibold mb-2 italic">
          Daily Journal · {new Date().toLocaleDateString("ja-JP")}
        </div>
        <textarea
          rows={4}
          defaultValue={"今日は良い1日だった。\n午後のミーティングが順調に進んだ。"}
          className="w-full bg-transparent outline-none font-serif text-sm text-amber-900 leading-[23px] resize-none"
        />
      </div>
      <div className="flex justify-end mt-3 gap-1.5">
        <button
          className="px-3 h-8 rounded text-xs font-semibold text-amber-50"
          style={{
            background: "linear-gradient(180deg, #936b4c 0%, #5b3a23 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 3px rgba(0,0,0,0.5)",
            textShadow: "0 1px 1px rgba(0,0,0,0.5)",
          }}
        >
          保存
        </button>
      </div>
    </div>
  );
}

/* ─── 3. Brass — volume knob slider ────────────────────── */
function BrassKnob() {
  const [value, setValue] = useState(35);
  const angle = -135 + (value / 100) * 270;
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-lg"
      style={{
        background: "radial-gradient(circle at 30% 30%, #444 0%, #1a1a1a 80%)",
        boxShadow: "inset 0 0 0 1px #000, inset 0 2px 4px rgba(255,255,255,0.05)",
      }}
    >
      <div className="relative" style={{ width: 110, height: 110 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #fdebb0 0%, #e2b65c 30%, #a87a2c 65%, #5f4416 100%)",
            boxShadow:
              "inset 0 -8px 12px rgba(0,0,0,0.5), inset 0 4px 8px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.6)",
          }}
        />
        <div
          className="absolute inset-3 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #f7d785 0%, #b08230 100%)",
            boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.4)",
            transform: `rotate(${angle}deg)`,
            transition: "transform 120ms ease",
          }}
        >
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full"
            style={{
              background: "linear-gradient(180deg, #fff 0%, #8b3e1a 100%)",
              boxShadow: "0 0 4px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-32 accent-amber-500"
      />
      <div
        className="font-mono text-amber-100 text-xs tabular-nums tracking-widest"
        style={{ textShadow: "0 0 4px #ffaa00" }}
      >
        VOL · {String(value).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ─── 4. Vintage calculator ────────────────────── */
function VintageCalculator() {
  const [display, setDisplay] = useState("0");
  const press = (k: string) => {
    setDisplay((d) => {
      if (k === "C") return "0";
      if (d === "0") return k;
      return d + k;
    });
  };
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "="];
  return (
    <div
      className="rounded-2xl p-3 mx-auto"
      style={{
        width: 220,
        background: "linear-gradient(180deg, #8a8478 0%, #5f5a4f 100%)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 6px 14px rgba(0,0,0,0.45)",
      }}
    >
      <div
        className="rounded mb-3 px-3 py-2 text-right font-mono text-2xl tabular-nums tracking-widest"
        style={{
          background: "linear-gradient(180deg, #4a5b3a 0%, #6b8055 100%)",
          color: "#0e1808",
          textShadow: "0 1px 0 rgba(255,255,255,0.25)",
          boxShadow: "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {display}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className="h-9 rounded text-sm font-bold text-zinc-100"
            style={{
              background:
                k === "=" || k === "C"
                  ? "linear-gradient(180deg, #b56b3b 0%, #7a3f1c 100%)"
                  : "linear-gradient(180deg, #2f3035 0%, #14151a 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 3px rgba(0,0,0,0.5)",
              textShadow: "0 1px 1px rgba(0,0,0,0.7)",
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 5. Felt — game-board switches ────────────────────── */
function FeltSwitches() {
  const [vals, setVals] = useState({ music: true, alert: false, autosave: true });
  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "radial-gradient(ellipse at center, #1f6a3e 0%, #0e3f24 100%)",
        boxShadow: "inset 0 0 0 4px #5a3215, inset 0 0 0 6px #2c180f, 0 6px 12px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="text-xs text-emerald-200 uppercase tracking-widest mb-3 font-semibold"
        style={{ textShadow: "0 1px 1px rgba(0,0,0,0.7)" }}
      >
        Settings · Casino
      </div>
      <ul className="space-y-2">
        {[
          { id: "music" as const, label: "BGM" },
          { id: "alert" as const, label: "Alert sound" },
          { id: "autosave" as const, label: "Auto save" },
        ].map((it) => {
          const on = vals[it.id];
          return (
            <li key={it.id} className="flex items-center gap-3">
              <div
                className="flex-1 text-sm text-emerald-50"
                style={{ textShadow: "0 1px 1px rgba(0,0,0,0.7)" }}
              >
                {it.label}
              </div>
              <button
                onClick={() => setVals((v) => ({ ...v, [it.id]: !v[it.id] }))}
                className="relative w-12 h-7 rounded-full flex items-center transition"
                style={{
                  background: on
                    ? "radial-gradient(circle at 30% 30%, #e74c3c 0%, #8b2a1f 100%)"
                    : "radial-gradient(circle at 30% 30%, #2a2a2a 0%, #050505 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="absolute w-5 h-5 rounded-full transition-all"
                  style={{
                    left: on ? 26 : 2,
                    background:
                      "radial-gradient(circle at 30% 30%, #fff 0%, #c4c4c4 60%, #6e6e6e 100%)",
                    boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── 6. Notebook page — todo ────────────────────── */
function NotebookPage() {
  const [items, setItems] = useState([
    { text: "朝のミーティング", done: true },
    { text: "デザインのレビュー", done: true },
    { text: "プルリクのチェック", done: false },
    { text: "ジムへ行く", done: false },
  ]);
  return (
    <div
      className="rounded p-4"
      style={{
        backgroundImage: `
          linear-gradient(90deg, transparent 38px, #d97775 38px 39px, transparent 39px),
          repeating-linear-gradient(180deg, transparent 0 24px, #b8d3e6 24px 25px),
          linear-gradient(180deg, #fdfbf2 0%, #f5efd9 100%)
        `,
        boxShadow:
          "inset 1px 0 0 rgba(0,0,0,0.1), 0 6px 14px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.15)",
        fontFamily: '"Caveat", "Comic Sans MS", cursive',
      }}
    >
      <div className="pl-12 leading-[25px]">
        <div className="text-amber-900 text-xs italic mb-2">
          今日やること - {new Date().toLocaleDateString("ja-JP")}
        </div>
        <ul>
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-2 text-zinc-700 text-base">
              <button
                onClick={() =>
                  setItems((arr) => arr.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))
                }
                className="w-4 h-4 border-2 border-zinc-600 rounded-sm flex items-center justify-center text-xs leading-none shrink-0"
                style={{ background: "#fdfbf2" }}
              >
                {it.done ? "✓" : ""}
              </button>
              <span className={it.done ? "line-through text-zinc-400" : ""}>{it.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── 7. Radio dial — frequency slider ────────────────────── */
function RadioDial() {
  const [freq, setFreq] = useState(80);
  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "linear-gradient(180deg, #2b1a10 0%, #4a2b1a 100%)",
        boxShadow: "inset 0 0 0 3px #6b4226, inset 0 0 0 5px #1a0e08, 0 4px 12px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="rounded h-12 px-3 relative overflow-hidden mb-3"
        style={{
          background: "linear-gradient(180deg, #f3e6a8 0%, #d6b974 100%)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <div className="flex justify-between items-end h-full pb-1 pt-2 text-[10px] font-mono text-amber-900 font-bold">
          {[76, 80, 84, 88, 92, 96, 100].map((m) => (
            <div key={m} className="flex flex-col items-center gap-0.5">
              <div className="w-px h-3 bg-amber-900" />
              <span>{m}</span>
            </div>
          ))}
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-rose-600"
          style={{
            left: `${((freq - 76) / 24) * 100}%`,
            boxShadow: "0 0 4px rgba(255,0,0,0.8)",
          }}
        />
      </div>
      <input
        type="range"
        min={76}
        max={100}
        step={0.1}
        value={freq}
        onChange={(e) => setFreq(parseFloat(e.target.value))}
        className="w-full accent-amber-500"
      />
      <div
        className="mt-2 text-center font-mono text-amber-200 text-sm tracking-wider"
        style={{ textShadow: "0 0 6px rgba(255,180,0,0.6)" }}
      >
        FM {freq.toFixed(1)} MHz
      </div>
    </div>
  );
}

/* ─── 8. Watch face — analog clock ────────────────────── */
function WatchFace() {
  const now = new Date();
  const h = (now.getHours() % 12) + now.getMinutes() / 60;
  const m = now.getMinutes();
  return (
    <div className="flex justify-center">
      <div
        className="relative rounded-full"
        style={{
          width: 180,
          height: 180,
          background: "radial-gradient(circle at 30% 25%, #f6f4ec 0%, #d1cabb 60%, #91897a 100%)",
          boxShadow:
            "inset 0 0 0 8px #d4d2c4, inset 0 0 0 10px #5f5a4f, inset 0 -8px 16px rgba(0,0,0,0.35), 0 8px 18px rgba(0,0,0,0.4)",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
          const a = ((n - 3) / 12) * Math.PI * 2;
          const r = 72;
          const x = 90 + Math.cos(a) * r;
          const y = 90 + Math.sin(a) * r;
          return (
            <div
              key={n}
              className="absolute -translate-x-1/2 -translate-y-1/2 font-serif font-bold text-zinc-800"
              style={{ left: x, top: y, fontSize: n === 12 ? 18 : 14 }}
            >
              {n}
            </div>
          );
        })}
        <div
          className="absolute left-1/2 top-1/2 w-1.5 origin-bottom rounded-t"
          style={{
            height: 40,
            background: "linear-gradient(180deg, #1a1a1a 0%, #5a5a5a 100%)",
            transform: `translate(-50%, -100%) rotate(${(h / 12) * 360}deg)`,
            transformOrigin: "50% 100%",
            boxShadow: "0 0 2px rgba(0,0,0,0.6)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-1 origin-bottom rounded-t"
          style={{
            height: 60,
            background: "linear-gradient(180deg, #1a1a1a 0%, #5a5a5a 100%)",
            transform: `translate(-50%, -100%) rotate(${(m / 60) * 360}deg)`,
            transformOrigin: "50% 100%",
            boxShadow: "0 0 2px rgba(0,0,0,0.6)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #b87333 0%, #5a3a16 100%)",
            boxShadow: "inset 0 -1px 1px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── 9. Power button — physical 3D toggle ────────────────────── */
function PowerButton() {
  const [on, setOn] = useState(false);
  return (
    <div
      className="rounded-lg p-6 flex justify-center"
      style={{
        background: "radial-gradient(circle at 30% 30%, #555 0%, #2a2a2a 80%)",
        boxShadow: "inset 0 0 0 1px #000, inset 0 2px 4px rgba(255,255,255,0.05)",
      }}
    >
      <button
        onClick={() => setOn((v) => !v)}
        className="relative rounded-full transition active:scale-95"
        style={{
          width: 90,
          height: 90,
          background: "radial-gradient(circle at 30% 30%, #ddd 0%, #888 60%, #444 100%)",
          boxShadow:
            "inset 0 -4px 8px rgba(0,0,0,0.5), inset 0 4px 8px rgba(255,255,255,0.5), 0 6px 12px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="absolute inset-3 rounded-full flex items-center justify-center"
          style={{
            background: on
              ? "radial-gradient(circle at 30% 30%, #ff6e6e 0%, #c01a1a 70%)"
              : "radial-gradient(circle at 30% 30%, #444 0%, #1a1a1a 70%)",
            boxShadow: on
              ? "inset 0 -2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,80,80,0.7)"
              : "inset 0 -2px 4px rgba(0,0,0,0.5)",
            transition: "all 200ms",
          }}
        >
          <Power
            className="w-8 h-8"
            style={{
              color: on ? "#fff" : "#888",
              filter: on ? "drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #ff8080)" : "none",
            }}
          />
        </div>
      </button>
    </div>
  );
}

/* ─── 10. Address book — leather + tabs ────────────────────── */
function AddressBook() {
  const contacts = [
    { name: "Taro Yamada", kind: "mail", value: "taro@example.com", Icon: Mail },
    { name: "Hanako Sato", kind: "tel", value: "03-1234-5678", Icon: Phone },
    { name: "Office HQ", kind: "addr", value: "Tokyo, Shibuya", Icon: MapPin },
    { name: "Project X", kind: "doc", value: "spec.pdf", Icon: FileText },
  ];
  return (
    <div
      className="rounded p-3"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, #8b3e1a 0%, #5a2010 60%, #2c1108 100%)",
        boxShadow:
          "inset 0 0 0 3px #5a2010, inset 0 0 0 4px rgba(255,200,150,0.18), 0 8px 16px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="rounded p-3"
        style={{
          background: "linear-gradient(180deg, #fffaea 0%, #ecd9a4 100%)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px #b8975f",
        }}
      >
        <div className="text-center font-serif italic text-amber-900 mb-2 font-bold tracking-wider">
          ADDRESS BOOK
        </div>
        <ul className="divide-y divide-amber-800/30">
          {contacts.map((c) => (
            <li key={c.name} className="py-1.5 flex items-center gap-3">
              <c.Icon className="w-4 h-4 text-amber-800" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-serif text-amber-900">{c.name}</div>
                <div className="text-[11px] font-mono text-amber-700 truncate">{c.value}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── 11. Stepper — metal physical ────────────────────── */
function MetalStepper() {
  const [n, setN] = useState(1);
  return (
    <div
      className="rounded-lg p-4 inline-flex items-center gap-2"
      style={{
        background: "linear-gradient(180deg, #cfcfcf 0%, #909090 100%)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.7), 0 4px 8px rgba(0,0,0,0.4)",
      }}
    >
      <button
        onClick={() => setN((v) => Math.max(0, v - 1))}
        className="w-10 h-10 rounded-md flex items-center justify-center active:scale-95"
        style={{
          background: "radial-gradient(circle at 30% 30%, #fff 0%, #ddd 50%, #888 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 3px rgba(0,0,0,0.4)",
        }}
      >
        <Minus className="w-4 h-4 text-zinc-700" />
      </button>
      <div
        className="w-14 h-10 rounded flex items-center justify-center font-mono text-lg font-bold tabular-nums"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #383838 100%)",
          color: "#7fff7f",
          textShadow: "0 0 6px rgba(127,255,127,0.7)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        {n}
      </div>
      <button
        onClick={() => setN((v) => v + 1)}
        className="w-10 h-10 rounded-md flex items-center justify-center active:scale-95"
        style={{
          background: "radial-gradient(circle at 30% 30%, #fff 0%, #ddd 50%, #888 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 3px rgba(0,0,0,0.4)",
        }}
      >
        <Plus className="w-4 h-4 text-zinc-700" />
      </button>
    </div>
  );
}

/* ─── 12. Marble — stat card ────────────────────── */
function MarbleCard() {
  return (
    <div
      className="rounded-lg p-5 text-center"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, rgba(0,0,0,0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 80% 30%, rgba(180,160,140,0.25) 0%, transparent 40%),
          linear-gradient(135deg, #f5efe6 0%, #e7ddd0 50%, #d4c8b6 100%)
        `,
        boxShadow:
          "inset 0 0 0 4px #b9a989, inset 0 0 0 6px #f5efe6, 0 8px 18px rgba(120,100,80,0.3)",
      }}
    >
      <div className="font-serif text-zinc-700 text-xs uppercase tracking-[0.3em] mb-2">
        Honor of the Year
      </div>
      <Star
        className="w-10 h-10 mx-auto text-amber-700"
        style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))" }}
      />
      <div className="font-serif text-2xl font-bold mt-2 text-zinc-800">山田 太郎</div>
      <div className="text-xs italic text-zinc-600 mt-1">2026</div>
    </div>
  );
}

export default function Skeuomorphism() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        現実の物の質感をそのまま UI に持ち込むスタイル。
        革・木目・金属感・ガラス・布・紙など、マテリアル別の例で「触りたくなる
        UI」のバリエーションを確認。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            向いてる
          </div>
          <ul className="list-disc pl-5 space-y-1 text-emerald-900">
            <li>初見でも触り方が分かる (本物のボタンに見える)</li>
            <li>世界観を強く演出 (ゲーム / エンタメ)</li>
            <li>リッチ・高級感を出しやすい</li>
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
            苦手なところ
          </div>
          <ul className="list-disc pl-5 space-y-1 text-rose-900">
            <li>時代遅れに見えるリスク</li>
            <li>装飾が多く情報密度を上げにくい</li>
            <li>デザイン / 実装コストが大きい</li>
            <li>スケールしにくい</li>
          </ul>
        </div>
      </div>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          マテリアル別 UI ギャラリー
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Frame label="1. 木目 (Wood)" note="本棚・引き出し・タブナビ">
            <WoodShelf />
          </Frame>
          <Frame label="2. 革 (Leather)" note="日記・手帳・テキスト入力">
            <LeatherJournal />
          </Frame>
          <Frame label="3. 真鍮 (Brass)" note="ボリュームダイヤル・スライダー">
            <BrassKnob />
          </Frame>
          <Frame label="4. ヴィンテージ電卓" note="プラスチック筐体 + LCD">
            <VintageCalculator />
          </Frame>
          <Frame label="5. フェルト (Felt)" note="カジノ・ゲーム盤・設定スイッチ">
            <FeltSwitches />
          </Frame>
          <Frame label="6. ノート紙" note="罫線 + 赤マージン。手書き Todo">
            <NotebookPage />
          </Frame>
          <Frame label="7. ラジオダイヤル" note="周波数選局 + 木製筐体">
            <RadioDial />
          </Frame>
          <Frame label="8. 時計の文字盤" note="アナログ針 + ガラス反射">
            <WatchFace />
          </Frame>
          <Frame label="9. 物理的な電源ボタン" note="3D + 押し込み感 + LED 発光">
            <PowerButton />
          </Frame>
          <Frame label="10. 革製アドレスブック" note="ステッチ + 黄ばんだ紙">
            <AddressBook />
          </Frame>
          <Frame label="11. メタル ステッパー" note="金属ボタン + LED 数値表示">
            <MetalStepper />
          </Frame>
          <Frame label="12. 大理石 (Marble)" note="高級感・トロフィー">
            <MarbleCard />
          </Frame>
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">Skeuomorphism のレシピ</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>金属</b> — radial-gradient で表面ハイライト + inset shadow で凹凸
          </li>
          <li>
            <b>木目</b> — repeating-linear-gradient (細線/中線/太線) を重ねる
          </li>
          <li>
            <b>革</b> — radial-gradient (中央明・端暗) + 縁にステッチ風 inset
          </li>
          <li>
            <b>紙</b> — 罫線 + 上下のグラデで日焼け + 影で浮かす
          </li>
          <li>
            <b>ガラス・LCD</b> — 暗緑のグラデ + inset で凹み + テキストに発光
          </li>
          <li>
            <b>ボタンの押し込み感</b> — active:scale-95 + 影の方向を反転
          </li>
        </ul>
      </section>
    </div>
  );
}
