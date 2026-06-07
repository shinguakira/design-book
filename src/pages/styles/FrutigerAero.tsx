import { StyleDoc } from '../_shared/StyleDoc'

export default function FrutigerAero() {
  return (
    <StyleDoc
      intro="2004-2013年頃の Windows Vista / Aero / 初期iOS / Wii / Android 1.0 で見られた光沢グラデ + 反射 + バブル + 自然写真背景。Y2K と Flat の橋渡し期。最近ノスタルジー対象として再評価。"
      pros={[
        '光沢の高級感 (当時の最新技術)',
        '光と空気の表現が画面に「奥行き」を出す',
        '懐古とテック感の同居',
      ]}
      cons={[
        '反射・光沢が今見ると安っぽい',
        '視認性は高くない',
        '時代色が強い (時間が止まって見える)',
      ]}
      example={
        <div
          className="p-8 rounded-md relative overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, #06b6d4 0%, #67e8f9 30%, #a7f3d0 70%, #d4ed8d 100%)',
          }}
        >
          {/* bubbles */}
          {[
            { x: 20, y: 20, size: 30 },
            { x: 80, y: 60, size: 18 },
            { x: 60, y: 30, size: 22 },
            { x: 30, y: 80, size: 16 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 50%, transparent 90%)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            />
          ))}

          <div
            className="relative max-w-xs mx-auto rounded-2xl p-5 backdrop-blur"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 100%)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(0, 50, 100, 0.3)',
            }}
          >
            <div
              className="text-xl font-bold mb-1"
              style={{
                color: '#003560',
                fontFamily: '"Segoe UI", sans-serif',
                textShadow: '0 1px 0 rgba(255,255,255,0.7)',
              }}
            >
              Windows Aero
            </div>
            <div
              className="text-xs mb-3"
              style={{
                color: '#0c4a6e',
                fontFamily: '"Segoe UI", sans-serif',
              }}
            >
              Glassy. Glossy. Futuristic.
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-1.5 rounded-md text-xs font-bold text-white"
                style={{
                  background:
                    'linear-gradient(180deg, #67a8e6 0%, #2d5a90 50%, #1c4778 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.2)',
                  textShadow: '0 1px 1px rgba(0,0,0,0.4)',
                }}
              >
                Continue
              </button>
              <button
                className="px-4 py-1.5 rounded-md text-xs font-bold"
                style={{
                  color: '#0c4a6e',
                  background:
                    'linear-gradient(180deg, #fff 0%, #d4d4d8 50%, #a1a1aa 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      }
    />
  )
}
