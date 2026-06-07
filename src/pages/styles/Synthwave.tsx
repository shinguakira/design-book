import { StyleDoc } from '../_shared/StyleDoc'

export default function Synthwave() {
  return (
    <StyleDoc
      intro="80年代の電子音楽 / 映画ポスターの世界観。ネオンの遠近グリッド + 山並み + 沈む太陽 + ラスベガス的タイポ。Vaporwave よりカーチェイス・スポーツカー寄り。Stranger Things / GTA Vice City 系。"
      pros={[
        '世界観が一発で伝わる',
        '黒 + ネオンで OLED 親和性',
        '音楽配信・ゲーム・ナイトイベントと相性',
      ]}
      cons={[
        '実用 UI には派手すぎる',
        '視認性は犠牲になる',
        '一過性のトレンドリスクあり',
      ]}
      example={
        <div
          className="relative overflow-hidden rounded-md"
          style={{
            background: 'linear-gradient(180deg, #0d0524 0%, #2a0a3c 50%, #ff006e 100%)',
            minHeight: 280,
          }}
        >
          <div
            className="absolute"
            style={{
              left: '50%',
              top: 60,
              transform: 'translateX(-50%)',
              width: 120,
              height: 60,
              borderRadius: '60px 60px 0 0',
              background: 'linear-gradient(180deg, #fef08a 0%, #f97316 60%, #db2777 100%)',
              boxShadow: '0 0 40px rgba(249,115,22,0.7)',
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  bottom: 8 + i * 10,
                  height: 2,
                  background: '#0d0524',
                }}
              />
            ))}
          </div>
          <div className="absolute left-0 right-0" style={{ bottom: 95, height: 30 }}>
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,30 60,5 120,25 180,8 240,28 300,3 360,22 400,30" fill="#7c3aed" opacity="0.8" />
            </svg>
          </div>
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: 100,
              backgroundImage:
                'linear-gradient(90deg, rgba(255,0,255,0.8) 1px, transparent 1px), linear-gradient(180deg, rgba(255,0,255,0.8) 1px, transparent 1px)',
              backgroundSize: '40px 20px',
              transform: 'perspective(200px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />
          <div className="relative pt-32 text-center">
            <div
              className="text-3xl font-black tracking-widest"
              style={{
                color: '#fff',
                fontFamily: 'serif',
                textShadow: '3px 3px 0 #ff00ff, 6px 6px 0 #00ffff, 0 0 12px #ff00ff',
              }}
            >
              MIAMI 1985
            </div>
            <div className="mt-1 text-xs tracking-[0.4em]" style={{ color: '#ffb3ff' }}>
              N E O N · D R I V E
            </div>
          </div>
        </div>
      }
    />
  )
}
