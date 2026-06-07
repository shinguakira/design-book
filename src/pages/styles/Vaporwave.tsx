import { StyleDoc } from '../_shared/StyleDoc'

export default function Vaporwave() {
  return (
    <StyleDoc
      intro="紫・青・ピンクを基調にした 80年代末〜90年代のレトロ未来感。グリッド地平線・太陽・ローマ彫像・日本語混入が典型。ノスタルジアと皮肉が同居する。Synthwave とほぼ同流。"
      pros={[
        '世界観が強烈で記憶に残る',
        'ナイト系・ゲーム・音楽配信 LP と相性◎',
        '少ない要素でも一目で「それ」と分かる',
      ]}
      cons={[
        'プロダクト UI には極めて使いにくい',
        '読みやすさ・コントラストを犠牲にしがち',
        '時代色が強く、賞味期限がある',
      ]}
      example={
        <div
          className="relative overflow-hidden rounded-md"
          style={{
            background: 'linear-gradient(180deg, #2d1b69 0%, #6a0572 45%, #ff006e 100%)',
            minHeight: 280,
          }}
        >
          <div
            className="absolute"
            style={{
              left: '50%',
              top: 30,
              transform: 'translateX(-50%)',
              width: 140,
              height: 70,
              overflow: 'hidden',
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 140,
                height: 140,
                background:
                  'radial-gradient(circle, #ffeb3b 0%, #ff6f61 55%, transparent 100%)',
              }}
            />
            <div
              className="absolute bottom-2 left-0 right-0 h-1"
              style={{ background: '#2d1b69' }}
            />
            <div
              className="absolute bottom-6 left-0 right-0 h-1"
              style={{ background: '#2d1b69', opacity: 0.7 }}
            />
            <div
              className="absolute bottom-10 left-0 right-0 h-1"
              style={{ background: '#2d1b69', opacity: 0.4 }}
            />
          </div>

          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: 140,
              backgroundImage:
                'linear-gradient(90deg, rgba(255,0,255,0.6) 1px, transparent 1px), linear-gradient(180deg, rgba(255,0,255,0.6) 1px, transparent 1px)',
              backgroundSize: '36px 24px',
              transform: 'perspective(220px) rotateX(58deg)',
              transformOrigin: 'bottom',
            }}
          />

          <div className="relative pt-24 pb-8 text-center">
            <div
              className="text-5xl font-bold tracking-widest"
              style={{
                color: '#fff',
                fontFamily: 'serif',
                textShadow:
                  '0 0 12px #ff00ff, 3px 3px 0 #00ffff, -2px -2px 0 #ff00ff',
              }}
            >
              VAPOR
            </div>
            <div
              className="mt-2 text-xs tracking-[0.4em]"
              style={{ color: '#ffb3ff' }}
            >
              A E S T H E T I C
            </div>
            <button
              className="mt-4 inline-block px-5 py-2 text-sm font-bold border-2"
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderColor: '#00ffff',
                color: '#fff',
                textShadow: '0 0 4px #00ffff',
                backdropFilter: 'blur(4px)',
              }}
            >
              ▶ PLAY
            </button>
          </div>
        </div>
      }
    />
  )
}
