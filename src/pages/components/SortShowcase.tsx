import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowUp,
  ArrowUpDown,
  ArrowUpZA,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  GripVertical,
  Heart,
  LayoutGrid,
  List,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

type Key = "name" | "date" | "price" | "rating" | "popularity";
type Dir = "asc" | "desc";

const SORT_KEYS: { id: Key; label: string; Icon: typeof Clock }[] = [
  { id: "name", label: "名前", Icon: ArrowDownAZ },
  { id: "date", label: "更新日", Icon: Calendar },
  { id: "price", label: "価格", Icon: TrendingUp },
  { id: "rating", label: "評価", Icon: Star },
  { id: "popularity", label: "人気", Icon: Heart },
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

/* 1. Native */
function Native() {
  return (
    <div className="flex items-center gap-2 max-w-xs">
      <label className="text-xs text-zinc-500">並び順</label>
      <select className="flex-1 h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
        <option>新しい順</option>
        <option>古い順</option>
        <option>名前順</option>
        <option>価格安い順</option>
        <option>価格高い順</option>
        <option>評価順</option>
      </select>
    </div>
  );
}

/* 2. Inline label (Amazon / 楽天) */
function InlineLabel() {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState("おすすめ順");
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  const opts = ["おすすめ順", "新着順", "価格安い順", "価格高い順", "レビュー多い順"];
  return (
    <div ref={ref} className="relative inline-block">
      <span className="text-sm text-zinc-600">並べ替え: </span>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
      >
        {v}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-12 mt-1 w-44 rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 animate-slide-in-down">
          {opts.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* 3. Key + Direction split */
function KeyDirection() {
  const [key, setKey] = useState<Key>("date");
  const [dir, setDir] = useState<Dir>("desc");
  return (
    <div className="inline-flex max-w-xs">
      <select
        value={key}
        onChange={(e) => setKey(e.target.value as Key)}
        className="h-9 rounded-l-md border border-r-0 border-zinc-300 bg-white px-3 text-sm focus:outline-none"
      >
        {SORT_KEYS.map((k) => (
          <option key={k.id} value={k.id}>
            {k.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
        className="w-10 h-9 rounded-r-md border border-zinc-300 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700"
        title={dir === "asc" ? "昇順" : "降順"}
      >
        {dir === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
      </button>
    </div>
  );
}

/* 4. Segmented chips */
function SegmentedChips() {
  const [v, setV] = useState<"new" | "pop" | "price">("new");
  const opts = [
    { id: "new" as const, label: "新着順", Icon: Sparkles },
    { id: "pop" as const, label: "人気順", Icon: Heart },
    { id: "price" as const, label: "価格順", Icon: TrendingUp },
  ];
  return (
    <div className="inline-flex bg-zinc-100 rounded-full p-0.5 gap-0.5">
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => setV(o.id)}
          className={`inline-flex items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium transition ${
            v === o.id ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <o.Icon className="w-3 h-3" />
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* 5. Table column sort */
function TableSort() {
  const [sort, setSort] = useState<{ key: "name" | "price" | "date"; dir: Dir }>({
    key: "price",
    dir: "desc",
  });
  const onSort = (key: typeof sort.key) =>
    setSort((s) => ({
      key,
      dir: s.key === key ? (s.dir === "asc" ? "desc" : "asc") : "desc",
    }));
  const Th = ({ id, label, right }: { id: typeof sort.key; label: string; right?: boolean }) => (
    <th
      onClick={() => onSort(id)}
      className={`px-3 py-2 text-xs font-medium text-zinc-500 cursor-pointer hover:bg-zinc-100 select-none ${
        right ? "text-right" : "text-left"
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === id ? (
          sort.dir === "asc" ? (
            <ArrowUp className="w-3 h-3 text-zinc-700" />
          ) : (
            <ArrowDown className="w-3 h-3 text-zinc-700" />
          )
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-40" />
        )}
      </span>
    </th>
  );
  return (
    <table className="w-full max-w-md text-sm border border-zinc-200 rounded-md overflow-hidden">
      <thead className="bg-zinc-50 border-b border-zinc-200">
        <tr>
          <Th id="name" label="商品名" />
          <Th id="price" label="価格" right />
          <Th id="date" label="登録日" right />
        </tr>
      </thead>
      <tbody>
        {[
          { name: "Item A", price: "¥1,200", date: "2026-06-01" },
          { name: "Item B", price: "¥980", date: "2026-05-28" },
          { name: "Item C", price: "¥2,400", date: "2026-06-04" },
        ].map((r) => (
          <tr key={r.name} className="border-b border-zinc-100 last:border-0">
            <td className="px-3 py-1.5">{r.name}</td>
            <td className="px-3 py-1.5 text-right tabular-nums">{r.price}</td>
            <td className="px-3 py-1.5 text-right tabular-nums text-zinc-500">{r.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* 6. Sort badge (removable) */
function SortBadge() {
  const [sort, setSort] = useState<{ key: Key; dir: Dir } | null>({
    key: "rating",
    dir: "desc",
  });
  const meta = sort ? SORT_KEYS.find((k) => k.id === sort.key) : null;
  return (
    <div className="flex items-center gap-2">
      <button className="text-xs text-zinc-500 inline-flex items-center gap-1 hover:text-zinc-900">
        <ArrowUpDown className="w-3.5 h-3.5" />
        並べ替え
      </button>
      {sort && meta && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium animate-slide-in-up">
          <meta.Icon className="w-3 h-3" />
          {meta.label} ({sort.dir === "asc" ? "昇順" : "降順"})
          <button
            onClick={() => setSort(null)}
            className="text-blue-500 hover:text-blue-900 ml-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {!sort && (
        <button
          onClick={() => setSort({ key: "rating", dir: "desc" })}
          className="text-xs text-blue-600 hover:underline"
        >
          + 評価順を追加
        </button>
      )}
    </div>
  );
}

/* 7. Menu (with check + direction sub) */
function MenuWithCheck() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<{ key: Key; dir: Dir }>({
    key: "date",
    dir: "desc",
  });
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));
  const current = SORT_KEYS.find((k) => k.id === sort.key);
  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-300 bg-white text-sm hover:border-zinc-400"
      >
        {current && <current.Icon className="w-4 h-4 text-zinc-500" />}
        {current?.label} ({sort.dir === "asc" ? "昇順" : "降順"})
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 rounded-md border border-zinc-200 bg-white shadow-lg py-1 z-10 animate-slide-in-down">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
            並べ替え項目
          </div>
          {SORT_KEYS.map((k) => (
            <button
              key={k.id}
              onClick={() => setSort((s) => ({ ...s, key: k.id }))}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left ${
                sort.key === k.id ? "bg-zinc-50" : ""
              }`}
            >
              <k.Icon className="w-3.5 h-3.5 text-zinc-500" />
              <span className="flex-1">{k.label}</span>
              {sort.key === k.id && <Check className="w-3.5 h-3.5 text-emerald-500" />}
            </button>
          ))}
          <div className="border-t border-zinc-100 mt-1 pt-1">
            <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
              順序
            </div>
            {[
              { id: "asc" as const, label: "昇順", Icon: ArrowDownAZ },
              { id: "desc" as const, label: "降順", Icon: ArrowUpZA },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSort((s) => ({ ...s, dir: d.id }))}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-zinc-100 text-left"
              >
                <d.Icon className="w-3.5 h-3.5 text-zinc-500" />
                <span className="flex-1">{d.label}</span>
                {sort.dir === d.id && <Check className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* 8. Direction-only toggle */
function DirectionToggle() {
  const [dir, setDir] = useState<Dir>("desc");
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-zinc-600">価格</span>
      <div className="inline-flex border border-zinc-300 rounded-md overflow-hidden">
        <button
          onClick={() => setDir("asc")}
          className={`w-9 h-9 flex items-center justify-center ${
            dir === "asc" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50 text-zinc-500"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => setDir("desc")}
          className={`w-9 h-9 flex items-center justify-center border-l border-zinc-300 ${
            dir === "desc" ? "bg-zinc-900 text-white" : "bg-white hover:bg-zinc-50 text-zinc-500"
          }`}
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* 9. Multi-key (priority list) */
function MultiKey() {
  const [keys, setKeys] = useState<{ id: Key; dir: Dir }[]>([
    { id: "rating", dir: "desc" },
    { id: "date", dir: "desc" },
  ]);
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= keys.length) return;
    setKeys((ks) => {
      const next = [...ks];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const toggleDir = (i: number) =>
    setKeys((ks) =>
      ks.map((k, j) => (j === i ? { ...k, dir: k.dir === "asc" ? "desc" : "asc" } : k)),
    );
  const remove = (i: number) => setKeys((ks) => ks.filter((_, j) => j !== i));
  const unused = SORT_KEYS.filter((k) => !keys.find((x) => x.id === k.id));
  return (
    <div className="max-w-sm">
      <ul className="space-y-1.5">
        {keys.map((k, i) => {
          const meta = SORT_KEYS.find((s) => s.id === k.id)!;
          return (
            <li
              key={k.id}
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 py-1.5"
            >
              <span className="text-[10px] font-semibold text-zinc-400 w-4 text-center tabular-nums">
                {i + 1}
              </span>
              <GripVertical className="w-3.5 h-3.5 text-zinc-300" />
              <meta.Icon className="w-3.5 h-3.5 text-zinc-500" />
              <span className="flex-1 text-sm">{meta.label}</span>
              <button
                onClick={() => toggleDir(i)}
                className="text-xs text-zinc-600 hover:text-zinc-900"
                title={k.dir === "asc" ? "昇順" : "降順"}
              >
                {k.dir === "asc" ? (
                  <ArrowUp className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5" />
                )}
              </button>
              <div className="flex flex-col">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="text-zinc-400 hover:text-zinc-900 disabled:opacity-30"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === keys.length - 1}
                  className="text-zinc-400 hover:text-zinc-900 disabled:opacity-30"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
              <button onClick={() => remove(i)} className="text-zinc-400 hover:text-rose-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
      {unused.length > 0 && (
        <select
          value=""
          onChange={(e) => {
            const id = e.target.value as Key;
            if (id) setKeys((ks) => [...ks, { id, dir: "desc" }]);
          }}
          className="mt-2 w-full h-8 rounded-md border border-dashed border-zinc-300 bg-white px-2 text-xs text-zinc-500"
        >
          <option value="">+ 並べ替えキーを追加</option>
          {unused.map((u) => (
            <option key={u.id} value={u.id}>
              {u.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

/* 10. Suggestions / smart sort */
function SmartSort() {
  const [v, setV] = useState("trending");
  const opts = [
    { id: "trending", label: "トレンド", Icon: TrendingUp, desc: "今勢いのある商品" },
    { id: "top-rated", label: "高評価", Icon: Star, desc: "★4.5 以上が上位" },
    { id: "most-reviewed", label: "レビュー多い", Icon: Sparkles, desc: "実績順" },
    { id: "new", label: "新着", Icon: Clock, desc: "直近1週間" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
      {opts.map((o) => {
        const on = v === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setV(o.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border-2 text-left transition ${
              on ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <o.Icon className={`w-4 h-4 ${on ? "text-zinc-900" : "text-zinc-500"}`} />
            <div className="flex-1">
              <div className="text-sm font-semibold">{o.label}</div>
              <div className="text-[10px] text-zinc-500">{o.desc}</div>
            </div>
            {on && <Check className="w-4 h-4 text-emerald-500" />}
          </button>
        );
      })}
    </div>
  );
}

/* 11. Sort + view mode (combined toolbar) */
function SortAndView() {
  const [mode, setMode] = useState<"list" | "grid">("list");
  const [sort, setSort] = useState("新着順");
  return (
    <div className="flex items-center justify-between gap-3 max-w-md">
      <div className="text-xs text-zinc-500">128 件の結果</div>
      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-8 rounded-md border border-zinc-300 bg-white px-2 text-xs focus:outline-none"
        >
          <option>新着順</option>
          <option>人気順</option>
          <option>価格順</option>
        </select>
        <div className="inline-flex bg-zinc-100 rounded-md p-0.5">
          <button
            onClick={() => setMode("list")}
            className={`w-7 h-7 rounded flex items-center justify-center ${
              mode === "list" ? "bg-white shadow-sm" : "text-zinc-500"
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMode("grid")}
            className={`w-7 h-7 rounded flex items-center justify-center ${
              mode === "grid" ? "bg-white shadow-sm" : "text-zinc-500"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* 12. Quick toggle (single icon button) */
function QuickToggle() {
  const [dir, setDir] = useState<Dir>("desc");
  return (
    <button
      onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
      className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-md hover:bg-zinc-100 text-zinc-700 text-xs font-medium"
    >
      {dir === "asc" ? (
        <>
          <ArrowDownAZ className="w-4 h-4" />
          A→Z
        </>
      ) : (
        <>
          <ArrowUpZA className="w-4 h-4" />
          Z→A
        </>
      )}
    </button>
  );
}

export default function SortShowcase() {
  return (
    <div className="max-w-5xl space-y-3">
      <Frame label="1. Native + label" note="一番素朴。select 1つで全部">
        <Native />
      </Frame>

      <Frame label="2. Inline label (Amazon / 楽天)" note="文中に並べ替えリンク">
        <InlineLabel />
      </Frame>

      <Frame label="3. Key + Direction split" note="左で項目、右で昇降切替">
        <KeyDirection />
      </Frame>

      <Frame label="4. Segmented chips" note="3〜4択の排他、視認性最高">
        <SegmentedChips />
      </Frame>

      <Frame label="5. Table column sort" note="ヘッダー click で↑↓切替">
        <TableSort />
      </Frame>

      <Frame label="6. Active sort badge" note="現在のソートを × で解除可">
        <SortBadge />
      </Frame>

      <Frame label="7. Menu (with check + direction)" note="ドロップダウンに項目+順序を両方">
        <MenuWithCheck />
      </Frame>

      <Frame label="8. Direction-only toggle" note="キーが暗黙のとき">
        <DirectionToggle />
      </Frame>

      <Frame
        label="9. Multi-key (primary + secondary)"
        note="優先順に並べる。Excel の高度な並べ替え"
      >
        <MultiKey />
      </Frame>

      <Frame label="10. Smart / suggestion" note="意味付きラベル: 「トレンド」「高評価」等">
        <SmartSort />
      </Frame>

      <Frame label="11. Toolbar (sort + view mode)" note="リストヘッダーの定型">
        <SortAndView />
      </Frame>

      <Frame label="12. Quick A↔Z toggle" note="アイコン1つで瞬時に切替">
        <QuickToggle />
      </Frame>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">選び方のヒント</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>選択肢が少ない (2〜4)</b> → Segmented chips / Direction toggle
          </li>
          <li>
            <b>選択肢が多い (5〜)</b> → Native / Custom dropdown / Menu
          </li>
          <li>
            <b>方向も切替えたい</b> → Key + Direction split / Menu (項目+順序)
          </li>
          <li>
            <b>表に組み込む</b> → Table column sort (ヘッダー click)
          </li>
          <li>
            <b>複数キーで並べる</b> → Multi-key (Excel / DB クエリ的)
          </li>
          <li>
            <b>「今のソート」を強調</b> → Active badge (×で解除)
          </li>
          <li>
            <b>意味づけ</b> → Smart suggestion (トレンド/高評価 等の名前)
          </li>
          <li>列表 / グリッドの切替と同居するなら Toolbar 形式に</li>
        </ul>
      </section>
    </div>
  );
}
