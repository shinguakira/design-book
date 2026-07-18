import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronRight, Clock, Command, Star, Trash2 } from "lucide-react";

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

function Frame({
  n,
  title,
  slots,
  children,
}: {
  n: number;
  title: string;
  slots: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white">
      <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50">
        <div className="text-xs font-medium text-zinc-800">
          {n}. {title}
        </div>
        <div className="text-[10px] text-zinc-500 font-mono">{slots}</div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function Trigger({
  onClick,
  open,
  children,
  w = 220,
}: {
  onClick: () => void;
  open: boolean;
  children: React.ReactNode;
  w?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-md border bg-white h-8 px-3 text-sm text-left ${
        open ? "border-zinc-900 ring-2 ring-zinc-900/10" : "border-zinc-300"
      }`}
      style={{ width: w }}
    >
      <span className="truncate">{children}</span>
      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 flex-none ml-2" />
    </button>
  );
}

function Panel({ children, w = 220 }: { children: React.ReactNode; w?: number }) {
  return (
    <div
      className="mt-1 rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden"
      style={{ width: w }}
    >
      {children}
    </div>
  );
}

/* Wrapper to reduce boilerplate */
function useSel(init: string) {
  const [open, setOpen] = useState(true);
  const [v, setV] = useState(init);
  const ref = useOutside<HTMLDivElement>(() => {
    /* leave open — always-open showcase */
  });
  return { open, setOpen, v, setV, ref };
}

/* ── 1. text only ────────────────────────── */
function S1() {
  const { open, setOpen, v, setV, ref } = useSel("Bravo");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {["Alpha", "Bravo", "Charlie", "Delta"].map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
            >
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 2. leading addon + text ─────────────── */
function S2() {
  const items = [
    { color: "#ef4444", name: "Red" },
    { color: "#10b981", name: "Emerald" },
    { color: "#3b82f6", name: "Blue" },
    { color: "#f59e0b", name: "Amber" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Blue");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.name}
              onClick={() => {
                setV(it.name);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${v === it.name ? "bg-zinc-50" : ""}`}
            >
              <span
                className="w-3 h-3 rounded-full ring-1 ring-inset ring-black/10 flex-none"
                style={{ background: it.color }}
              />
              {it.name}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 3. text + trailing meta ─────────────── */
function S3() {
  const items = [
    { t: "Inbox", meta: "128" },
    { t: "Snoozed", meta: "3" },
    { t: "Archive", meta: "2451" },
    { t: "Spam", meta: "0" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Inbox");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <span>{it.t}</span>
              <span className="text-[10px] text-zinc-500 font-mono">{it.meta}</span>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 4. leading + text + trailing ────────── */
function S4() {
  const items = [
    { t: "Edit", k: "⌘E" },
    { t: "Favorite", k: "⌘D" },
    { t: "Delete", k: "⌘⌫" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Edit");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-zinc-200 flex-none" />
                {it.t}
              </span>
              <kbd className="text-[10px] text-zinc-500 font-mono">{it.k}</kbd>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 5. two-line: title + subtitle ──────── */
function S5() {
  const items = [
    { t: "Free", d: "個人向け · 3プロジェクトまで" },
    { t: "Pro", d: "中規模チーム向け · 無制限" },
    { t: "Enterprise", d: "SSO / 監査ログ / SLA" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Pro");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={260}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <div className="text-sm font-medium">{it.t}</div>
              <div className="text-xs text-zinc-500">{it.d}</div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 6. leading + two-line ──────────────── */
function S6() {
  const items = [
    { t: "Personal", d: "自分だけがアクセス可" },
    { t: "Team", d: "チームメンバー全員" },
    { t: "Public", d: "リンクを知る全員" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Team");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={280}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <span className="w-4 h-4 rounded-sm bg-zinc-200 mt-0.5 flex-none" />
              <div>
                <div className="text-sm font-medium">{it.t}</div>
                <div className="text-xs text-zinc-500">{it.d}</div>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 7. large media (thumbnail dominates) ─ */
function S7() {
  const items = [
    { t: "Sunset over Mt.Fuji", c: "from-orange-400 to-rose-600" },
    { t: "Ocean waves", c: "from-cyan-400 to-blue-700" },
    { t: "Forest canopy", c: "from-emerald-400 to-green-800" },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Ocean waves");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v}
      </Trigger>
      {open && (
        <Panel w={280}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <div className={`w-10 h-10 rounded bg-gradient-to-br ${it.c} flex-none`} />
              <div className="text-sm truncate text-left">{it.t}</div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 8. rich card (multi-line + inline badges + meta row) ─ */
function S8() {
  const items = [
    {
      t: "Q4 Product Launch",
      meta: "25 tasks · 3 members",
      time: "2h ago",
      tag: "On track",
      ok: true,
    },
    {
      t: "Design System v2",
      meta: "11 tasks · 2 members",
      time: "1d ago",
      tag: "At risk",
      ok: false,
    },
    { t: "Website Refresh", meta: "4 tasks · 1 member", time: "3d ago", tag: "On track", ok: true },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Q4 Product Launch");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v}
      </Trigger>
      {open && (
        <Panel w={320}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{it.t}</div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${it.ok ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                >
                  {it.tag}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between text-[11px] text-zinc-500">
                <span>{it.meta}</span>
                <span>{it.time}</span>
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 9. in-body content element (progress bar) ─ */
function S9() {
  const items = [
    { t: "Free", u: 30 },
    { t: "Pro", u: 68 },
    { t: "Team", u: 92 },
  ];
  const { open, setOpen, v, setV, ref } = useSel("Pro");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={260}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <div className="flex items-center justify-between text-sm">
                <span>{it.t}</span>
                <span className="text-xs text-zinc-500">{it.u}%</span>
              </div>
              <div className="mt-1 h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${it.u > 80 ? "bg-rose-500" : it.u > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                  style={{ width: `${it.u}%` }}
                />
              </div>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 10. prefix selection: checkmark (single) ─ */
function S10() {
  const items = ["Low", "Medium", "High", "Critical"];
  const { open, setOpen, v, setV, ref } = useSel("Medium");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {items.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
              }}
              className="w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100"
            >
              <span className="w-4 flex-none">
                {v === o && <Check className="w-4 h-4 text-emerald-600" />}
              </span>
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 11. prefix selection: checkbox (multi, stays open) ─ */
function S11() {
  const items = ["Design", "Bug", "Docs", "Enhancement"];
  const [open, setOpen] = useState(true);
  const [sel, setSel] = useState<Set<string>>(new Set(["Design", "Bug"]));
  const ref = useOutside<HTMLDivElement>(() => {
    /* showcase: no close */
  });
  const toggle = (t: string) => {
    const n = new Set(sel);
    n.has(t) ? n.delete(t) : n.add(t);
    setSel(n);
  };
  const label =
    sel.size === 0 ? "選択なし" : sel.size === 1 ? Array.from(sel)[0] : `${sel.size}件選択中`;
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {label}
      </Trigger>
      {open && (
        <Panel>
          {items.map((o) => (
            <button
              key={o}
              onClick={() => toggle(o)}
              className="w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100"
            >
              <span
                className={`w-4 h-4 rounded border-2 grid place-items-center flex-none ${sel.has(o) ? "bg-zinc-900 border-zinc-900" : "border-zinc-300"}`}
              >
                {sel.has(o) && <Check className="w-3 h-3 text-white" />}
              </span>
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 12. trailing hover-revealed actions ─── */
function S12() {
  const items = ["My templates", "Shared", "Archived"];
  const { open, setOpen, v, setV, ref } = useSel("My templates");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel w={280}>
          {items.map((o) => (
            <div
              key={o}
              className={`px-3 py-1.5 text-sm flex items-center justify-between group hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
            >
              <button
                onClick={() => {
                  setV(o);
                }}
                className="flex-1 text-left"
              >
                {o}
              </button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button className="p-1 rounded hover:bg-zinc-200">
                  <Star className="w-3 h-3 text-zinc-600" />
                </button>
                <button className="p-1 rounded hover:bg-zinc-200">
                  <Trash2 className="w-3 h-3 text-zinc-600" />
                </button>
              </div>
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 13. section headers (grouped rows) ── */
function S13() {
  const groups = [
    { g: "Frontend", items: ["React", "Vue", "Svelte"] },
    { g: "Backend", items: ["Node", "Go", "Rust"] },
  ];
  const { open, setOpen, v, setV, ref } = useSel("React");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          {groups.map((gr, gi) => (
            <div key={gr.g}>
              {gi > 0 && <div className="border-t border-zinc-100" />}
              <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                {gr.g}
              </div>
              {gr.items.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setV(o);
                  }}
                  className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
                >
                  {o}
                </button>
              ))}
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 14. loading skeleton row ────────────── */
function S14() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [v, setV] = useState("データを読み込む…");
  const ref = useOutside<HTMLDivElement>(() => {
    /* showcase: no close */
  });
  useEffect(() => {
    if (open && loading) {
      const t = setTimeout(() => setLoading(false), 1400);
      return () => clearTimeout(t);
    }
  }, [open, loading]);
  const items = ["Roadmap Q1", "Q4 Retrospective", "Onboarding v2"];
  return (
    <div ref={ref} className="relative">
      <Trigger
        onClick={() => {
          setOpen(!open);
          setLoading(true);
        }}
        open={open}
      >
        {v}
      </Trigger>
      {open && (
        <Panel>
          {loading
            ? [80, 60, 90, 50].map((w, i) => (
                <div key={i} className="px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-200 animate-pulse flex-none" />
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-2 rounded bg-zinc-200 animate-pulse"
                      style={{ width: `${w}%` }}
                    />
                    <div className="h-1.5 rounded bg-zinc-100 animate-pulse w-1/2" />
                  </div>
                </div>
              ))
            : items.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setV(o);
                  }}
                  className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
                >
                  {o}
                </button>
              ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 15. empty state ─────────────────────── */
function S15() {
  const [open, setOpen] = useState(true);
  const ref = useOutside<HTMLDivElement>(() => {
    /* showcase: no close */
  });
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        選択…
      </Trigger>
      {open && (
        <Panel>
          <div className="px-3 py-6 grid place-items-center text-center">
            <div className="w-10 h-10 rounded-full bg-zinc-100 grid place-items-center mb-2">
              <Star className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-xs text-zinc-600">まだ候補がありません</div>
            <button className="mt-2 text-xs text-blue-600 hover:underline">+ 新規追加</button>
          </div>
        </Panel>
      )}
    </div>
  );
}

/* ── 16. submenu trigger ─────────────────── */
function S16() {
  const [open, setOpen] = useState(true);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const ref = useOutside<HTMLDivElement>(() => setSubOpen(null));
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        アクション…
      </Trigger>
      {open && (
        <Panel>
          {["Cut", "Copy"].map((o) => (
            <button
              key={o}
              onClick={() => {}}
              className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
            >
              {o}
            </button>
          ))}
          <div
            className="relative px-3 py-1.5 text-sm flex items-center justify-between hover:bg-zinc-100 cursor-pointer"
            onMouseEnter={() => setSubOpen("paste")}
            onMouseLeave={() => setSubOpen(null)}
          >
            <span>Paste as...</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            {subOpen === "paste" && (
              <div className="absolute left-full top-0 ml-1 rounded-md border border-zinc-200 bg-white shadow-lg overflow-hidden w-40 z-30">
                {["Plain text", "Markdown", "HTML"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {}}
                    className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
}

/* ── 17. inline highlighted text (search mark) ─ */
function S17() {
  const all = ["Vercel", "Vector graphics", "Very old drafts", "Ventures", "Vault"];
  const [open, setOpen] = useState(true);
  const [q, setQ] = useState("Ver");
  const [v, setV] = useState("Vercel");
  const ref = useOutside<HTMLDivElement>(() => {
    /* showcase: no close */
  });
  const filtered = all.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v}
      </Trigger>
      {open && (
        <Panel w={260}>
          <div className="p-2 border-b border-zinc-100">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="検索…"
              className="w-full text-xs px-2 py-1 border border-zinc-200 rounded"
              autoFocus
            />
          </div>
          {filtered.length === 0 && <div className="px-3 py-2 text-xs text-zinc-500">一致なし</div>}
          {filtered.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
              }}
              className={`w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
            >
              {o.split(new RegExp(`(${q})`, "i")).map((p, k) =>
                q && p.toLowerCase() === q.toLowerCase() ? (
                  <mark key={k} className="bg-amber-200 text-zinc-900 font-semibold rounded">
                    {p}
                  </mark>
                ) : (
                  <span key={k}>{p}</span>
                ),
              )}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 18. command-palette (leading + text + trailing kind + trailing kbd) ─ */
function S18() {
  const items = [
    { t: "新しいドキュメント", k: "D", kind: "Doc" },
    { t: "プロフィールを開く", k: "P", kind: "Nav" },
    { t: "お気に入り一覧", k: "F", kind: "View" },
  ];
  const { open, setOpen, v, setV, ref } = useSel(items[0].t);
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open} w={240}>
        {v}
      </Trigger>
      {open && (
        <Panel w={320}>
          {items.map((it) => (
            <button
              key={it.t}
              onClick={() => {
                setV(it.t);
              }}
              className={`w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-100 ${v === it.t ? "bg-zinc-50" : ""}`}
            >
              <span className="w-3 h-3 rounded-sm bg-zinc-200 flex-none" />
              <span className="flex-1 truncate text-left">{it.t}</span>
              <span className="text-[10px] text-zinc-400 uppercase">{it.kind}</span>
              <kbd className="text-[10px] font-mono border border-zinc-200 rounded px-1 bg-zinc-50 text-zinc-600 flex items-center gap-0.5">
                <Command className="w-2.5 h-2.5" />
                {it.k}
              </kbd>
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 19. recently-used pinned section ───── */
function S19() {
  const recent = ["Q4 Report", "Handoff notes"];
  const rest = ["Roadmap 2026", "Design principles", "Onboarding"];
  const { open, setOpen, v, setV, ref } = useSel("Q4 Report");
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        {v}
      </Trigger>
      {open && (
        <Panel>
          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            最近使った
          </div>
          {recent.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
              }}
              className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
            >
              {o}
            </button>
          ))}
          <div className="border-t border-zinc-100" />
          <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
            すべて
          </div>
          {rest.map((o) => (
            <button
              key={o}
              onClick={() => {
                setV(o);
              }}
              className={`w-full px-3 py-1 text-sm text-left hover:bg-zinc-100 ${v === o ? "bg-zinc-50" : ""}`}
            >
              {o}
            </button>
          ))}
        </Panel>
      )}
    </div>
  );
}

/* ── 20. destructive divider row (footer action) ─ */
function S20() {
  const [open, setOpen] = useState(true);
  const ref = useOutside<HTMLDivElement>(() => {
    /* showcase: no close */
  });
  return (
    <div ref={ref} className="relative">
      <Trigger onClick={() => setOpen(!open)} open={open}>
        アカウント
      </Trigger>
      {open && (
        <Panel>
          {["プロフィール編集", "設定", "サブスクリプション"].map((o) => (
            <button
              key={o}
              onClick={() => {}}
              className="w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100"
            >
              {o}
            </button>
          ))}
          <div className="border-t border-zinc-100" />
          <button
            onClick={() => {}}
            className="w-full px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left"
          >
            <Trash2 className="w-3.5 h-3.5" />
            アカウントを削除
          </button>
        </Panel>
      )}
    </div>
  );
}

export default function SelectOptionShowcase() {
  const patterns: { title: string; slots: string; Comp: () => React.ReactNode }[] = [
    { title: "Bare text", slots: "[ text ]", Comp: S1 },
    { title: "Leading + text", slots: "[ ● | text ]", Comp: S2 },
    { title: "Text + trailing meta", slots: "[ text ····· meta ]", Comp: S3 },
    { title: "Leading + text + trailing", slots: "[ ● | text ····· ⌘ ]", Comp: S4 },
    { title: "Two-line: title + subtitle", slots: "[ title \\n subtitle ]", Comp: S5 },
    { title: "Leading + two-line", slots: "[ ■ | title \\n subtitle ]", Comp: S6 },
    { title: "Large media + text", slots: "[ ▣ | title ]  ← 40px+ サムネ", Comp: S7 },
    {
      title: "Rich card (badges + meta row)",
      slots: "[ title  🏷️  \\n meta ····· time ]",
      Comp: S8,
    },
    {
      title: "In-body element (progress bar)",
      slots: "[ title ····· meta \\n ▬▬▬▬▬── ]",
      Comp: S9,
    },
    { title: "Prefix checkmark (single-select)", slots: "[ ✓ | text ]", Comp: S10 },
    { title: "Prefix checkbox (multi-select)", slots: "[ ☑ | text ] × 開いたまま", Comp: S11 },
    { title: "Trailing hover actions", slots: "[ text ····· (hover→ icons) ]", Comp: S12 },
    {
      title: "Section headers (grouped)",
      slots: "GROUP A\\n  row \\n  row \\n GROUP B ...",
      Comp: S13,
    },
    { title: "Loading skeleton row", slots: "[ ○ | ─── \\n ── ] × pulse", Comp: S14 },
    { title: "Empty state (no rows)", slots: "(◯ アイコン + メッセージ + CTA)", Comp: S15 },
    { title: "Submenu trigger", slots: "[ text ····· › ] → hover でサブ展開", Comp: S16 },
    { title: "Inline text highlight (search)", slots: "[ Ve̲r̲cel ] マッチ部を <mark>", Comp: S17 },
    { title: "Cmd palette (multi-trailing)", slots: "[ ● | text ··· KIND ⌘K ]", Comp: S18 },
    {
      title: "Pinned section (recent + all)",
      slots: "⏱ RECENT\\n row \\n ─── \\n ALL\\n row ...",
      Comp: S19,
    },
    { title: "Destructive footer row", slots: "[ text ] ×N \\n ─── \\n [ 🗑 delete ]", Comp: S20 },
  ];
  return (
    <div className="max-w-6xl space-y-3">
      <p className="text-sm text-zinc-700">
        Select の <b>オプション行</b> の <b>レイアウト</b> 20種。データ (色/国旗/通貨/
        アバター/タイムゾーン等) の違いはレイアウトを変えないので同一パターンに集約。
        「スロット構成そのものが違う」ものだけ残した。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {patterns.map((p, i) => (
          <Frame key={i} n={i + 1} title={p.title} slots={p.slots}>
            <p.Comp />
          </Frame>
        ))}
      </div>

      <section className="rounded-md border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
        <div className="font-semibold mb-1">スロット分類</div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>1行: 中身 = text のみ / 左 addon / 右 meta / 両サイド</li>
          <li>2行: title + subtitle (± 左 addon / 大きい media)</li>
          <li>多層: rich card (badges + meta row) / in-body 要素 (progress bar)</li>
          <li>選択マーカー: prefix checkmark (単) / prefix checkbox (複)</li>
          <li>操作: 右 hover actions / submenu trigger (chevron)</li>
          <li>グルーピング: section headers / pinned (recent) / footer divider (destructive)</li>
          <li>状態: skeleton (pulse) / empty state (rows 差替え)</li>
          <li>テキスト装飾: 検索マッチ &lt;mark&gt; 強調</li>
        </ul>
        <div className="mt-2 text-[11px] text-blue-800">
          <b>省いたもの:</b> country flag / currency / timezone / avatar / color swatch は
          「左に小さいマーカー + text」の中身違いなので #2 に集約。単に色や flag を
          交換しているだけの類はレイアウトパターンとして重複しない。
        </div>
      </section>
    </div>
  );
}
