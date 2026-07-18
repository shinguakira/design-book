import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Val = "all" | "opt1" | "opt2";
const OPTS: Val[] = ["all", "opt1", "opt2"];
const L: Record<Val, string> = { all: "All", opt1: "Option 1", opt2: "Option 2" };
const S: Record<Val, string> = { all: "All", opt1: "Opt 1", opt2: "Opt 2" };

function Cell({
  n,
  title,
  axis,
  children,
}: {
  n: number;
  title: string;
  axis: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
      <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50">
        <div className="text-xs font-medium text-zinc-800">
          {n}. {title}
        </div>
        <div className="text-[10px] text-zinc-500">{axis}</div>
      </div>
      <div className="p-3 grid place-items-center min-h-24">{children}</div>
    </div>
  );
}

/* 1 Segmented row — canonical "all-visible, 1D horizontal, discrete cells" */
function Segmented({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
      {OPTS.map((o, i) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`px-3 py-1 text-xs ${i > 0 ? "border-l border-zinc-300" : ""} ${
            v === o ? "bg-zinc-900 text-white" : "bg-white text-zinc-700"
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  );
}

/* 2 Card grid — "all-visible, 2D area-weighted (each option gets big surface)" */
function CardGrid({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full">
      {OPTS.map((o) => (
        <button
          key={o}
          onClick={() => s(o)}
          className={`rounded border-2 py-3 text-xs font-medium ${
            v === o ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 bg-white"
          }`}
        >
          {S[o]}
        </button>
      ))}
    </div>
  );
}

/* 3 Text inline — "chrome-free plain text with delimiter" */
function TextInline({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {OPTS.map((o, i) => (
        <span key={o} className="flex items-center gap-2">
          {i > 0 && <span className="text-zinc-300">|</span>}
          <button
            onClick={() => s(o)}
            className={v === o ? "text-zinc-900 font-semibold" : "text-zinc-400"}
          >
            {S[o]}
          </button>
        </span>
      ))}
    </div>
  );
}

/* 4 Dropdown — "collapsed to 1 label, others hidden" */
function Dropdown({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="relative inline-block">
      <select
        value={v}
        onChange={(e) => s(e.target.value as Val)}
        className="appearance-none rounded border border-zinc-300 bg-white pl-3 pr-8 py-1 text-xs"
      >
        {OPTS.map((o) => (
          <option key={o} value={o}>
            {L[o]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
    </div>
  );
}

/* 5 Cycle button — "no persistent visualization of options, 1 tap cycles" */
function CycleButton({ v, s }: { v: Val; s: (v: Val) => void }) {
  const next = () => s(OPTS[(OPTS.indexOf(v) + 1) % 3]);
  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-1.5 rounded border border-zinc-300 bg-white px-3 py-1 text-xs"
    >
      {S[v]}
      <span className="text-zinc-400">↻</span>
    </button>
  );
}

/* 6 Slider — "linear position, continuous-feeling" */
function Slider({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v);
  return (
    <div>
      <div className="relative w-40 h-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-zinc-900 rounded-full"
          style={{ left: 0, width: `${(i / 2) * 100}%` }}
        />
        {OPTS.map((o, k) => (
          <button
            key={o}
            onClick={() => s(o)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 bg-white"
            style={{ left: `${(k / 2) * 100}%`, borderColor: i === k ? "#18181b" : "#d4d4d8" }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between w-40 text-[10px] text-zinc-500">
        {OPTS.map((o) => (
          <span key={o}>{S[o]}</span>
        ))}
      </div>
    </div>
  );
}

/* 7 Dial / knob — "angular position, rotational metaphor" */
function Dial({ v, s }: { v: Val; s: (v: Val) => void }) {
  const angles: Record<Val, number> = { all: 0, opt1: -60, opt2: 60 };
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-inner border-2 border-zinc-200"
        style={{ transform: `rotate(${angles[v]}deg)`, transition: "transform 200ms" }}
      >
        <div className="absolute left-1/2 top-1 w-0.5 h-4 -translate-x-1/2 bg-zinc-900 rounded" />
      </div>
      <div className="flex flex-col gap-0.5 text-[10px]">
        {OPTS.map((o) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`text-left ${v === o ? "text-zinc-900 font-semibold" : "text-zinc-400"}`}
          >
            {S[o]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* 8 Wheel picker — scrollable drum (drag / wheel / click) */
function WheelPicker({ v, s }: { v: Val; s: (v: Val) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const ITEM_H = 24;
  const settling = useRef<number | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const idx = OPTS.indexOf(v);
    const target = idx * ITEM_H;
    if (Math.abs(ref.current.scrollTop - target) > 2) {
      ref.current.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [v]);
  const onScroll = () => {
    if (!ref.current) return;
    const st = ref.current.scrollTop;
    const idx = Math.max(0, Math.min(2, Math.round(st / ITEM_H)));
    if (OPTS[idx] !== v) s(OPTS[idx]);
    if (settling.current) clearTimeout(settling.current);
    settling.current = window.setTimeout(() => {
      if (!ref.current) return;
      ref.current.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
    }, 120);
  };
  return (
    <div className="relative w-24 h-20 rounded-md bg-gradient-to-b from-zinc-100 via-white to-zinc-100 overflow-hidden border border-zinc-200">
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <style>{`.wp-hide::-webkit-scrollbar{display:none}`}</style>
        <div className="wp-hide">
          <div style={{ height: (80 - ITEM_H) / 2 }} />
          {OPTS.map((o) => (
            <button
              key={o}
              onClick={() => s(o)}
              className={`h-6 w-full snap-center flex items-center justify-center text-xs ${
                v === o ? "text-zinc-900 font-semibold" : "text-zinc-400"
              }`}
            >
              {S[o]}
            </button>
          ))}
          <div style={{ height: (80 - ITEM_H) / 2 }} />
        </div>
      </div>
      <div className="absolute inset-x-2 top-1/2 h-6 -translate-y-1/2 rounded pointer-events-none border-y border-zinc-300" />
    </div>
  );
}

/* 13 Fan-out cards — "3 cards fanned like poker hand, selected pops up" */
function FanCards({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; angle: number; color: string }[] = [
    { val: "opt1", angle: -20, color: "bg-rose-100 border-rose-300 text-rose-900" },
    { val: "all", angle: 0, color: "bg-emerald-100 border-emerald-300 text-emerald-900" },
    { val: "opt2", angle: 20, color: "bg-blue-100 border-blue-300 text-blue-900" },
  ];
  return (
    <div className="relative w-32 h-20">
      {items.map((it) => {
        const active = v === it.val;
        return (
          <button
            key={it.val}
            onClick={() => s(it.val)}
            className={`absolute left-1/2 top-1/2 w-14 h-20 rounded-md border ${it.color}`}
            style={{
              transform: `translate(-50%, -50%) rotate(${it.angle}deg) translateY(${
                active ? -10 : 0
              }px)`,
              transformOrigin: "bottom center",
              transition: "transform 180ms",
              zIndex: active ? 10 : 1,
              boxShadow: active ? "0 6px 10px rgba(0,0,0,0.15)" : undefined,
            }}
          >
            <div className="grid place-items-center h-full text-[11px] font-medium">
              {S[it.val]}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* 14 Traffic light — "vertical 3 lamps, one lit" */
function TrafficLight({ v, s }: { v: Val; s: (v: Val) => void }) {
  const items: { val: Val; on: string; off: string }[] = [
    { val: "all", on: "bg-emerald-500 shadow-[0_0_12px_#10b981]", off: "bg-emerald-900/40" },
    { val: "opt1", on: "bg-amber-400 shadow-[0_0_12px_#fbbf24]", off: "bg-amber-900/40" },
    { val: "opt2", on: "bg-rose-500 shadow-[0_0_12px_#f43f5e]", off: "bg-rose-900/40" },
  ];
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1.5 bg-zinc-900 rounded-md p-1.5">
        {items.map((it) => (
          <button
            key={it.val}
            onClick={() => s(it.val)}
            className={`w-6 h-6 rounded-full transition-colors ${v === it.val ? it.on : it.off}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 text-[10px]">
        {items.map((it) => (
          <div
            key={it.val}
            className={`h-6 flex items-center ${
              v === it.val ? "text-zinc-900 font-medium" : "text-zinc-400"
            }`}
          >
            {S[it.val]}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 15 Stepper — "3 numbered circles connected by line, showing progression" */
function Stepper({ v, s }: { v: Val; s: (v: Val) => void }) {
  const i = OPTS.indexOf(v);
  return (
    <div>
      <div className="flex items-center w-40">
        {OPTS.map((o, k) => (
          <div key={o} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => s(o)}
              className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-medium border-2 ${
                k <= i
                  ? "bg-zinc-900 border-zinc-900 text-white"
                  : "bg-white border-zinc-300 text-zinc-400"
              }`}
            >
              {k + 1}
            </button>
            {k < 2 && (
              <div className={`flex-1 h-0.5 mx-1 ${k < i ? "bg-zinc-900" : "bg-zinc-300"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-zinc-500 w-40">
        {OPTS.map((o) => (
          <span key={o}>{S[o]}</span>
        ))}
      </div>
    </div>
  );
}

/* 16 Ternary triangle — "click a corner of the triangle; center = All" */
function Ternary({ v, s }: { v: Val; s: (v: Val) => void }) {
  const pts: Record<Val, { x: number; y: number }> = {
    all: { x: 50, y: 44 },
    opt1: { x: 15, y: 78 },
    opt2: { x: 85, y: 78 },
  };
  const p = pts[v];
  return (
    <svg viewBox="0 0 100 90" className="w-28 h-20">
      <polygon points="50,14 15,78 85,78" fill="#fafafa" stroke="#d4d4d8" strokeWidth="1" />
      <line x1="50" y1="14" x2="50" y2="78" stroke="#e4e4e7" strokeDasharray="2 2" />
      <line x1="15" y1="78" x2="85" y2="78" stroke="#e4e4e7" strokeDasharray="2 2" />
      {(["all", "opt1", "opt2"] as Val[]).map((o) => {
        const c = pts[o];
        return (
          <g key={o}>
            <circle
              cx={c.x}
              cy={c.y}
              r={o === "all" ? 4 : 5}
              fill={v === o ? "#18181b" : "#e4e4e7"}
              stroke="white"
              strokeWidth="1"
              onClick={() => s(o)}
              className="cursor-pointer"
            />
          </g>
        );
      })}
      <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#f43f5e" strokeWidth="2" />
      <text x="50" y="10" fontSize="7" textAnchor="middle" fill="#71717a">
        All
      </text>
      <text x="10" y="85" fontSize="7" textAnchor="start" fill="#71717a">
        Opt 1
      </text>
      <text x="90" y="85" fontSize="7" textAnchor="end" fill="#71717a">
        Opt 2
      </text>
    </svg>
  );
}

/* 17 Ring / arc segments — "3 arcs on annulus, active arc highlighted" */
function RingArcs({ v, s }: { v: Val; s: (v: Val) => void }) {
  const arc = (start: number, end: number, r = 40) => {
    const s1 = ((start - 90) * Math.PI) / 180;
    const s2 = ((end - 90) * Math.PI) / 180;
    const x1 = 50 + r * Math.cos(s1);
    const y1 = 50 + r * Math.sin(s1);
    const x2 = 50 + r * Math.cos(s2);
    const y2 = 50 + r * Math.sin(s2);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };
  const arcs: { val: Val; d: string; label: { x: number; y: number } }[] = [
    { val: "all", d: arc(-50, 50), label: { x: 50, y: 15 } },
    { val: "opt1", d: arc(70, 170), label: { x: 20, y: 82 } },
    { val: "opt2", d: arc(190, 290), label: { x: 80, y: 82 } },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#f4f4f5" strokeWidth="10" />
      {arcs.map((a) => (
        <g key={a.val}>
          <path
            d={a.d}
            fill="none"
            stroke={v === a.val ? "#18181b" : "#d4d4d8"}
            strokeWidth="10"
            strokeLinecap="round"
            onClick={() => s(a.val)}
            className="cursor-pointer"
          />
          <text
            x={a.label.x}
            y={a.label.y}
            fontSize="9"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={v === a.val ? "#18181b" : "#71717a"}
            fontWeight={v === a.val ? 600 : 400}
            style={{ pointerEvents: "none" }}
          >
            {S[a.val]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* 9 Radial / pie menu — "3 wedges arranged around a center" */
function RadialMenu({ v, s }: { v: Val; s: (v: Val) => void }) {
  const labelPos = (a: number, r: number) => {
    const rad = (a * Math.PI) / 180;
    return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
  };
  const wedge = (start: number, end: number) => {
    const s1 = ((start - 90) * Math.PI) / 180;
    const s2 = ((end - 90) * Math.PI) / 180;
    const x1 = 50 + 45 * Math.cos(s1);
    const y1 = 50 + 45 * Math.sin(s1);
    const x2 = 50 + 45 * Math.cos(s2);
    const y2 = 50 + 45 * Math.sin(s2);
    return `M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`;
  };
  const wedges: { val: Val; d: string; label: { x: number; y: number } }[] = [
    { val: "all", d: wedge(-60, 60), label: labelPos(-90, 30) },
    { val: "opt1", d: wedge(60, 180), label: labelPos(30, 30) },
    { val: "opt2", d: wedge(180, 300), label: labelPos(150, 30) },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      {wedges.map((w) => (
        <g key={w.val}>
          <path
            d={w.d}
            fill={v === w.val ? "#18181b" : "#f4f4f5"}
            stroke="#e4e4e7"
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => s(w.val)}
          />
          <text
            x={w.label.x}
            y={w.label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill={v === w.val ? "white" : "#71717a"}
            style={{ pointerEvents: "none" }}
          >
            {S[w.val]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* 10 Venn / set diagram — "All = intersection, options = wings" */
function VennDiagram({ v, s }: { v: Val; s: (v: Val) => void }) {
  const active = (target: Val) => v === target;
  return (
    <svg viewBox="0 0 140 80" className="w-40 h-24">
      <circle
        cx="55"
        cy="40"
        r="30"
        fill={active("opt1") ? "rgba(24,24,27,0.9)" : "rgba(24,24,27,0.15)"}
        stroke="#18181b"
        strokeWidth="1"
        onClick={() => s("opt1")}
        className="cursor-pointer"
      />
      <circle
        cx="85"
        cy="40"
        r="30"
        fill={active("opt2") ? "rgba(24,24,27,0.9)" : "rgba(24,24,27,0.15)"}
        stroke="#18181b"
        strokeWidth="1"
        onClick={() => s("opt2")}
        className="cursor-pointer"
      />
      <path
        d="M70 15 A 30 30 0 0 1 70 65 A 30 30 0 0 1 70 15 Z"
        fill={active("all") ? "#f43f5e" : "transparent"}
        onClick={() => s("all")}
        className="cursor-pointer"
      />
      <text
        x="40"
        y="43"
        fontSize="7"
        fill={active("opt1") ? "white" : "#3f3f46"}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        Opt 1
      </text>
      <text
        x="100"
        y="43"
        fontSize="7"
        fill={active("opt2") ? "white" : "#3f3f46"}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        Opt 2
      </text>
      <text
        x="70"
        y="43"
        fontSize="7"
        fill={active("all") ? "white" : "#3f3f46"}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        All
      </text>
    </svg>
  );
}

/* 11 Asymmetric split — "All is dominant / separated from the Option pair" */
function AsymmetricSplit({ v, s }: { v: Val; s: (v: Val) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => s("all")}
        className={`px-3 py-1 rounded-md text-xs font-medium border ${
          v === "all"
            ? "bg-zinc-900 text-white border-zinc-900"
            : "bg-white text-zinc-700 border-zinc-300"
        }`}
      >
        All
      </button>
      <span className="text-zinc-300 text-xs">or</span>
      <div className="inline-flex rounded-md border border-zinc-300 overflow-hidden">
        {(["opt1", "opt2"] as Val[]).map((o, i) => (
          <button
            key={o}
            onClick={() => s(o)}
            className={`px-2 py-1 text-xs ${i > 0 ? "border-l border-zinc-300" : ""} ${
              v === o ? "bg-zinc-100 text-zinc-900 font-medium" : "bg-white text-zinc-600"
            }`}
          >
            {S[o]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* 12 Z-stack cards — "3 depth-stacked, selected pulls to front" */
function ZStack({ v, s }: { v: Val; s: (v: Val) => void }) {
  const zIndex: Record<Val, number> = {
    all: v === "all" ? 3 : 1,
    opt1: v === "opt1" ? 3 : 2,
    opt2: v === "opt2" ? 3 : 2,
  };
  const items: { val: Val; offset: number; base: string }[] = [
    { val: "opt2", offset: 24, base: "bg-blue-100 border-blue-300 text-blue-900" },
    { val: "opt1", offset: 12, base: "bg-amber-100 border-amber-300 text-amber-900" },
    { val: "all", offset: 0, base: "bg-emerald-100 border-emerald-300 text-emerald-900" },
  ];
  return (
    <div className="relative w-32 h-20">
      {items.map((it) => {
        const active = v === it.val;
        return (
          <button
            key={it.val}
            onClick={() => s(it.val)}
            className={`absolute rounded border text-xs w-28 h-14 font-medium transition-transform ${it.base}`}
            style={{
              left: it.offset,
              top: it.offset,
              zIndex: zIndex[it.val],
              transform: active ? "translateY(-6px) scale(1.05)" : "none",
              boxShadow: active ? "0 6px 12px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {S[it.val]}
          </button>
        );
      })}
    </div>
  );
}

export default function TriChoice() {
  const [a, sA] = useState<Val[]>(Array(17).fill("all"));
  const set = (i: number) => (val: Val) => sA((prev) => prev.map((p, k) => (k === i ? val : p)));

  const patterns: {
    title: string;
    axis: string;
    render: (v: Val, s: (v: Val) => void) => React.ReactNode;
  }[] = [
    {
      title: "Segmented row",
      axis: "横1D · 全可視 · 離散セル",
      render: (v, s) => <Segmented v={v} s={s} />,
    },
    {
      title: "Card grid",
      axis: "2D · 面積重み · 全可視",
      render: (v, s) => <CardGrid v={v} s={s} />,
    },
    {
      title: "Text inline",
      axis: "chrome なし · テキスト＋区切り",
      render: (v, s) => <TextInline v={v} s={s} />,
    },
    { title: "Dropdown", axis: "1つに畳む · 他は隠す", render: (v, s) => <Dropdown v={v} s={s} /> },
    {
      title: "Cycle button",
      axis: "永続表示なし · タップで循環",
      render: (v, s) => <CycleButton v={v} s={s} />,
    },
    { title: "Slider (3-stop)", axis: "直線位置で示す", render: (v, s) => <Slider v={v} s={s} /> },
    {
      title: "Dial / knob",
      axis: "角度で示す · 回転メタファ",
      render: (v, s) => <Dial v={v} s={s} />,
    },
    {
      title: "Wheel picker",
      axis: "スクロール可能ドラム (iOS)",
      render: (v, s) => <WheelPicker v={v} s={s} />,
    },
    {
      title: "Radial / pie menu",
      axis: "中心から放射状 · 3 wedge",
      render: (v, s) => <RadialMenu v={v} s={s} />,
    },
    {
      title: "Venn diagram",
      axis: "集合で示す · All=交差",
      render: (v, s) => <VennDiagram v={v} s={s} />,
    },
    {
      title: "Asymmetric split",
      axis: "非対称 · All を主 / Option を従",
      render: (v, s) => <AsymmetricSplit v={v} s={s} />,
    },
    {
      title: "Z-stack cards",
      axis: "奥行きで示す · 最前面が選択",
      render: (v, s) => <ZStack v={v} s={s} />,
    },
    {
      title: "Fan-out cards",
      axis: "扇状 · トランプの手札的",
      render: (v, s) => <FanCards v={v} s={s} />,
    },
    {
      title: "Traffic light",
      axis: "縦ランプ · 発光メタファ",
      render: (v, s) => <TrafficLight v={v} s={s} />,
    },
    {
      title: "Stepper",
      axis: "段階進行 · 連結線で経路",
      render: (v, s) => <Stepper v={v} s={s} />,
    },
    {
      title: "Ternary triangle",
      axis: "三角形の頂点 · All=中央",
      render: (v, s) => <Ternary v={v} s={s} />,
    },
    {
      title: "Ring / arc segments",
      axis: "ドーナツ弧 · pie 塗りつぶしでない",
      render: (v, s) => <RingArcs v={v} s={s} />,
    },
  ];

  return (
    <div className="max-w-6xl space-y-3">
      <p className="text-sm text-zinc-700">
        3択 [All | Option 1 | Option 2] の <b>構造</b> パターン17種。
        「単に3つ横並び」は1個に集約。他は 1D→2D→畳む→循環→線→角→ドラム→
        放射→集合→非対称→奥行き→扇→発光→段階→三角形→弧 と、置き方の 軸そのものが違うもの。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {patterns.map((p, i) => (
          <Cell key={i} n={i + 1} title={p.title} axis={p.axis}>
            {p.render(a[i], set(i))}
          </Cell>
        ))}
      </div>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">見せ方の軸</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>選択肢を全部見せるか (Segmented / Card / Venn) vs 畳むか (Dropdown / Cycle)</li>
          <li>離散 (button/tab) vs 連続的 (Slider / Dial / Wheel)</li>
          <li>直交 (row/column) vs 放射 (Radial / Dial / Wheel)</li>
          <li>対称 (どれも等価) vs 非対称 (All が特別 = Asymmetric split / Venn)</li>
          <li>2D 表現 (Card / Venn / Z-stack) vs 1D 表現 (Segmented / Slider)</li>
          <li>抽象 (buttons) vs 物理メタファ (Dial / Wheel / Z-stack)</li>
        </ul>
        <div className="mt-2 text-[11px] text-blue-800">
          省いたもの: rounded/pill/underline/chip/inline-slash など、 「Segmented
          の見た目バリエ」でしかないもの。構造は同一なので1個で代表。
        </div>
      </section>
    </div>
  );
}
