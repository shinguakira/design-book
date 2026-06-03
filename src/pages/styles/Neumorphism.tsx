import { StyleDoc } from '../_shared/StyleDoc'

export default function Neumorphism() {
  return (
    <StyleDoc
      intro="背景と同じ色のオブジェクトに、明るい影と暗い影を反対方向から当てて凸凹を表現するスタイル。「Neo + skeuomorphism」の造語。やわらかい・触りたくなる質感が特徴。"
      pros={[
        'やわらかく、ブランド差別化に効く',
        '凸凹で押せそう感が強い',
        'モノクロベースで上品にまとまる',
      ]}
      cons={[
        'コントラストが弱く、ボタンの境界が見えにくい (アクセシビリティが致命的に弱い)',
        '情報量の多いUIには向かない',
        '影の調整に色管理が必須',
      ]}
      example={
        <div className="p-12 rounded-md" style={{ background: '#e0e5ec' }}>
          <div
            className="p-6 rounded-2xl max-w-sm"
            style={{
              background: '#e0e5ec',
              boxShadow:
                '9px 9px 18px #b8bcc2, -9px -9px 18px #ffffff',
            }}
          >
            <div className="text-lg font-semibold text-zinc-700">プラン</div>
            <div className="text-sm text-zinc-500 mt-1">月額 ¥980</div>
            <p className="text-sm text-zinc-600 mt-3">
              すべての機能を制限なく利用できます。
            </p>
            <button
              className="mt-5 text-sm font-medium px-5 h-10 rounded-xl text-zinc-700"
              style={{
                background: '#e0e5ec',
                boxShadow:
                  '5px 5px 10px #b8bcc2, -5px -5px 10px #ffffff',
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
