type Row = {
  color: string
  hex: string
  meanings: { region: string; meaning: string; tone: 'pos' | 'neg' | 'neu' }[]
}

const ROWS: Row[] = [
  {
    color: '赤',
    hex: '#dc2626',
    meanings: [
      { region: '欧米', meaning: '危険・情熱・警告・愛', tone: 'neu' },
      { region: '中国・日本', meaning: '幸運・繁栄・祝祭 (婚礼に使う)', tone: 'pos' },
      { region: 'インド', meaning: '純潔・婚礼の色 (花嫁の衣装)', tone: 'pos' },
      { region: '南アフリカ', meaning: '喪・追悼', tone: 'neg' },
    ],
  },
  {
    color: '白',
    hex: '#ffffff',
    meanings: [
      { region: '欧米', meaning: '純潔・清潔・平和・婚礼', tone: 'pos' },
      { region: '中国・日本', meaning: '喪・葬儀の色', tone: 'neg' },
      { region: 'インド', meaning: '喪 (寡婦の衣装)', tone: 'neg' },
      { region: 'イスラム圏', meaning: '純粋・神聖', tone: 'pos' },
    ],
  },
  {
    color: '黒',
    hex: '#000000',
    meanings: [
      { region: '欧米', meaning: 'フォーマル・洗練・死・喪', tone: 'neu' },
      { region: 'アフリカの一部', meaning: '成熟・男性性・知恵', tone: 'pos' },
      { region: '中国', meaning: '黒は若さの色 (五行で水・北を象徴)', tone: 'neu' },
    ],
  },
  {
    color: '緑',
    hex: '#16a34a',
    meanings: [
      { region: '欧米', meaning: '自然・安全 (GO)・成長・お金 (米ドル)', tone: 'pos' },
      { region: 'イスラム圏', meaning: '神聖な色 (預言者の色)', tone: 'pos' },
      { region: '中国', meaning: '緑の帽子は「妻が浮気している夫」を意味し、強い侮辱', tone: 'neg' },
      { region: 'アイルランド', meaning: '国の象徴・幸運 (シャムロック)', tone: 'pos' },
    ],
  },
  {
    color: '黄',
    hex: '#eab308',
    meanings: [
      { region: '欧米', meaning: '注意・警告・臆病・幸福', tone: 'neu' },
      { region: '中国', meaning: '皇帝・最高位の色 (皇帝にしか着られなかった)', tone: 'pos' },
      { region: '日本', meaning: '勇気・富', tone: 'pos' },
      { region: 'タイ', meaning: '月曜日の色・王室', tone: 'pos' },
      { region: 'エジプト', meaning: '喪の色', tone: 'neg' },
    ],
  },
  {
    color: '青',
    hex: '#2563eb',
    meanings: [
      { region: '欧米', meaning: '信頼・誠実・男性性 (ビジネスで多用)', tone: 'pos' },
      { region: '中東・地中海', meaning: '邪眼除け・守護 (ナザールボンジュウ)', tone: 'pos' },
      { region: 'ヒンドゥー', meaning: 'クリシュナ神の色・神聖', tone: 'pos' },
      { region: '中国', meaning: '不死・癒し', tone: 'pos' },
    ],
  },
  {
    color: '紫',
    hex: '#9333ea',
    meanings: [
      { region: '欧米', meaning: '王族・贅沢・霊性', tone: 'pos' },
      { region: 'タイ', meaning: '寡婦の喪服の色', tone: 'neg' },
      { region: 'ブラジル', meaning: '喪・死', tone: 'neg' },
      { region: '日本', meaning: '高貴・優雅 (古来高位の色)', tone: 'pos' },
    ],
  },
  {
    color: 'オレンジ',
    hex: '#f97316',
    meanings: [
      { region: '欧米', meaning: '元気・親しみやすさ・ハロウィン', tone: 'pos' },
      { region: 'ヒンドゥー・仏教', meaning: '神聖・サフラン色は僧侶の衣', tone: 'pos' },
      { region: '北アイルランド', meaning: 'プロテスタント (政治的に敏感な色)', tone: 'neu' },
    ],
  },
]

const toneClass: Record<'pos' | 'neg' | 'neu', string> = {
  pos: 'bg-emerald-50 text-emerald-800',
  neg: 'bg-rose-50 text-rose-800',
  neu: 'bg-zinc-50 text-zinc-700',
}

export default function CulturalMeaning() {
  return (
    <div className="max-w-5xl space-y-6">
      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>
          色の意味は文化によって正反対になることがある。グローバル向けプロダクト・国際展開を狙うときに必ずチェック。
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>白は欧米では結婚式 / 中国・日本では葬儀</li>
          <li>赤は中国では祝祭 / 南アフリカでは喪</li>
          <li>緑は欧米では「GO」 / 中国の特定文脈では侮辱</li>
        </ul>
        <p className="text-zinc-600">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-300 mr-1 align-middle" />
          ポジティブ
          <span className="inline-block w-3 h-3 rounded-full bg-rose-300 ml-3 mr-1 align-middle" />
          ネガティブ
          <span className="inline-block w-3 h-3 rounded-full bg-zinc-300 ml-3 mr-1 align-middle" />
          中立・文脈依存
        </p>
      </section>

      <section className="space-y-4">
        {ROWS.map((r) => (
          <div
            key={r.color}
            className="rounded-lg border border-zinc-200 bg-white overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-3 border-b border-zinc-200 bg-zinc-50">
              <div
                className="w-10 h-10 rounded shadow-sm border border-zinc-200"
                style={{ background: r.hex }}
              />
              <div>
                <div className="font-semibold">{r.color}</div>
                <div className="text-xs text-zinc-500 font-mono">{r.hex}</div>
              </div>
            </div>
            <div className="divide-y divide-zinc-100">
              {r.meanings.map((m, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-2.5 text-sm">
                  <span className="w-32 shrink-0 text-zinc-500">{m.region}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${toneClass[m.tone]}`}
                  >
                    {m.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
