import { StyleDoc } from '../_shared/StyleDoc'

export default function LiquidGlass() {
  return (
    <StyleDoc
      intro="Apple visionOS / iOS 26 で導入された「液体ガラス」表現。Glassmorphism よりさらに屈折・歪み・光の反射を追加した次世代マテリアル。背景がレンズで歪んで見える / エッジで光が走る。"
      pros={[
        '最新感・空間性',
        '背景コンテキストを保持しつつレイヤー化',
        'AR / VR との親和性',
      ]}
      cons={[
        'CSS では完全再現できない (SVG filter 必須)',
        'パフォーマンスコスト大',
        '装飾過剰だと「ぼやけて読めない」',
      ]}
      example={
        <div
          className="p-8 rounded-md relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #1e3a8a 0%, #6b21a8 50%, #c2410c 100%)',
            minHeight: 260,
          }}
        >
          {/* light streaks */}
          <div
            className="absolute"
            style={{
              top: 20,
              right: 30,
              width: 220,
              height: 100,
              background:
                'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'rotate(-15deg)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: 40,
              left: -20,
              width: 180,
              height: 80,
              background:
                'radial-gradient(ellipse, rgba(192,132,252,0.7) 0%, transparent 70%)',
              filter: 'blur(25px)',
            }}
          />

          {/* glass card */}
          <div
            className="relative max-w-sm mx-auto rounded-3xl p-6 backdrop-blur-xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="absolute inset-x-2 top-0 h-px rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
              }}
            />
            <div className="text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                visionOS · iOS 26
              </div>
              <div className="text-2xl font-semibold mt-1">Liquid Glass</div>
              <div className="text-sm opacity-80 mt-1">
                屈折・反射・歪み — 空間に浮かぶレンズ。
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  className="flex-1 h-10 rounded-full text-sm font-semibold backdrop-blur-md"
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
                  }}
                >
                  探索する
                </button>
                <button
                  className="w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
