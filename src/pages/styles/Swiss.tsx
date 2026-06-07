import { StyleDoc } from '../_shared/StyleDoc'

export default function Swiss() {
  return (
    <StyleDoc
      intro="International Typographic Style とも。1950s スイス発、厳密なグリッド + Helvetica + 左右非対称 + 黒赤の最小限カラー + 大型タイポ。Massimo Vignelli の NY 地下鉄サイン、Apple/Stripe 系の精緻 UI の源流。"
      pros={[
        '読みやすさ・知性・客観性',
        'グリッドが揃うと圧倒的に整って見える',
        'ブランド・コーポレートサイトに最適',
      ]}
      cons={[
        '装飾性 / 親近感はゼロ',
        '退屈・冷たい印象を与えることも',
        '雑なグリッドだと「ただシンプル」に見える',
      ]}
      example={
        <div className="p-10 bg-white rounded-md border border-zinc-200">
          <div className="max-w-md mx-auto grid grid-cols-12 gap-2">
            <div
              className="col-span-12"
              style={{ borderBottom: '4px solid #000' }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.4em] pb-2"
                style={{ fontFamily: 'Helvetica, sans-serif', color: '#000' }}
              >
                ◯ Issue 04 / June 2026
              </div>
            </div>
            <div className="col-span-12 mt-4">
              <div
                className="text-5xl leading-[0.9] font-bold"
                style={{ fontFamily: 'Helvetica, sans-serif' }}
              >
                System
                <br />
                Typography
              </div>
            </div>
            <div className="col-span-7 mt-4">
              <div
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'Helvetica, sans-serif', color: '#222' }}
              >
                Function. Grid. Typography. The three pillars of the
                International Style — formulated in Zürich and Basel — still
                define how clean systems are built today.
              </div>
            </div>
            <div className="col-span-5 mt-4 flex items-end">
              <div
                className="text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: 'Helvetica',
                  color: '#fff',
                  background: '#dc2626',
                  padding: '4px 8px',
                }}
              >
                Read more
              </div>
            </div>
            <div
              className="col-span-12 mt-4"
              style={{ borderTop: '1px solid #000' }}
            >
              <div
                className="flex justify-between text-[10px] uppercase tracking-[0.3em] pt-2"
                style={{ fontFamily: 'Helvetica', color: '#000' }}
              >
                <span>Vol. IV</span>
                <span>p. 12</span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
