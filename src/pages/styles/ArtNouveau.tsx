import { StyleDoc } from '../_shared/StyleDoc'

export default function ArtNouveau() {
  return (
    <StyleDoc
      intro="1890-1910年頃。植物・蔓・女性像のしなやかな曲線を多用。ミュシャ / クリムト / パリのメトロ。Art Deco より有機的で、Art Deco の前世代に位置する。化粧品・香水・植物ベース商品で今も使われる。"
      pros={[
        '曲線美で品の良い雰囲気',
        '女性向け・ナチュラル系ブランドと相性',
        '装飾線で空間を埋められる',
      ]}
      cons={[
        '機能性 UI には不向き',
        '実装難度が高い (SVG を多用)',
        '時代色が強く、合うブランドが限定',
      ]}
      example={
        <div
          className="p-8 rounded-md"
          style={{
            background: 'linear-gradient(180deg, #f5edd6 0%, #d9c084 100%)',
          }}
        >
          <div className="relative max-w-xs mx-auto">
            <svg
              viewBox="0 0 280 200"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="vine" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#3a5f0b" />
                  <stop offset="1" stopColor="#7a3a18" />
                </linearGradient>
              </defs>
              <path
                d="M10 30 Q5 80 30 100 Q60 110 50 150 Q40 180 70 195"
                fill="none"
                stroke="url(#vine)"
                strokeWidth="2"
              />
              <path
                d="M270 30 Q275 80 250 100 Q220 110 230 150 Q240 180 210 195"
                fill="none"
                stroke="url(#vine)"
                strokeWidth="2"
              />
              <ellipse cx="20" cy="60" rx="6" ry="3" transform="rotate(-30 20 60)" fill="#3a5f0b" />
              <ellipse cx="40" cy="105" rx="6" ry="3" transform="rotate(20 40 105)" fill="#3a5f0b" />
              <ellipse cx="55" cy="165" rx="6" ry="3" transform="rotate(-15 55 165)" fill="#3a5f0b" />
              <ellipse cx="260" cy="60" rx="6" ry="3" transform="rotate(30 260 60)" fill="#3a5f0b" />
              <ellipse cx="240" cy="105" rx="6" ry="3" transform="rotate(-20 240 105)" fill="#3a5f0b" />
              <ellipse cx="225" cy="165" rx="6" ry="3" transform="rotate(15 225 165)" fill="#3a5f0b" />
              <circle cx="15" cy="35" r="5" fill="#c2185b" />
              <circle cx="265" cy="35" r="5" fill="#c2185b" />
            </svg>
            <div className="relative p-8 text-center">
              <div
                className="text-[10px] tracking-[0.4em] mb-2"
                style={{ color: '#7a3a18', fontFamily: 'serif' }}
              >
                ◆ NOUVEAU ◆
              </div>
              <div
                className="text-3xl italic"
                style={{
                  color: '#3a1a0a',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                }}
              >
                Floréal
              </div>
              <div
                className="text-xs italic mt-1"
                style={{ color: '#5a3a18', fontFamily: 'serif' }}
              >
                Parfumerie Naturelle
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
