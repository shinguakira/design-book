type Group = {
  title: string
  who: string
  tips: { do?: string; dont?: string; note?: string }[]
}

const GROUPS: Group[] = [
  {
    title: '色覚特性 (Color Blindness)',
    who: '男性の8%、女性の0.5%。日本人男性 20人に1人。',
    tips: [
      { do: '色 + アイコン + テキストの三重で意味を伝える' },
      { do: 'チャートは色だけでなく形・パターンも変える' },
      { dont: '赤/緑ペアだけで状態 (成功/失敗) を区別' },
      { dont: 'カラーピッカーUIで「緑を選んでください」のような色名だけの指示' },
    ],
  },
  {
    title: '低視力・弱視 (Low Vision)',
    who: '世界で2.5億人以上。加齢で誰もが当事者になる可能性。',
    tips: [
      { do: '本文 16px 以上を基本、相対単位 (rem) で指定' },
      { do: 'コントラスト比 4.5:1 (AA) 以上を確保' },
      { do: 'ズーム 200% でもレイアウトが破綻しないようにする' },
      { dont: 'グレー × 薄グレーのような低コントラストUI' },
      { dont: '極端に細いフォント (font-weight 300 以下) を本文に使う' },
    ],
  },
  {
    title: '光過敏・てんかん (Photosensitivity)',
    who: '人口の約0.5%。点滅で発作を起こす可能性。',
    tips: [
      { do: '点滅は 1秒間に 3回以下に制限 (WCAG 2.3.1)' },
      { do: 'prefers-reduced-motion を尊重して大きな動きを止める' },
      { dont: '高コントラストでフルスクリーンに広がるストロボ的演出' },
      { dont: '長時間のループアニメーションをデフォルトで再生' },
    ],
  },
  {
    title: '加齢 (Aging Eyes)',
    who: '40代以降から徐々に。色の識別能力・コントラスト感度・近視力が低下。',
    tips: [
      { do: '黄色・青の彩度差より明度差を重視' },
      { do: '本文 16〜18px、行間 1.5 以上' },
      { do: 'タップ領域 44 × 44px 以上 (Appleガイドライン)' },
      { dont: '青背景に黒テキストのような明度の近い組合せ' },
      { dont: 'ピントの合わない極小フォント (12px未満)' },
    ],
  },
  {
    title: '運動機能 (Motor Impairment)',
    who: 'パーキンソン病・関節炎・震え・片手操作など。',
    tips: [
      { do: 'クリック領域を広めに (最低 44 × 44 px)' },
      { do: 'ホバーに依存しない (タップで完結する状態に)' },
      { do: 'キーボード操作で全機能にアクセスできるようにする' },
      { dont: '時間制限のあるアクション (xx秒以内に押す系)' },
      { dont: '小さなチェックボックスや × ボタンが密集' },
    ],
  },
  {
    title: 'ダークモード対応',
    who: 'ユーザー全体。眼精疲労軽減・夜間使用・OLED省電力で需要が高い。',
    tips: [
      { do: 'ライトモードの色をそのまま反転させず、別パレットを用意' },
      { do: '彩度を10〜20%下げると暗い背景で目に優しい' },
      { do: 'pure black (#000) より zinc-950 など若干明るくしてハロー効果を防ぐ' },
      { dont: 'ライトの色を invert() で機械的に反転' },
      { dont: 'コントラストを上げすぎて目が痛くなる強さ' },
    ],
  },
  {
    title: '認知特性 (Cognitive Accessibility)',
    who: 'ADHD・自閉症・学習障害・疲労状態のユーザー (= 多くの人)。',
    tips: [
      { do: '色数を絞る (3〜5色のパレット)' },
      { do: 'エラーは色だけでなく具体的な対処法を文章で示す' },
      { do: '重要なアクションは色 + 位置 + サイズで明確に区別' },
      { dont: 'アニメーション・色・音で同時に注意を引く' },
      { dont: '色だけでカテゴリを区別 (赤=食品, 青=家電 等)' },
    ],
  },
]

export default function InclusiveDesign() {
  return (
    <div className="max-w-4xl space-y-6">
      <section className="text-sm text-zinc-700 leading-relaxed space-y-2">
        <p>
          色とアクセシビリティは表裏一体。「特定の人」のための配慮は、結局すべての人を助ける (carpet cut = curb cut effect)。
        </p>
        <p className="text-zinc-600">
          以下はユーザー像ごとの設計上の Do / Don't。色だけの話ではなく、色を中心とした包括的配慮として。
        </p>
      </section>

      <div className="space-y-4">
        {GROUPS.map((g) => (
          <section
            key={g.title}
            className="rounded-lg border border-zinc-200 bg-white overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-zinc-200 bg-zinc-50">
              <div className="font-semibold">{g.title}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{g.who}</div>
            </div>
            <div className="px-5 py-4 space-y-1.5 text-sm">
              {g.tips.map((t, i) => (
                <div key={i} className="flex gap-2">
                  {t.do && (
                    <>
                      <span className="text-emerald-600 font-semibold shrink-0">
                        ✓ Do
                      </span>
                      <span className="text-zinc-700">{t.do}</span>
                    </>
                  )}
                  {t.dont && (
                    <>
                      <span className="text-rose-600 font-semibold shrink-0">
                        ✗ Don't
                      </span>
                      <span className="text-zinc-700">{t.dont}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">参考になるガイドライン</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            WCAG 2.2 — Web Content Accessibility Guidelines (W3C)
          </li>
          <li>
            Apple Human Interface Guidelines — Accessibility
          </li>
          <li>
            Material Design — Accessibility
          </li>
          <li>
            Microsoft Inclusive Design Toolkit
          </li>
        </ul>
      </section>
    </div>
  )
}
