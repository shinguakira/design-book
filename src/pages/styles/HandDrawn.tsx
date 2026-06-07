import { StyleDoc } from '../_shared/StyleDoc'

export default function HandDrawn() {
  return (
    <StyleDoc
      intro="Excalidraw / tldraw / Whimsical 風の手描きアウトライン + Caveat 等の筆記体フォント。「完成品ではない」感を出すことで、レビュー段階のスケッチや、親近感を演出する教育系で活躍する。"
      pros={[
        '気軽さ・親近感',
        'レビュー段階で「まだ調整可能」と伝わる',
        '差別化が容易',
      ]}
      cons={[
        '本番のプロダクトには見えない',
        'ブランド「信頼」を求める場面では NG',
        'アクセシビリティ・コントラスト弱め',
      ]}
      example={
        <div
          className="p-8 rounded-md"
          style={{
            background: '#fdfbf2',
            fontFamily: '"Caveat", "Comic Sans MS", cursive',
          }}
        >
          <div className="relative max-w-sm mx-auto">
            <svg
              viewBox="0 0 320 220"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M5,9 Q8,5 14,5 L298,8 Q310,9 313,20 L315,200 Q312,215 298,215 L18,212 Q5,210 4,200 Z"
                fill="white"
                stroke="#2a2a2a"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="relative p-6">
              <div className="text-3xl text-zinc-900 leading-tight">
                Sketch your idea
              </div>
              <div className="text-lg text-zinc-600 mt-2 leading-tight">
                とりあえず描いてみる、を肯定する世界観。
              </div>
              <div className="mt-4 flex gap-2">
                <button className="relative">
                  <svg
                    viewBox="0 0 110 36"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    <path
                      d="M5,7 Q9,4 16,4 L96,5 Q105,6 106,16 L105,28 Q102,33 94,32 L14,31 Q6,30 5,22 Z"
                      fill="#3b82f6"
                      stroke="#1e40af"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="relative inline-block px-5 py-1.5 text-white text-lg">
                    Start!
                  </span>
                </button>
                <button className="relative">
                  <svg
                    viewBox="0 0 110 36"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    <path
                      d="M5,7 Q9,4 16,4 L96,5 Q105,6 106,16 L105,28 Q102,33 94,32 L14,31 Q6,30 5,22 Z"
                      fill="white"
                      stroke="#2a2a2a"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="relative inline-block px-5 py-1.5 text-zinc-800 text-lg">
                    Maybe
                  </span>
                </button>
              </div>
              <svg
                width={40}
                height={30}
                viewBox="0 0 40 30"
                className="absolute right-3 top-3"
              >
                <path
                  d="M5 15 Q10 5 20 5 Q32 5 35 18 Q33 22 30 18"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M30 18 L33 14 M30 18 L34 21"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      }
    />
  )
}
