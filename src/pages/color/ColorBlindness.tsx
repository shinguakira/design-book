const SAMPLE = (
  <div className="space-y-3">
    <div className="flex gap-2 flex-wrap">
      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-medium">
        ● 成功
      </span>
      <span className="inline-flex items-center rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-xs font-medium">
        ● エラー
      </span>
      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-medium">
        ● 警告
      </span>
      <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-medium">
        ● 情報
      </span>
    </div>
    <div className="flex gap-2">
      <button className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">保存</button>
      <button className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">削除</button>
    </div>
    <div className="flex items-end gap-2 h-20">
      <div className="w-6 bg-red-500" style={{ height: "40%" }} />
      <div className="w-6 bg-green-500" style={{ height: "70%" }} />
      <div className="w-6 bg-blue-500" style={{ height: "50%" }} />
      <div className="w-6 bg-amber-500" style={{ height: "90%" }} />
      <div className="w-6 bg-purple-500" style={{ height: "60%" }} />
    </div>
  </div>
);

const VARIANTS = [
  { id: "normal", label: "通常 (色覚正常)", filter: undefined, note: "比較用" },
  {
    id: "proto",
    label: "Protanopia (1型 / 赤錐体欠損)",
    filter: "url(#proto)",
    note: "男性の約1%。赤が暗く茶色っぽく見える。",
  },
  {
    id: "deutero",
    label: "Deuteranopia (2型 / 緑錐体欠損)",
    filter: "url(#deutero)",
    note: "男性の約1%。最も多い色盲タイプ。赤と緑の区別が困難。",
  },
  {
    id: "trito",
    label: "Tritanopia (3型 / 青錐体欠損)",
    filter: "url(#trito)",
    note: "約0.01%と稀。青と黄、緑と紫が区別しにくい。",
  },
  {
    id: "achroma",
    label: "Achromatopsia (全色盲)",
    filter: "url(#achroma)",
    note: "約0.003%と極めて稀。色を全く認識できない。",
  },
];

export default function ColorBlindness() {
  return (
    <div className="max-w-5xl space-y-6">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="proto">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0     0 0
                      0.558 0.442 0     0 0
                      0     0.242 0.758 0 0
                      0     0     0     1 0"
            />
          </filter>
          <filter id="deutero">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0   0 0
                      0.7   0.3   0   0 0
                      0     0.3   0.7 0 0
                      0     0     0   1 0"
            />
          </filter>
          <filter id="trito">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05  0     0 0
                      0    0.433 0.567 0 0
                      0    0.475 0.525 0 0
                      0    0     0     1 0"
            />
          </filter>
          <filter id="achroma">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0"
            />
          </filter>
        </defs>
      </svg>

      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>
          色覚特性 (色盲・色弱) は男性の約 <b>8%</b>、女性の約 <b>0.5%</b> が該当する。日本人男性
          20人に 1人。決して稀ではない。
        </p>
        <p className="text-zinc-600">
          「赤と緑」を主役に状態を区別するUI (成功/エラー、買い/売り、+/-)
          は、特に2型色覚にとって読み取れない。実際の見え方を以下の SVG フィルタで再現する。
        </p>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          同じUIを各色覚特性で見ると
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VARIANTS.map((v) => (
            <div key={v.id} className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-200 bg-zinc-50">
                <div className="text-sm font-medium">{v.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{v.note}</div>
              </div>
              <div className="p-4" style={{ filter: v.filter }}>
                {SAMPLE}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          設計時のチェックリスト
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm text-zinc-700 space-y-2">
          <div>
            <b>✓ 色だけで意味を伝えない。</b>
            アイコン・テキスト・形・位置を併用する。
          </div>
          <div className="pl-5 text-zinc-600">
            例: エラー = 赤 + ⚠ アイコン + 「エラー」テキスト
          </div>
          <div>
            <b>✓ 赤/緑ペアに頼らない。</b>
            「成功/失敗」を青/赤、緑/オレンジなど判別しやすい組合せに置き換える。
          </div>
          <div>
            <b>✓ コントラストを十分に取る。</b>
            色が違っても明度差がないと色盲ユーザーには判別不能。
          </div>
          <div>
            <b>✓ チャートはパターン/形/凡例 を併用。</b>
            折れ線は実線/破線、棒は塗りつぶし/ハッチング、点はマーカー形状で区別。
          </div>
          <div>
            <b>✓ 実機テスト。</b>
            Chrome DevTools の Rendering タブで色覚エミュレーション可能。
          </div>
        </div>
      </section>
    </div>
  );
}
