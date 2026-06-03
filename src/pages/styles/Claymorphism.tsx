import { StyleDoc } from '../_shared/StyleDoc'

export default function Claymorphism() {
  return (
    <StyleDoc
      intro="粘土(clay)のようなふっくらした立体感を持つスタイル。パステルカラー + 大きく丸い形 + 内側の明るい縁取り + 多重ソフトシャドウで実現する。Neumorphism のコントラスト問題を彩度で補ったような位置づけ。"
      pros={[
        'かわいい・親しみやすい・触りたくなる',
        'ブランドの「やわらかさ」を出したい時に強い',
        'パステルカラーと相性が良い',
      ]}
      cons={[
        '情報密度が上げにくい',
        'プロフェッショナル・硬めの文脈には合わない',
        '影が重く、パフォーマンスに注意',
      ]}
      example={
        <div className="p-12 rounded-md bg-violet-100">
          <div
            className="p-6 rounded-3xl max-w-sm bg-white"
            style={{
              boxShadow:
                '10px 10px 30px rgba(124, 58, 237, 0.25), inset 0 -6px 12px rgba(124, 58, 237, 0.08), inset 0 6px 12px rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="text-lg font-semibold text-violet-900">プラン</div>
            <div className="text-sm text-violet-600 mt-1">月額 ¥980</div>
            <p className="text-sm text-violet-800 mt-3">
              すべての機能を制限なく利用できます。
            </p>
            <button
              className="mt-5 text-sm font-semibold px-5 h-11 rounded-2xl text-white bg-violet-500"
              style={{
                boxShadow:
                  '6px 6px 16px rgba(124, 58, 237, 0.4), inset 0 -3px 6px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.4)',
              }}
            >
              アップグレード
            </button>
          </div>
        </div>
      }
    />
  )
}
