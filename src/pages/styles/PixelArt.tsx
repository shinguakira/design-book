import { StyleDoc } from '../_shared/StyleDoc'

export default function PixelArt() {
  return (
    <StyleDoc
      intro="8-bit / 16-bit ゲームの低解像度ドット絵を意図的に再現するスタイル。RPG・ローグライク・インディーゲーム LP の定番。Press Start 2P や Pixelify Sans が定番フォント。"
      pros={[
        'ノスタルジック・遊び心',
        'ゲーミング系で世界観が即伝わる',
        'シンプルな図形で構成できる',
      ]}
      cons={[
        '可読性が低い (細部は表現できない)',
        '高解像度ディスプレイでは「ジャギ」が目立つ',
        '一般的なプロダクトには合わない',
      ]}
      example={
        <div
          className="p-6 rounded-md"
          style={{
            background: '#1a1330',
            backgroundImage:
              'linear-gradient(0deg, rgba(255,255,255,0.04) 50%, transparent 50%)',
            backgroundSize: '100% 4px',
            fontFamily: '"Press Start 2P", "Courier New", monospace',
          }}
        >
          <div className="max-w-xs mx-auto">
            <PixelChar />
            <div
              className="mt-4 text-center text-xs"
              style={{
                color: '#fde047',
                textShadow: '2px 2px 0 #000',
                letterSpacing: 1,
              }}
            >
              QUEST START
            </div>
            <div
              className="mt-3 p-3 text-white text-[10px] leading-loose"
              style={{
                background: '#1d3a8c',
                border: '4px solid #fde047',
                imageRendering: 'pixelated',
              }}
            >
              <div className="flex justify-between">
                <span>HP</span>
                <span>100/100</span>
              </div>
              <div className="flex h-2 mt-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 mr-px"
                    style={{ background: '#22c55e' }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span>MP</span>
                <span>75/100</span>
              </div>
              <div className="flex h-2 mt-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 mr-px"
                    style={{ background: i < 7 ? '#3b82f6' : '#1e293b' }}
                  />
                ))}
              </div>
              <button
                className="mt-3 px-2 py-1 text-[10px] block"
                style={{
                  background: '#fde047',
                  color: '#1d3a8c',
                  imageRendering: 'pixelated',
                }}
              >
                ▶ ATTACK
              </button>
            </div>
          </div>
        </div>
      }
    />
  )
}

function PixelChar() {
  const PX = 6
  const map = [
    '..YYYYYY..',
    '.YYYYYYYY.',
    'YYWWYYWWYY',
    'YYWWYYWWYY',
    'YYYYYYYYYY',
    'YYYRRRRYYY',
    'YYRRRRRRYY',
    '.YYYYYYYY.',
    '.YYYYYYYY.',
    '..YY..YY..',
  ]
  const colors: Record<string, string> = {
    '.': 'transparent',
    Y: '#fde047',
    W: '#fff',
    R: '#dc2626',
  }
  return (
    <div className="mx-auto" style={{ width: PX * 10, height: PX * 10 }}>
      {map.map((row, r) => (
        <div key={r} className="flex">
          {row.split('').map((c, i) => (
            <div
              key={i}
              style={{
                width: PX,
                height: PX,
                background: colors[c] ?? 'transparent',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
