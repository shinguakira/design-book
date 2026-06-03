import { StyleDoc } from '../_shared/StyleDoc'

export default function Skeuomorphism() {
  return (
    <StyleDoc
      intro="現実の物の質感をそのままUIに持ち込むスタイル。革・木目・金属感・押しボタンの3D感など。iOS 6 までのアップルが代表例。フラットデザイン以前の主流。"
      pros={[
        '初見でも触り方が分かる (ボタンが本物のボタンに見える)',
        '世界観を強く演出できる (ゲーム/エンタメに最適)',
        'リッチ・高級感を出しやすい',
      ]}
      cons={[
        '時代遅れに見えるリスクが高い',
        '装飾が多く、情報密度を上げにくい',
        'デザイン/実装コストが大きい',
        'スケールしにくい',
      ]}
      example={
        <div
          className="p-12 rounded-md"
          style={{
            background:
              'linear-gradient(180deg, #d4c4a8 0%, #a08862 100%)',
          }}
        >
          <div
            className="p-6 rounded-xl max-w-sm border-2 border-amber-900/40"
            style={{
              background:
                'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div className="text-lg font-bold text-amber-900">プラン</div>
            <div className="text-sm text-amber-800/70 mt-1">月額 ¥980</div>
            <p className="text-sm text-amber-900/90 mt-3">
              すべての機能を制限なく利用できます。
            </p>
            <button
              className="mt-5 text-sm font-bold px-5 h-11 rounded-lg text-white border border-emerald-900/40"
              style={{
                background:
                  'linear-gradient(180deg, #34d399 0%, #059669 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.3)',
                textShadow: '0 1px 1px rgba(0,0,0,0.4)',
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
