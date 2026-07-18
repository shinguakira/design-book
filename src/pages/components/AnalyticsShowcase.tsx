import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
  DollarSign,
  Activity,
  Eye,
} from "lucide-react";

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
      <div className="p-5">{children}</div>
    </div>
  );
}

const MONTHLY = [12, 19, 17, 24, 28, 22, 30, 38, 35, 42, 48, 60];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CHANNELS = [
  { name: "Direct", value: 4200, color: "#3b82f6" },
  { name: "Search", value: 3800, color: "#10b981" },
  { name: "Social", value: 2400, color: "#ec4899" },
  { name: "Referral", value: 1100, color: "#f59e0b" },
  { name: "Email", value: 700, color: "#8b5cf6" },
];

const LEADERBOARD = [
  { name: "Anthropic", value: 92, color: "#3b82f6" },
  { name: "OpenAI", value: 88, color: "#10b981" },
  { name: "Google DeepMind", value: 76, color: "#f59e0b" },
  { name: "Meta AI", value: 68, color: "#ec4899" },
  { name: "Mistral", value: 55, color: "#8b5cf6" },
];

/* ─── Sparkline ─── */
function Sparkline({
  data,
  width = 80,
  height = 24,
  color = "#3b82f6",
  fill,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 2) + 1;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y] as const;
  });
  const poly = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${points[0][0]},${height} ${poly} ${points[points.length - 1][0]},${height}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      {fill && <polygon points={area} fill={fill} />}
      <polyline
        points={poly}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Stat card ─── */
function Stat({
  Icon,
  label,
  value,
  delta,
  spark,
  color = "#3b82f6",
}: {
  Icon: typeof Users;
  label: string;
  value: string;
  delta: number;
  spark: number[];
  color?: string;
}) {
  const up = delta > 0;
  const flat = delta === 0;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" />
          {label}
        </span>
        <Sparkline data={spark} color={color} fill={`${color}20`} />
      </div>
      <div className="text-2xl font-bold mt-2 tabular-nums">{value}</div>
      <div
        className={`text-xs mt-1 inline-flex items-center gap-1 font-medium tabular-nums ${
          flat ? "text-zinc-500" : up ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {flat ? (
          <Minus className="w-3 h-3" />
        ) : up ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {up ? "+" : ""}
        {delta}%<span className="text-zinc-400 ml-0.5">先月比</span>
      </div>
    </div>
  );
}

/* ─── Line chart ─── */
function LineChart({ data, color = "#3b82f6" }: { data: number[]; color?: string }) {
  const W = 520,
    H = 180,
    P = 30;
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
    const y = H - P - (v / max) * (H - P * 2);
    return [x, y] as const;
  });
  const poly = points.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-44">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = P + ((H - P * 2) / 4) * i;
        return (
          <g key={i}>
            <line x1={P} y1={y} x2={W - P} y2={y} stroke="#e4e4e7" strokeDasharray="3 3" />
            <text x={P - 4} y={y + 3} fontSize="9" fill="#a1a1aa" textAnchor="end">
              {Math.round(max - (max / 4) * i)}
            </text>
          </g>
        );
      })}
      {MONTHS.map((m, i) => {
        const x = P + (i / (data.length - 1)) * (W - P * 2);
        return (
          <text key={m} x={x} y={H - 10} fontSize="9" fill="#a1a1aa" textAnchor="middle">
            {m}
          </text>
        );
      })}
      <polyline
        points={poly}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="#fff" stroke={color} strokeWidth={2} />
      ))}
    </svg>
  );
}

/* ─── Area chart ─── */
function AreaChart({ data, color = "#10b981" }: { data: number[]; color?: string }) {
  const W = 520,
    H = 180,
    P = 30;
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
    const y = H - P - (v / max) * (H - P * 2);
    return [x, y] as const;
  });
  const poly = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${P},${H - P} ${poly} ${W - P},${H - P}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-44">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => {
        const y = P + ((H - P * 2) / 3) * i;
        return (
          <line key={i} x1={P} y1={y} x2={W - P} y2={y} stroke="#e4e4e7" strokeDasharray="3 3" />
        );
      })}
      <polygon points={area} fill="url(#areaGrad)" />
      <polyline points={poly} fill="none" stroke={color} strokeWidth={2} />
      {MONTHS.map((m, i) => {
        const x = P + (i / (data.length - 1)) * (W - P * 2);
        return (
          <text key={m} x={x} y={H - 10} fontSize="9" fill="#a1a1aa" textAnchor="middle">
            {m}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Bar chart ─── */
function BarChart({ data, color = "#6366f1" }: { data: number[]; color?: string }) {
  const W = 520,
    H = 180,
    P = 30;
  const max = Math.max(...data);
  const bw = ((W - P * 2) / data.length) * 0.7;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-44">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = P + ((H - P * 2) / 4) * i;
        return (
          <line key={i} x1={P} y1={y} x2={W - P} y2={y} stroke="#e4e4e7" strokeDasharray="3 3" />
        );
      })}
      {data.map((v, i) => {
        const slot = (W - P * 2) / data.length;
        const x = P + slot * i + (slot - bw) / 2;
        const h = (v / max) * (H - P * 2);
        const y = H - P - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx={2} fill={color} opacity={0.85} />
          </g>
        );
      })}
      {MONTHS.map((m, i) => {
        const slot = (W - P * 2) / data.length;
        const x = P + slot * i + slot / 2;
        return (
          <text key={m} x={x} y={H - 10} fontSize="9" fill="#a1a1aa" textAnchor="middle">
            {m}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Stacked bar ─── */
function StackedBars() {
  const data = [
    { label: "Q1", a: 30, b: 18, c: 12 },
    { label: "Q2", a: 40, b: 22, c: 18 },
    { label: "Q3", a: 35, b: 30, c: 25 },
    { label: "Q4", a: 50, b: 28, c: 35 },
  ];
  const colors = { a: "#3b82f6", b: "#ec4899", c: "#10b981" };
  const max = Math.max(...data.map((d) => d.a + d.b + d.c));
  return (
    <div>
      <div className="flex items-end gap-4 h-40 px-3">
        {data.map((d) => {
          const total = d.a + d.b + d.c;
          const height = (total / max) * 100;
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full max-w-[40px] rounded overflow-hidden flex flex-col-reverse"
                style={{ height: `${height}%` }}
              >
                <div style={{ background: colors.a, height: `${(d.a / total) * 100}%` }} />
                <div style={{ background: colors.b, height: `${(d.b / total) * 100}%` }} />
                <div style={{ background: colors.c, height: `${(d.c / total) * 100}%` }} />
              </div>
              <span className="text-[10px] text-zinc-500">{d.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3 mt-3 text-xs">
        {[
          { id: "a", label: "Direct" },
          { id: "b", label: "Social" },
          { id: "c", label: "Search" },
        ].map((it) => (
          <div key={it.id} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: colors[it.id as "a" | "b" | "c"] }}
            />
            <span className="text-zinc-600">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Horizontal bars (leaderboard) ─── */
function HorizontalBars() {
  const max = Math.max(...LEADERBOARD.map((d) => d.value));
  return (
    <ul className="space-y-2">
      {LEADERBOARD.map((d) => (
        <li key={d.name}>
          <div className="flex items-center justify-between text-xs mb-0.5">
            <span className="font-medium">{d.name}</span>
            <span className="text-zinc-500 tabular-nums">{d.value}</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: d.color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ─── Donut chart ─── */
function Donut() {
  const total = CHANNELS.reduce((s, c) => s + c.value, 0);
  const cx = 80,
    cy = 80,
    r = 60,
    sw = 22;
  let acc = 0;
  const segs = CHANNELS.map((c) => {
    const v = c.value / total;
    const start = acc * 360;
    const end = (acc + v) * 360;
    acc += v;
    const startR = ((start - 90) * Math.PI) / 180;
    const endR = ((end - 90) * Math.PI) / 180;
    const large = end - start > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(startR);
    const y1 = cy + r * Math.sin(startR);
    const x2 = cx + r * Math.cos(endR);
    const y2 = cy + r * Math.sin(endR);
    return { c, path: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}` };
  });
  return (
    <div className="flex items-center gap-5">
      <svg width={160} height={160}>
        {segs.map(({ c, path }) => (
          <path key={c.name} d={path} fill="none" stroke={c.color} strokeWidth={sw} />
        ))}
        <text x={cx} y={cy - 4} fontSize="11" fill="#71717a" textAnchor="middle">
          合計
        </text>
        <text x={cx} y={cy + 12} fontSize="20" fontWeight="bold" fill="#18181b" textAnchor="middle">
          {total.toLocaleString()}
        </text>
      </svg>
      <ul className="text-xs space-y-1">
        {CHANNELS.map((c) => (
          <li key={c.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
            <span className="flex-1">{c.name}</span>
            <span className="tabular-nums text-zinc-500">
              {Math.round((c.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Progress rings ─── */
function ProgressRings() {
  const items = [
    { label: "Coverage", value: 78, color: "#10b981" },
    { label: "Quality", value: 92, color: "#3b82f6" },
    { label: "Latency", value: 64, color: "#f59e0b" },
  ];
  return (
    <div className="flex gap-4 justify-center">
      {items.map((it) => {
        const r = 32,
          sw = 7;
        const C = 2 * Math.PI * r;
        const off = C - (it.value / 100) * C;
        return (
          <div key={it.label} className="text-center">
            <svg width={84} height={84}>
              <circle cx={42} cy={42} r={r} fill="none" stroke="#e4e4e7" strokeWidth={sw} />
              <circle
                cx={42}
                cy={42}
                r={r}
                fill="none"
                stroke={it.color}
                strokeWidth={sw}
                strokeDasharray={C}
                strokeDashoffset={off}
                strokeLinecap="round"
                transform="rotate(-90 42 42)"
              />
              <text
                x={42}
                y={46}
                fontSize="16"
                fontWeight="bold"
                fill="#18181b"
                textAnchor="middle"
              >
                {it.value}%
              </text>
            </svg>
            <div className="text-xs text-zinc-600 mt-1">{it.label}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Gauge ─── */
function Gauge({ value = 72 }: { value?: number }) {
  const angle = -90 + (value / 100) * 180;
  return (
    <div className="text-center">
      <svg viewBox="0 0 200 120" width={240} height={140}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <line
          x1={100}
          y1={100}
          x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#18181b"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={100} cy={100} r={6} fill="#18181b" />
        <text x={100} y={75} fontSize="22" fontWeight="bold" fill="#18181b" textAnchor="middle">
          {value}
        </text>
        <text x={100} y={90} fontSize="10" fill="#71717a" textAnchor="middle">
          score
        </text>
      </svg>
    </div>
  );
}

/* ─── Heatmap (calendar contributions) ─── */
function Heatmap() {
  const weeks = 24;
  const days = 7;
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1">
        <div className="flex gap-1">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1">
              {Array.from({ length: days }).map((_, d) => {
                const seed = (w * 31 + d * 17) % 100;
                const lvl = Math.floor(seed / 20);
                const colors = ["#f4f4f5", "#bbf7d0", "#86efac", "#22c55e", "#15803d"];
                return (
                  <div
                    key={d}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{ background: colors[lvl] }}
                    title={`Week ${w + 1}, Day ${d + 1}: ${seed}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-500">
          <span>Less</span>
          {["#f4f4f5", "#bbf7d0", "#86efac", "#22c55e", "#15803d"].map((c) => (
            <span key={c} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Funnel ─── */
function Funnel() {
  const stages = [
    { label: "Visit", value: 10000 },
    { label: "Sign up", value: 4200 },
    { label: "Trial", value: 1800 },
    { label: "Paid", value: 720 },
  ];
  const max = stages[0].value;
  return (
    <ul className="space-y-2">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        const conv = i === 0 ? 100 : Math.round((s.value / stages[i - 1].value) * 100);
        return (
          <li key={s.label}>
            <div className="flex items-baseline justify-between text-xs mb-0.5">
              <span className="font-medium">{s.label}</span>
              <span className="text-zinc-500 tabular-nums">
                {s.value.toLocaleString()}
                {i > 0 && <span className="text-zinc-400 ml-2">→ {conv}%</span>}
              </span>
            </div>
            <div className="h-6 rounded bg-zinc-100 overflow-hidden">
              <div
                className="h-full rounded text-white text-[10px] flex items-center pl-2 font-medium"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ─── Histogram ─── */
function Histogram() {
  const data = [3, 5, 12, 22, 35, 48, 56, 50, 38, 24, 14, 6, 3];
  const max = Math.max(...data);
  return (
    <div>
      <div className="flex items-end gap-0.5 h-32">
        {data.map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
        <span>0</span>
        <span>3</span>
        <span>6</span>
        <span>9</span>
        <span>12+</span>
      </div>
    </div>
  );
}

export default function AnalyticsShowcase() {
  const [period, setPeriod] = useState<"7d" | "30d" | "12m">("12m");
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        ダッシュボード・分析画面で使う可視化コンポーネント14種。 Stat / Sparkline / Line / Bar /
        Area / Stacked / Horizontal / Donut / Progress / Gauge / Heatmap / Funnel / Histogram / KPI
        grid。
      </p>

      <Frame label="1. KPI grid" note="主要4指標 + sparkline + 前月比" span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat
            Icon={Users}
            label="Active Users"
            value="12,340"
            delta={12}
            spark={[5, 8, 7, 11, 9, 14, 13, 16, 18]}
          />
          <Stat
            Icon={DollarSign}
            label="Revenue"
            value="¥2.84M"
            delta={28}
            spark={[20, 22, 19, 24, 26, 30, 32, 38, 42]}
            color="#10b981"
          />
          <Stat
            Icon={Activity}
            label="Sessions"
            value="48,920"
            delta={-4}
            spark={[40, 38, 42, 36, 30, 28, 32, 30, 27]}
            color="#ef4444"
          />
          <Stat
            Icon={Eye}
            label="Page views"
            value="183K"
            delta={0}
            spark={[10, 12, 10, 11, 10, 11, 12, 10, 11]}
            color="#71717a"
          />
        </div>
      </Frame>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="2. Line chart" note="時系列。月次トレンド">
          <LineChart data={MONTHLY} />
        </Frame>

        <Frame label="3. Area chart" note="トレンドに加えて「累積」感を強調">
          <AreaChart data={MONTHLY} color="#10b981" />
        </Frame>

        <Frame label="4. Bar chart" note="期間別の絶対値比較">
          <BarChart data={MONTHLY} color="#6366f1" />
        </Frame>

        <Frame label="5. Stacked bars" note="期間+構成比">
          <StackedBars />
        </Frame>

        <Frame label="6. Horizontal bars" note="ランキング・リーダーボード">
          <HorizontalBars />
        </Frame>

        <Frame label="7. Donut chart" note="シェア・全体に対する割合">
          <Donut />
        </Frame>

        <Frame label="8. Progress rings" note="目標達成率・各指標の状況">
          <ProgressRings />
        </Frame>

        <Frame label="9. Gauge" note="速度計・スコア・温度感">
          <Gauge value={72} />
        </Frame>

        <Frame label="10. Heatmap" note="GitHub 風カレンダー貢献" span>
          <Heatmap />
        </Frame>

        <Frame label="11. Funnel" note="コンバージョン・各段階の通過率">
          <Funnel />
        </Frame>

        <Frame label="12. Histogram" note="分布・度数分布">
          <Histogram />
        </Frame>

        <Frame label="13. Sparkline inline" note="表の中に小さく">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200">
              <tr>
                <th className="text-left text-xs font-medium text-zinc-500 py-2">Service</th>
                <th className="text-left text-xs font-medium text-zinc-500 py-2">Trend</th>
                <th className="text-right text-xs font-medium text-zinc-500 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "CDN", data: [5, 8, 6, 10, 12, 11, 14], color: "#3b82f6" },
                { name: "API", data: [22, 19, 24, 18, 17, 14, 12], color: "#ef4444" },
                { name: "DB", data: [10, 12, 11, 13, 14, 15, 18], color: "#10b981" },
                { name: "Queue", data: [4, 4, 4, 5, 4, 5, 4], color: "#71717a" },
              ].map((s) => (
                <tr key={s.name} className="border-b border-zinc-100 last:border-0">
                  <td className="py-2 text-sm">{s.name}</td>
                  <td className="py-2">
                    <Sparkline data={s.data} color={s.color} width={80} height={20} />
                  </td>
                  <td className="py-2 text-right tabular-nums font-mono text-sm">
                    {s.data[s.data.length - 1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>

        <Frame label="14. Period switcher" note="ダッシュボードの時間軸切替">
          <div className="space-y-3">
            <div className="inline-flex bg-zinc-100 rounded-md p-0.5">
              {(["7d", "30d", "12m"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 h-7 rounded text-xs font-medium ${
                    period === p ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div>
              <Sparkline
                data={
                  period === "7d"
                    ? [12, 15, 14, 18, 22, 19, 26]
                    : period === "30d"
                      ? Array.from({ length: 30 }).map((_, i) => 20 + Math.sin(i / 3) * 10 + i / 3)
                      : MONTHLY
                }
                width={300}
                height={60}
                color="#3b82f6"
                fill="#3b82f620"
              />
            </div>
          </div>
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>1指標の現状</b> → Stat card (+ sparkline でトレンド添え)
          </li>
          <li>
            <b>時系列の変化</b> → Line (細い変化) / Area (累積感) / Bar (期間絶対値)
          </li>
          <li>
            <b>構成比・シェア</b> → Donut / Stacked bars / Horizontal bars
          </li>
          <li>
            <b>達成率・進捗</b> → Progress ring / Gauge
          </li>
          <li>
            <b>頻度・パターン</b> → Heatmap (時間軸) / Histogram (分布)
          </li>
          <li>
            <b>離脱・流入の流れ</b> → Funnel
          </li>
          <li>色は意味のあるエンコードに使う。装飾的にカラフルにすると伝わらない</li>
          <li>軸ラベル / 値ラベル / 単位は省略しない。グラフ単体で完結させる</li>
        </ul>
      </section>
    </div>
  );
}
