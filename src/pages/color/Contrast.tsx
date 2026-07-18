type Hex = string;

const srgbToLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const luminance = (hex: Hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
};

const ratio = (fg: Hex, bg: Hex) => {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const a = Math.max(L1, L2);
  const b = Math.min(L1, L2);
  return (a + 0.05) / (b + 0.05);
};

const BACKGROUNDS: { hex: Hex; label: string }[] = [
  { hex: "#ffffff", label: "White" },
  { hex: "#f4f4f5", label: "zinc-100" },
  { hex: "#e4e4e7", label: "zinc-200" },
  { hex: "#a1a1aa", label: "zinc-400" },
  { hex: "#52525b", label: "zinc-600" },
  { hex: "#18181b", label: "zinc-900" },
  { hex: "#2563eb", label: "blue-600" },
  { hex: "#10b981", label: "emerald-500" },
  { hex: "#f59e0b", label: "amber-500" },
  { hex: "#dc2626", label: "red-600" },
];

const rate = (r: number) => {
  if (r >= 7) return { tag: "AAA", cls: "bg-emerald-100 text-emerald-800" };
  if (r >= 4.5) return { tag: "AA", cls: "bg-blue-100 text-blue-800" };
  if (r >= 3) return { tag: "AA Large", cls: "bg-amber-100 text-amber-800" };
  return { tag: "Fail", cls: "bg-rose-100 text-rose-800" };
};

export default function Contrast() {
  return (
    <div className="max-w-5xl space-y-6">
      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>WCAG のコントラスト基準。文字と背景の輝度比で判定する。</p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>
            <b>AAA</b> 7.0 以上 — 視覚障害者を含むすべてのユーザーが読める
          </li>
          <li>
            <b>AA</b> 4.5 以上 — 通常テキストの最低基準
          </li>
          <li>
            <b>AA Large</b> 3.0 以上 — 18pt以上 or 太字14pt以上ならOK
          </li>
          <li>
            <b>Fail</b> 3.0 未満 — UI要素や装飾文字以外では使わない
          </li>
        </ul>
        <p className="text-zinc-600">
          特に <b>中間グレー × 白テキスト</b> が落とし穴。zinc-400 や blue-400 上の白は読めない。
        </p>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          各背景 × 白/黒テキスト
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left font-medium text-zinc-500 px-4 py-2">背景</th>
                <th className="text-left font-medium text-zinc-500 px-4 py-2">白テキスト</th>
                <th className="text-left font-medium text-zinc-500 px-4 py-2">黒テキスト</th>
              </tr>
            </thead>
            <tbody>
              {BACKGROUNDS.map((bg) => {
                const rW = ratio("#ffffff", bg.hex);
                const rB = ratio("#000000", bg.hex);
                const tagW = rate(rW);
                const tagB = rate(rB);
                return (
                  <tr key={bg.hex} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded border border-zinc-200"
                          style={{ background: bg.hex }}
                        />
                        <div>
                          <div className="font-medium">{bg.label}</div>
                          <div className="text-xs text-zinc-500 font-mono">{bg.hex}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded text-white text-sm"
                          style={{ background: bg.hex }}
                        >
                          Aa サンプル
                        </span>
                        <span className="text-xs font-mono text-zinc-600">{rW.toFixed(2)}:1</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${tagW.cls}`}>
                          {tagW.tag}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded text-black text-sm"
                          style={{ background: bg.hex }}
                        >
                          Aa サンプル
                        </span>
                        <span className="text-xs font-mono text-zinc-600">{rB.toFixed(2)}:1</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${tagB.cls}`}>
                          {tagB.tag}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
