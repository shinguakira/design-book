type Base = { name: string; rgb: [number, number, number] };

const BASES: Base[] = [
  { name: "Blue", rgb: [37, 99, 235] },
  { name: "Emerald", rgb: [16, 185, 129] },
  { name: "Rose", rgb: [225, 29, 72] },
  { name: "Violet", rgb: [124, 58, 237] },
];

const mix = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const rgb = ([r, g, b]: [number, number, number]) => `rgb(${r}, ${g}, ${b})`;

const tint = (c: [number, number, number], t: number): [number, number, number] => [
  mix(c[0], 255, t),
  mix(c[1], 255, t),
  mix(c[2], 255, t),
];
const shade = (c: [number, number, number], t: number): [number, number, number] => [
  mix(c[0], 0, t),
  mix(c[1], 0, t),
  mix(c[2], 0, t),
];

const tones = (base: [number, number, number]) => [
  { label: "Tint 80%", color: tint(base, 0.8) },
  { label: "Tint 60%", color: tint(base, 0.6) },
  { label: "Tint 40%", color: tint(base, 0.4) },
  { label: "Tint 20%", color: tint(base, 0.2) },
  { label: "Base", color: base },
  { label: "Shade 20%", color: shade(base, 0.2) },
  { label: "Shade 40%", color: shade(base, 0.4) },
  { label: "Shade 60%", color: shade(base, 0.6) },
];

export default function TintsAndShades() {
  return (
    <div className="max-w-5xl space-y-6">
      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>1色から派生色を作る基本テクニック。</p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>
            <b>Tint</b> — ベースに白を混ぜる。明るく、淡くなる。背景・hover・disabled に。
          </li>
          <li>
            <b>Shade</b> — ベースに黒を混ぜる。暗く、深くなる。テキスト・active・border に。
          </li>
          <li>
            <b>Tone</b> — グレーを混ぜる。彩度を下げる (このページでは省略)。
          </li>
        </ul>
        <p className="text-zinc-600">
          基準1色 + Tint 2〜3段階 + Shade 2〜3段階 で、UIに必要な階層がほぼ作れる。Tailwind の
          50〜900 のスケールも同じ発想。
        </p>
      </section>

      <div className="space-y-5">
        {BASES.map((b) => (
          <section key={b.name}>
            <div className="text-xs font-medium text-zinc-500 mb-2">{b.name}</div>
            <div className="grid grid-cols-8 gap-2">
              {tones(b.rgb).map((t) => (
                <div key={t.label} className="text-center">
                  <div className="h-16 rounded shadow-sm" style={{ background: rgb(t.color) }} />
                  <div className="text-[10px] text-zinc-500 mt-1">{t.label}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
