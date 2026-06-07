import { StyleDoc } from '../_shared/StyleDoc'

export default function Solarpunk() {
  return (
    <StyleDoc
      intro="Cyberpunk のディストピア観へのアンチテーゼ。緑 + テラコッタ + 太陽光 + 植物 + Art Nouveau 風曲線 + 持続可能テクノロジー。気候変動・地域経済・NPO・グリーンテック系ブランドで採用される新興スタイル。"
      pros={[
        '希望・楽観・自然との共生を表現',
        'ESG / サステナビリティ系で説得力',
        '色彩が柔らかく目に優しい',
      ]}
      cons={[
        'まだ「定型」が定まっていない (実装難)',
        '一般 SaaS には世界観が強すぎる',
        'メッセージなき採用は浅く見える',
      ]}
      example={
        <div
          className="p-8 rounded-md"
          style={{
            background:
              'linear-gradient(180deg, #fef3c7 0%, #d4ed8d 70%, #6cb05a 100%)',
          }}
        >
          <div className="max-w-sm mx-auto relative">
            <svg
              viewBox="0 0 60 60"
              className="absolute -top-3 -right-2"
              width={60}
              height={60}
            >
              <circle cx="30" cy="30" r="12" fill="#fbbf24" />
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2
                const x1 = 30 + Math.cos(a) * 18
                const y1 = 30 + Math.sin(a) * 18
                const x2 = 30 + Math.cos(a) * 28
                const y2 = 30 + Math.sin(a) * 28
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>

            <div
              className="relative p-6 rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '2px solid #65a30d',
                boxShadow: '0 8px 24px rgba(50,80,30,0.2)',
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.3em] mb-1"
                style={{ color: '#4d7c0f' }}
              >
                ◯ Solar Energy Co-op
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: '#1a2e05', fontFamily: 'serif' }}
              >
                Power for All
              </div>
              <div className="mt-2 text-sm" style={{ color: '#3f6212' }}>
                地域で発電し、地域に還元する。
                <br />屋根のソーラーが街を回す。
              </div>
              <div className="mt-3 flex items-end gap-3">
                <button
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%)',
                  }}
                >
                  Join the grid
                </button>
                <svg viewBox="0 0 40 40" width={40} height={40}>
                  <path
                    d="M20 38 Q20 25 10 20 Q20 16 20 5 Q20 16 30 20 Q20 25 20 38"
                    fill="#65a30d"
                  />
                </svg>
              </div>
            </div>

            <svg
              viewBox="0 0 100 30"
              className="absolute -bottom-3 left-0 right-0 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 25 Q10 5 25 15 Q40 25 55 10 Q70 20 85 5 Q95 15 100 25 L100 30 L0 30 Z"
                fill="#65a30d"
              />
            </svg>
          </div>
        </div>
      }
    />
  )
}
