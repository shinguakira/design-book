import { StyleDoc } from '../_shared/StyleDoc'

export default function WabiSabi() {
  return (
    <StyleDoc
      intro="日本の侘び寂び。不完全・不揃い・経年の美を肯定する。和紙テクスチャ + 墨色 + 余白 + 筆文字。Apple Newsroom Japan / 旅館 / 茶道系・伝統工芸ECで使われる。Minimalism と似て非なる「揺らぎの肯定」。"
      pros={[
        '余白で品と落ち着きを出せる',
        '伝統・手仕事系で信頼が増す',
        'モノクロ中心で印刷も映える',
      ]}
      cons={[
        'デジタル UI には情報密度が低すぎる',
        '世界観の狭さ (時代色)',
        '雑にやると「単に地味」になる',
      ]}
      example={
        <div
          className="p-10 rounded-md relative"
          style={{
            background: '#f1e8d1',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(120,80,40,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(80,50,20,0.07) 0%, transparent 50%)',
          }}
        >
          <div className="max-w-sm mx-auto">
            <div className="flex items-baseline gap-4 mb-6">
              <div
                className="text-5xl"
                style={{
                  color: '#1a1410',
                  fontFamily: '"Sawarabi Mincho", "Hiragino Mincho", serif',
                  fontWeight: 200,
                }}
              >
                和
              </div>
              <div
                className="text-[10px] tracking-[0.5em]"
                style={{ color: '#5a3a18' }}
              >
                W A B I — S A B I
              </div>
            </div>
            <div
              className="h-px my-6"
              style={{ background: '#5a3a18', opacity: 0.3 }}
            />
            <div
              className="text-base leading-loose"
              style={{
                color: '#3a2410',
                fontFamily: '"Sawarabi Mincho", "Hiragino Mincho", serif',
              }}
            >
              不完全であること、<br />
              不揃いであること、<br />
              経年の跡があること。<br />
              <br />
              そのすべてに、美しさがある。
            </div>
            <div
              className="mt-8 text-right text-xs italic"
              style={{ color: '#5a3a18', fontFamily: 'serif' }}
            >
              — 千利休 (推定)
            </div>
            <svg
              viewBox="0 0 80 30"
              className="mx-auto mt-6"
              width={80}
              height={30}
            >
              <path
                d="M5 15 Q15 5 25 18 Q35 28 50 12 Q60 5 75 18"
                fill="none"
                stroke="#1a1410"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
      }
    />
  )
}
