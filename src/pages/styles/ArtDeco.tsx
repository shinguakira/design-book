import { StyleDoc } from "../_shared/StyleDoc";

export default function ArtDeco() {
  return (
    <StyleDoc
      intro="1920-30年代、装飾と機械美の融合。ゴールド + ブラック + 幾何学的対称 + シェブロン (V字)+ 太いセリフ書体。エンパイアステートビル / クライスラービル / 戦間期のポスター。高級ホテル・ジュエリー・劇場系で今も現役。"
      pros={[
        "高級感・歴史感を一発で出せる",
        "対称・装飾でブランド力を上げる",
        "ゴールド配色が高単価商品と相性◎",
      ]}
      cons={[
        "モダンな機能性 UI には合わない",
        "装飾過剰になりやすい",
        "カジュアル / Z世代寄りには響かない",
      ]}
      example={
        <div
          className="p-8 rounded-md text-center"
          style={{
            background: "radial-gradient(ellipse at center, #1a1410 0%, #0a0703 100%)",
          }}
        >
          <div className="relative inline-block">
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "40px solid transparent",
                borderRight: "40px solid transparent",
                borderTop: "24px solid #d4af37",
              }}
            />
            <div
              className="px-12 py-6 border-4"
              style={{
                borderColor: "#d4af37",
                boxShadow: "0 0 0 1px #1a1410, 0 0 0 5px #d4af37",
              }}
            >
              <div
                className="text-[10px] tracking-[0.45em] mb-2"
                style={{ color: "#d4af37", fontFamily: "serif" }}
              >
                ★ ESTABLISHED ★
              </div>
              <div
                className="text-3xl font-bold tracking-widest"
                style={{
                  color: "#d4af37",
                  fontFamily: '"Playfair Display", serif',
                  textShadow: "2px 2px 0 #1a1410",
                }}
              >
                AETHER
              </div>
              <div className="my-2 flex items-center justify-center gap-2">
                <span className="block w-12 h-px" style={{ background: "#d4af37" }} />
                <span style={{ color: "#d4af37" }}>◆</span>
                <span className="block w-12 h-px" style={{ background: "#d4af37" }} />
              </div>
              <div
                className="text-xs tracking-[0.3em]"
                style={{ color: "#bf9a30", fontFamily: "serif" }}
              >
                M C M X X V
              </div>
            </div>
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "40px solid transparent",
                borderRight: "40px solid transparent",
                borderBottom: "24px solid #d4af37",
              }}
            />
          </div>
        </div>
      }
    />
  );
}
