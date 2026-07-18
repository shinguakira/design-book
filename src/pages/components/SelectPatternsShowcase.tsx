import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Search,
  X,
  Plus,
  Minus,
  Globe,
  Code,
  Sparkles,
  Bot,
  type LucideIcon,
} from "lucide-react";

const TOOLS = [
  "Figma",
  "Sketch",
  "Adobe XD",
  "Linear",
  "Notion",
  "Slack",
  "GitHub",
  "VS Code",
  "Vercel",
  "Cursor",
];

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#71717a",
  "#3f3f46",
  "#18181b",
];

const USERS = [
  { name: "Taro Yamada", email: "taro@example.com", color: "from-blue-500 to-violet-600" },
  { name: "Hanako Sato", email: "hanako@example.com", color: "from-pink-500 to-rose-600" },
  { name: "Ichiro Tanaka", email: "ichiro@example.com", color: "from-emerald-500 to-teal-600" },
  { name: "Jiro Suzuki", email: "jiro@example.com", color: "from-amber-500 to-orange-600" },
];

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

function useOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);
  return ref;
}

/* 2. Custom dropdown */
function CustomDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Figma");
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 h-9 rounded-md border bg-white text-sm transition ${
          open ? "border-zinc-900 ring-2 ring-zinc-900/10" : "border-zinc-300 hover:border-zinc-400"
        }`}
      >
        {value}
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-56 overflow-y-auto animate-slide-in-down">
          {TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setValue(t);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
            >
              <span className="w-3.5 h-3.5">
                {t === value && <Check className="w-3.5 h-3.5 text-zinc-900" />}
              </span>
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 3. Searchable combobox */
function Combobox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [value, setValue] = useState("Figma");
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  const filtered = TOOLS.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        {value}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg z-10 animate-slide-in-down">
          <div className="relative border-b border-zinc-200">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="絞り込み..."
              className="w-full pl-8 pr-2 py-1.5 text-sm outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="text-center text-xs text-zinc-400 py-4">一致なし</div>
            ) : (
              filtered.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setValue(t);
                    setOpen(false);
                    setQ("");
                  }}
                  className="w-full px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
                >
                  {t}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* 4. Multi-select with chips */
function MultiChips() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Figma", "Linear"]);
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div ref={ref} className="relative max-w-md">
      <div
        onClick={() => setOpen((o) => !o)}
        className="min-h-9 px-2 py-1 rounded-md border border-zinc-300 bg-white flex flex-wrap items-center gap-1 cursor-pointer hover:border-zinc-400"
      >
        {selected.length === 0 ? (
          <span className="text-sm text-zinc-400 px-1">選択...</span>
        ) : (
          selected.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-xs"
            >
              {t}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(t);
                }}
                className="text-zinc-500 hover:text-zinc-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-auto" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-56 overflow-y-auto animate-slide-in-down">
          {TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
            >
              <input
                type="checkbox"
                checked={selected.includes(t)}
                readOnly
                className="accent-zinc-900 pointer-events-none"
              />
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 5. Tag input (free) */
function TagInput() {
  const [tags, setTags] = useState<string[]>(["react", "tailwind"]);
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v || tags.includes(v)) return;
    setTags((t) => [...t, v]);
    setInput("");
  };
  return (
    <div className="max-w-md min-h-9 px-2 py-1 rounded-md border border-zinc-300 bg-white flex flex-wrap items-center gap-1 focus-within:border-zinc-500">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs"
        >
          {t}
          <button
            onClick={() => setTags((arr) => arr.filter((x) => x !== t))}
            className="text-blue-500 hover:text-blue-900"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !input && tags.length) {
            setTags(tags.slice(0, -1));
          }
        }}
        placeholder={tags.length ? "" : "タグを入力 Enter"}
        className="flex-1 min-w-24 outline-none text-sm py-0.5 px-1"
      />
    </div>
  );
}

/* 6. Grouped options */
function GroupedDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Figma");
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  const groups: Record<string, string[]> = {
    デザイン: ["Figma", "Sketch", "Adobe XD"],
    開発: ["VS Code", "GitHub", "Vercel", "Cursor"],
    コラボ: ["Notion", "Slack", "Linear"],
  };
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm"
      >
        {value}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 max-h-64 overflow-y-auto animate-slide-in-down">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g}>
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-semibold bg-zinc-50">
                {g}
              </div>
              {items.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setValue(t);
                    setOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
                >
                  {t}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 7. Rich options (icon + desc) */
function RichOptions() {
  type Opt = { name: string; desc: string; Icon: LucideIcon };
  const opts: Opt[] = [
    { name: "Web search", desc: "ウェブから最新情報を検索", Icon: Globe },
    { name: "Code interpreter", desc: "コードを実行・分析", Icon: Code },
    { name: "Creative", desc: "画像生成・装飾", Icon: Sparkles },
    { name: "Default", desc: "シンプルな回答モード", Icon: Bot },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(opts[3]);
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <div ref={ref} className="relative max-w-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 h-10 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        <value.Icon className="w-4 h-4 text-zinc-500" />
        {value.name}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-auto" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 animate-slide-in-down">
          {opts.map((o) => (
            <button
              key={o.name}
              onClick={() => {
                setValue(o);
                setOpen(false);
              }}
              className={`w-full flex items-start gap-3 px-3 py-2 hover:bg-zinc-100 text-left ${
                value.name === o.name ? "bg-zinc-50" : ""
              }`}
            >
              <o.Icon className="w-4 h-4 text-zinc-700 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium">{o.name}</div>
                <div className="text-xs text-zinc-500">{o.desc}</div>
              </div>
              {value.name === o.name && <Check className="w-3.5 h-3.5 text-emerald-500 mt-1" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 8. Color swatch */
function ColorSwatch() {
  const [value, setValue] = useState(COLORS[10]);
  return (
    <div>
      <div className="grid grid-cols-10 gap-1.5 max-w-sm">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setValue(c)}
            className={`w-7 h-7 rounded transition ${
              value === c ? "ring-2 ring-offset-2 ring-zinc-900 scale-110" : ""
            }`}
            style={{ background: c }}
            title={c}
          >
            {value === c && <Check className="w-3.5 h-3.5 text-white mx-auto drop-shadow" />}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <div className="w-5 h-5 rounded border border-zinc-300" style={{ background: value }} />
        <code className="font-mono text-zinc-600">{value}</code>
      </div>
    </div>
  );
}

/* 9. Avatar / user picker */
function AvatarPicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(USERS[0]);
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <div ref={ref} className="relative max-w-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2 h-10 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        <div
          className={`w-7 h-7 rounded-full bg-gradient-to-br ${value.color} text-white text-xs font-bold flex items-center justify-center`}
        >
          {value.name[0]}
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-medium truncate">{value.name}</div>
          <div className="text-[10px] text-zinc-500 truncate">{value.email}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 animate-slide-in-down">
          {USERS.map((u) => (
            <button
              key={u.name}
              onClick={() => {
                setValue(u);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-100 text-left"
            >
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${u.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}
              >
                {u.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm">{u.name}</div>
                <div className="text-[10px] text-zinc-500 truncate">{u.email}</div>
              </div>
              {value.name === u.name && <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 10. Segmented control */
function Segmented() {
  const [value, setValue] = useState<"day" | "week" | "month" | "year">("week");
  const opts = [
    { id: "day", label: "日" },
    { id: "week", label: "週" },
    { id: "month", label: "月" },
    { id: "year", label: "年" },
  ] as const;
  return (
    <div className="inline-flex bg-zinc-100 rounded-md p-0.5">
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => setValue(o.id)}
          className={`px-3 h-7 rounded text-xs font-medium transition ${
            value === o.id ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* 11. Toggle group (multi-select buttons) */
function ToggleGroup() {
  const [sel, setSel] = useState<Set<string>>(new Set(["Figma", "GitHub"]));
  const opts = ["Figma", "Sketch", "Linear", "GitHub", "Vercel"];
  const toggle = (t: string) =>
    setSel((s) => {
      const next = new Set(s);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  return (
    <div className="flex flex-wrap gap-1.5">
      {opts.map((t) => {
        const on = sel.has(t);
        return (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`inline-flex items-center gap-1 px-3 h-8 rounded-md border text-sm transition ${
              on
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {on && <Check className="w-3 h-3" />}
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* 12. Radio cards (large clickable options) */
function RadioCards() {
  const plans = [
    { id: "free", name: "Free", price: "¥0", desc: "個人利用、月100リクエスト" },
    { id: "pro", name: "Pro", price: "¥1,200", desc: "月1万リクエスト + API" },
    { id: "team", name: "Team", price: "¥4,800", desc: "チーム共有 + 管理機能" },
  ];
  const [value, setValue] = useState("pro");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl">
      {plans.map((p) => {
        const on = value === p.id;
        return (
          <label
            key={p.id}
            className={`relative cursor-pointer rounded-lg border-2 p-3 transition ${
              on ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <input
              type="radio"
              name="plan"
              checked={on}
              onChange={() => setValue(p.id)}
              className="sr-only"
            />
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

/* 13. Switch list */
function SwitchList() {
  const [vals, setVals] = useState({ a: true, b: false, c: true });
  return (
    <ul className="rounded-md border border-zinc-200 divide-y divide-zinc-100 max-w-md">
      {[
        { id: "a" as const, label: "通知をオン", desc: "新着の通知を受け取る" },
        { id: "b" as const, label: "ダークモード", desc: "夜間の自動切替" },
        { id: "c" as const, label: "使用統計の共有", desc: "匿名化された使用データを送信" },
      ].map((it) => (
        <li key={it.id} className="flex items-start gap-3 px-3 py-2.5">
          <div className="flex-1">
            <div className="text-sm font-medium">{it.label}</div>
            <div className="text-xs text-zinc-500">{it.desc}</div>
          </div>
          <button
            onClick={() => setVals((v) => ({ ...v, [it.id]: !v[it.id] }))}
            className={`relative w-9 h-5 rounded-full transition ${
              vals[it.id] ? "bg-emerald-500" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition ${
                vals[it.id] ? "left-[18px]" : "left-0.5"
              }`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

/* 14. Stepper */
function Stepper() {
  const [n, setN] = useState(1);
  return (
    <div className="inline-flex items-stretch rounded-md border border-zinc-300 overflow-hidden">
      <button
        onClick={() => setN((v) => Math.max(0, v - 1))}
        className="w-9 h-9 hover:bg-zinc-100 text-zinc-700 flex items-center justify-center"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className="w-12 flex items-center justify-center text-sm font-medium tabular-nums border-x border-zinc-300">
        {n}
      </div>
      <button
        onClick={() => setN((v) => v + 1)}
        className="w-9 h-9 hover:bg-zinc-100 text-zinc-700 flex items-center justify-center"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* 15. Cascading */
const REGIONS: Record<string, string[]> = {
  日本: ["北海道", "東北", "関東", "中部", "関西", "中国", "四国", "九州"],
  USA: ["West", "Midwest", "South", "Northeast"],
  France: ["Île-de-France", "PACA", "Bretagne"],
};
function Cascading() {
  const [country, setCountry] = useState<keyof typeof REGIONS>("日本");
  const [region, setRegion] = useState(REGIONS["日本"][2]);
  return (
    <div className="flex gap-2 max-w-md">
      <select
        value={country}
        onChange={(e) => {
          const v = e.target.value as keyof typeof REGIONS;
          setCountry(v);
          setRegion(REGIONS[v][0]);
        }}
        className="flex-1 h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white"
      >
        {Object.keys(REGIONS).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="flex-1 h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white"
      >
        {REGIONS[country].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}

/* 16. Inline listbox (always visible) */
function Listbox() {
  const [value, setValue] = useState("Figma");
  return (
    <div className="max-w-xs rounded-md border border-zinc-200 max-h-56 overflow-y-auto">
      {TOOLS.map((t) => (
        <button
          key={t}
          onClick={() => setValue(t)}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left transition ${
            value === t ? "bg-blue-50 text-blue-900 font-medium" : "hover:bg-zinc-50"
          }`}
        >
          <span className="w-3.5 h-3.5">
            {value === t && <Check className="w-3.5 h-3.5 text-blue-600" />}
          </span>
          {t}
        </button>
      ))}
    </div>
  );
}

export default function SelectPatternsShowcase() {
  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        「複数の選択肢から選ぶ」UIの16パターン。 単純な select
        から、検索付き、複数選択、リッチオプション、カラーピッカー、
        ユーザー指名、セグメント、ラジオカード、Listbox まで。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Frame label="1. Native select" note="一番素朴。OS のスタイルに任せる。">
          <select className="max-w-xs w-full h-9 rounded-md border border-zinc-300 px-3 text-sm bg-white">
            {TOOLS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Frame>

        <Frame label="2. Custom dropdown" note="見た目を統一するためのカスタムドロップ。">
          <CustomDropdown />
        </Frame>

        <Frame label="3. Searchable combobox" note="選択肢が多い時に。type で絞り込み。">
          <Combobox />
        </Frame>

        <Frame label="4. Multi-select chips" note="複数選択。選択中はチップで × 削除可。">
          <MultiChips />
        </Frame>

        <Frame label="5. Tag input (free)" note="既存リストに依らない自由入力 (Enterで追加)。">
          <TagInput />
        </Frame>

        <Frame label="6. Grouped options" note="セクション見出しで分類。">
          <GroupedDropdown />
        </Frame>

        <Frame
          label="7. Rich options (icon + desc)"
          note="アイコン + タイトル + 説明文。ChatGPT風モード切替。"
        >
          <RichOptions />
        </Frame>

        <Frame label="8. Color swatch" note="視覚的に直接選ぶ。テーマ色・カテゴリ色。">
          <ColorSwatch />
        </Frame>

        <Frame label="9. Avatar / user picker" note="名前 + メール + アバター。担当者アサイン。">
          <AvatarPicker />
        </Frame>

        <Frame label="10. Segmented control" note="少数の排他選択。期間切替などに最適。">
          <Segmented />
        </Frame>

        <Frame label="11. Toggle group (multi)" note="複数オン/オフ。タグフィルタや絞り込み。">
          <ToggleGroup />
        </Frame>

        <Frame label="12. Radio cards" note="大きく見せる排他選択。料金プラン・初回設定。">
          <RadioCards />
        </Frame>

        <Frame label="13. Switch list" note="設定画面の定番。各行に説明 + スイッチ。">
          <SwitchList />
        </Frame>

        <Frame label="14. Stepper" note="数値の選択。数量・人数。">
          <Stepper />
        </Frame>

        <Frame label="15. Cascading selects" note="左で選んだ値で右の候補が変わる。">
          <Cascading />
        </Frame>

        <Frame label="16. Listbox (always visible)" note="常時展開のリスト。サイドバー選択など。">
          <Listbox />
        </Frame>
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>2〜5択の排他</b> → Segmented control / Radio cards (Native select より速い)
          </li>
          <li>
            <b>6〜20択の排他</b> → Custom dropdown / Grouped
          </li>
          <li>
            <b>20択以上</b> → Searchable combobox (検索なしは苦痛)
          </li>
          <li>
            <b>複数選択</b> → Multi chips / Toggle group / Switch list
          </li>
          <li>
            <b>自由入力もあり</b> → Tag input (既存にない値も足せる)
          </li>
          <li>
            <b>選択肢に意味がある</b> → Rich options / Avatar / Color
          </li>
          <li>
            <b>常時見せたい</b> → Listbox (フォルダリスト・カテゴリ)
          </li>
          <li>モバイルでは Native select が一番タップしやすい場合も多い</li>
        </ul>
      </section>
    </div>
  );
}
