import { StyleDoc } from "../_shared/StyleDoc";

export default function Cyberpunk() {
  return (
    <StyleDoc
      intro="黒+ネオン (シアン・マゼンタ)+カタカナ+グリッチ+クリップパス形状で構成される未来都市感。Blade Runner / Akira / Ghost in the Shell の系譜。Web3・ゲーム LP・暗号資産系で散見される。"
      pros={[
        "世界観が強烈で記憶に残る",
        "黒ベースで OLED 親和性も高い",
        "ゲーミング・テック・反体制系ブランドにハマる",
      ]}
      cons={[
        "読みやすさ・アクセシビリティが致命的に弱い",
        "一般 SaaS には合わない",
        "ネオン乱用で安っぽくなる",
      ]}
      example={
        <div className="relative p-8 rounded-md overflow-hidden bg-black">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,255,255,0.06) 0 1px, transparent 1px 3px)",
            }}
          />
          <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 tracking-wider opacity-70">
            // SYS_LOG :: TOKYO_2099
          </div>
          <div
            className="relative max-w-sm mx-auto p-5 border border-cyan-400"
            style={{
              background: "rgba(255,0,255,0.04)",
              boxShadow: "0 0 22px rgba(0,255,255,0.6), inset 0 0 22px rgba(0,255,255,0.15)",
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
          >
            <div className="font-mono text-cyan-300 text-[10px] uppercase tracking-[0.25em]">
              ▶ ACCESS_GRANTED
            </div>
            <div
              className="text-3xl font-black mt-1 leading-none"
              style={{
                color: "#ff00ff",
                textShadow: "2px 0 0 #00ffff, -2px 0 0 #ff00ff, 0 0 8px #ff00ff",
              }}
            >
              NEO-TOKYO
            </div>
            <div className="text-xs text-zinc-400 mt-2 font-mono">
              &gt; user.connect()
              <br />
              &gt; <span className="text-emerald-400">OK</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-1 text-xs font-bold uppercase font-mono"
                style={{
                  background: "#00ffff",
                  color: "#000",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 8px 100%)",
                  textShadow: "none",
                }}
              >
                CONNECT
              </button>
              <button
                className="px-4 py-1 text-xs font-bold uppercase font-mono border border-fuchsia-500 text-fuchsia-300"
                style={{
                  background: "transparent",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 8px 100%)",
                }}
              >
                ABORT
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
