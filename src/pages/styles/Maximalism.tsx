import { StyleDoc } from '../_shared/StyleDoc'

export default function Maximalism() {
  return (
    <StyleDoc
      intro="Minimalism の対極。装飾・色・テクスチャを意図的に盛り盛りにする。Gucci アレッサンドロ・ミケーレ期 / Etsy のクラフト系 / Y2K と組合せた現代Maximalism。引き算ではなく足し算の美学。"
      pros={[
        '記憶に残る・個性が立つ',
        'ブランドの世界観を強く打ち出せる',
        '飽きない・情報密度が上げられる',
      ]}
      cons={[
        '情報整理・読みやすさは犠牲',
        'デザインの「線引き」が難しい',
        '雑に作ると単に汚い',
      ]}
      example={
        <div
          className="p-6 rounded-md relative overflow-hidden"
          style={{
            background:
              'repeating-linear-gradient(45deg, #fde68a 0 20px, #fef3c7 20px 40px)',
          }}
        >
          <div
            className="absolute top-2 right-3"
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 30% 30%, #f43f5e 0%, #be123c 100%)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          />
          <div
            className="absolute bottom-4 left-3 grid grid-cols-3 gap-1"
            style={{ transform: 'rotate(-12deg)' }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'][i],
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-16 left-4"
            style={{
              width: 30,
              height: 30,
              background: '#a855f7',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
          <div
            className="relative mx-auto max-w-xs p-5 border-4 border-zinc-900 rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, #fbcfe8 0%, #c084fc 50%, #38bdf8 100%)',
              boxShadow: '8px 8px 0 #18181b',
            }}
          >
            <div
              className="text-xs uppercase tracking-[0.3em] mb-1 font-mono"
              style={{ color: '#831843' }}
            >
              ☆ Maximal Vibes ☆
            </div>
            <div
              className="text-3xl font-black italic"
              style={{
                color: '#18181b',
                fontFamily: 'serif',
                textShadow: '3px 3px 0 #fde68a',
              }}
            >
              MORE IS MORE!
            </div>
            <div className="mt-2 flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-900 text-[10px] font-bold border-2 border-zinc-900">
                NEW
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold border-2 border-zinc-900">
                ★★★★★
              </span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-zinc-900 text-[10px] font-bold border-2 border-zinc-900">
                HOT
              </span>
            </div>
            <button
              className="mt-3 w-full py-2 text-sm font-black uppercase border-2 border-zinc-900 rounded-lg"
              style={{
                background: '#f43f5e',
                color: '#fff',
                textShadow: '2px 2px 0 #18181b',
              }}
            >
              CLICK NOW!!! ▸
            </button>
          </div>
        </div>
      }
    />
  )
}
