import { StyleDoc } from "../_shared/StyleDoc";

export default function Y2K() {
  return (
    <StyleDoc
      intro="1998-2003年頃、iMac G3 や Windows Media Player に代表されるシルバー半透明・虹色反射・バブル感のスタイル。Z世代に「逆に新しい」と再評価され、現代の Vercel / Linear / Notion などの一部 UI に影響している。"
      pros={[
        "懐かしいが今でも先進的に見える",
        "半透明 + 反射が画面に厚みを生む",
        "ガジェット系・音楽系ブランドと相性◎",
      ]}
      cons={[
        "読みやすさはぼやけがち",
        "アクセシビリティ (コントラスト) が苦手",
        "装飾過剰でブランド差別化はしにくい",
      ]}
      example={
        <div
          className="p-8 rounded-md relative"
          style={{
            background: "radial-gradient(circle at 25% 25%, #c4d6f0 0%, #6a91d6 60%, #2e4f8a 100%)",
          }}
        >
          <div
            className="max-w-xs mx-auto p-5 rounded-3xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(173,200,225,0.4) 50%, rgba(120,150,200,0.5) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px rgba(255,255,255,0.35), 0 8px 32px rgba(0,0,30,0.35)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{
                background: "linear-gradient(90deg, #ff80ed, #80f9ff, #ffe680, #80ff95, #ff80ed)",
                opacity: 0.7,
              }}
            />
            <div
              className="text-zinc-900 font-bold text-lg"
              style={{ fontFamily: "Verdana, sans-serif" }}
            >
              ::: SURF 2000 :::
            </div>
            <div className="text-xs text-zinc-700 mt-1">Welcome to the Cyber Web</div>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-1 rounded-full text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(180deg, #8fbef5 0%, #2d5a90 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)",
                  textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                }}
              >
                OK
              </button>
              <button
                className="px-4 py-1 rounded-full text-xs font-bold text-zinc-800"
                style={{
                  background: "linear-gradient(180deg, #f5f5f5 0%, #b0b0b0 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
