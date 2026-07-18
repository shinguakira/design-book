type Scheme = {
  title: string;
  description: string;
  colors: { hex: string; label: string }[];
};

const SCHEMES: Scheme[] = [
  {
    title: "Monochromatic — 単色",
    description:
      "1つの色相だけで、明度・彩度を変えてバリエーションを作る。落ち着いてまとまるが、単調になりやすい。",
    colors: [
      { hex: "#dbeafe", label: "明" },
      { hex: "#60a5fa", label: "" },
      { hex: "#2563eb", label: "基準" },
      { hex: "#1e3a8a", label: "暗" },
    ],
  },
  {
    title: "Analogous — 類似色",
    description: "カラーホイール上で隣り合う色。自然で穏やかな印象。背景・イラストに向く。",
    colors: [
      { hex: "#2563eb", label: "青" },
      { hex: "#06b6d4", label: "シアン" },
      { hex: "#10b981", label: "緑" },
    ],
  },
  {
    title: "Complementary — 補色",
    description:
      "カラーホイールで真向かいの色。コントラストが最大で、CTAを目立たせるのに最適。使いすぎ注意。",
    colors: [
      { hex: "#2563eb", label: "青" },
      { hex: "#f59e0b", label: "オレンジ (補色)" },
    ],
  },
  {
    title: "Split Complementary — 分裂補色",
    description: "補色の両隣2色を使う。補色よりやわらかく、初心者でも破綻しにくい。",
    colors: [
      { hex: "#2563eb", label: "青" },
      { hex: "#f97316", label: "オレンジ寄り" },
      { hex: "#eab308", label: "黄寄り" },
    ],
  },
  {
    title: "Triadic — 三角配色",
    description:
      "カラーホイールを3等分した色。バランスは良いがビビッドになりがち。1色を主役にして残り2色を抑える。",
    colors: [
      { hex: "#2563eb", label: "青" },
      { hex: "#dc2626", label: "赤" },
      { hex: "#eab308", label: "黄" },
    ],
  },
  {
    title: "Tetradic — 四角配色",
    description: "2組の補色を使う。情報密度の高いダッシュボード等で各カテゴリを区別したい時に。",
    colors: [
      { hex: "#2563eb", label: "青" },
      { hex: "#f59e0b", label: "オレンジ" },
      { hex: "#9333ea", label: "紫" },
      { hex: "#22c55e", label: "緑" },
    ],
  },
];

export default function ColorHarmony() {
  return (
    <div className="max-w-4xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        カラーホイール上の位置関係で色を組み合わせる定石。配色に迷ったらまずここから。
      </p>

      <div className="space-y-4">
        {SCHEMES.map((s) => (
          <div key={s.title} className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="font-semibold">{s.title}</div>
            <p className="text-sm text-zinc-600 mt-1">{s.description}</p>
            <div className="mt-4 flex gap-2">
              {s.colors.map((c) => (
                <div key={c.hex} className="text-center">
                  <div className="w-20 h-20 rounded-lg shadow-sm" style={{ background: c.hex }} />
                  <div className="text-xs text-zinc-500 mt-1 font-mono">{c.hex}</div>
                  {c.label && <div className="text-xs text-zinc-600">{c.label}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
