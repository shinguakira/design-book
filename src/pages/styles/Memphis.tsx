import { StyleDoc } from '../_shared/StyleDoc'

export default function Memphis() {
  return (
    <StyleDoc
      intro="1980年代イタリアの Memphis Group 発、原色 + ドット + ジグザグ + 三角形を散らした「カオスを楽しむ」スタイル。最近 Z世代向けや子供向け、音楽 LP で再評価されている。"
      pros={[
        '記憶に残る・他と被らない',
        'エネルギッシュ・遊び心のあるブランドに最適',
        'パターンで余白を埋められる',
      ]}
      cons={[
        'プロダクト UI には騒がしすぎる',
        '長時間見るには疲れる',
        'ブランドカラー以外の管理が難しい',
      ]}
      example={
        <div className="relative bg-white p-8 rounded-md overflow-hidden">
          <div
            className="absolute top-4 right-6"
            style={{
              width: 0,
              height: 0,
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderBottom: '32px solid #facc15',
            }}
          />
          <svg
            className="absolute top-16 right-3"
            width={70}
            height={16}
            viewBox="0 0 70 16"
          >
            <path
              d="M2 8 Q8 2 14 8 T26 8 T38 8 T50 8 T62 8"
              stroke="#000"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute bottom-4 left-4 grid grid-cols-4 gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-pink-500" />
            ))}
          </div>
          <div
            className="absolute bottom-10 right-6"
            style={{
              width: 70,
              height: 18,
              backgroundImage:
                'linear-gradient(135deg, transparent 50%, #06b6d4 50%), linear-gradient(45deg, #06b6d4 50%, transparent 50%)',
              backgroundSize: '10px 18px',
              backgroundPosition: '0 0, 5px 0',
              backgroundRepeat: 'repeat-x',
            }}
          />

          <div className="relative max-w-xs mx-auto bg-white border-[3px] border-zinc-900 rounded-2xl p-5 shadow-[8px_8px_0_#000]">
            <div
              className="text-3xl font-black uppercase tracking-tight"
              style={{ color: '#7c3aed' }}
            >
              Memphis!
            </div>
            <div className="text-xs font-mono mt-2 text-zinc-700">
              geometric chaos · since 1981
            </div>
            <button className="mt-3 px-4 py-1.5 bg-blue-500 text-white border-[3px] border-zinc-900 rounded-md text-xs uppercase font-black">
              click me ▶
            </button>
          </div>
        </div>
      }
    />
  )
}
