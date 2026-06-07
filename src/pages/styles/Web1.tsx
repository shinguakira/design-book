import { StyleDoc } from '../_shared/StyleDoc'

export default function Web1() {
  return (
    <StyleDoc
      intro="1995-2002年頃の Web。テーブルレイアウト + Comic Sans + 中央配置 + アンダーラインリンク + 工事中GIF + Marquee + 訪問者カウンター。Geocities や Web Ring の世界。「あえての懐かしさ」演出に使われる。"
      pros={[
        '強烈な懐古感',
        'パロディ・アート系で使える',
        '一目で「あの時代」と分かる',
      ]}
      cons={[
        '本気で使うとアクセシビリティ崩壊',
        'プロダクトには絶対合わない',
        '見る人によっては「単に古い」だけ',
      ]}
      example={
        <div
          className="rounded-md overflow-hidden"
          style={{
            background: '#c0c0c0',
            fontFamily: '"Times New Roman", serif',
          }}
        >
          <div
            className="text-center py-2 text-white text-2xl font-bold"
            style={{
              background: '#000080',
              fontFamily: '"Comic Sans MS", cursive',
            }}
          >
            ★ Welcome to My Page!! ★
          </div>
          <div className="p-4" style={{ background: '#ffff80' }}>
            <table className="mx-auto border-2 border-zinc-900" cellPadding={8}>
              <tbody>
                <tr style={{ background: '#ff0000' }}>
                  <td className="text-center text-white font-bold" colSpan={2}>
                    UNDER CONSTRUCTION
                  </td>
                </tr>
                <tr style={{ background: '#fff' }}>
                  <td>
                    <a className="text-blue-700 underline">HOME</a>
                  </td>
                  <td>
                    <a className="text-purple-700 underline">ABOUT ME</a>
                  </td>
                </tr>
                <tr style={{ background: '#fff' }}>
                  <td>
                    <a className="text-blue-700 underline">LINKS</a>
                  </td>
                  <td>
                    <a className="text-blue-700 underline">GUESTBOOK</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-4">
              <span className="inline-block bg-black text-emerald-400 px-3 py-1 font-mono text-xs">
                You are visitor #00012345
              </span>
            </div>
            <div
              className="mt-3 overflow-hidden whitespace-nowrap"
              style={{ background: '#000080', color: '#fff' }}
            >
              <div className="animate-marquee inline-block py-1 text-xs">
                ☆ Welcome! ☆ Sign my guestbook! ☆ Best viewed in Netscape Navigator! ☆ Updated 2026/06/04 ☆ {' '}
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
