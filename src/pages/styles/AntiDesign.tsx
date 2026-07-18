import { StyleDoc } from "../_shared/StyleDoc";

export default function AntiDesign() {
  return (
    <StyleDoc
      intro="「整っていること」自体への反抗。要素のズレ・崩れ・等幅と装飾の混在・あえての悪いカーニング。Brutalism と隣接するが、もっと「壊し」の意図が強い。Balenciaga / Off-White / 現代アート系で使われる。"
      pros={[
        "注目を引く・SNS で拡散される",
        "「他と違う」を即座に表現",
        "完成品っぽさのないラフさが新鮮",
      ]}
      cons={[
        "プロダクト UI には基本合わない",
        "広告以外で多用すると「ただ雑」",
        "読みやすさ・使いやすさは犠牲",
      ]}
      example={
        <div className="p-8 bg-white rounded-md border border-zinc-200 relative overflow-hidden">
          <div
            className="absolute top-4 left-12 text-8xl font-black opacity-10"
            style={{ fontFamily: "sans-serif", transform: "rotate(-8deg)" }}
          >
            NO
          </div>
          <div className="absolute top-2 right-3 text-xs font-mono" style={{ color: "#dc2626" }}>
            [DRAFT v0.001]
          </div>
          <div className="relative">
            <div
              className="text-[68px] font-black leading-[0.9]"
              style={{
                fontFamily: "sans-serif",
                letterSpacing: "-0.05em",
                color: "#000",
              }}
            >
              <span style={{ display: "inline-block", transform: "translateY(4px)" }}>a</span>
              <span
                style={{ display: "inline-block", transform: "translateY(-2px) rotate(-3deg)" }}
              >
                N
              </span>
              <span style={{ display: "inline-block", color: "#dc2626" }}>t</span>
              <span style={{ display: "inline-block", transform: "translateY(8px)" }}>i</span>
              <span style={{ display: "inline-block" }}>—</span>
              <br />
              <span style={{ display: "inline-block", transform: "translateY(-4px)" }}>d</span>
              <span
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#fff",
                  padding: "0 6px",
                }}
              >
                e
              </span>
              <span style={{ display: "inline-block" }}>S</span>
              <span style={{ display: "inline-block", transform: "translateY(6px) rotate(5deg)" }}>
                I
              </span>
              <span style={{ display: "inline-block", fontFamily: "serif" }}>g</span>
              <span style={{ display: "inline-block", color: "#dc2626" }}>N</span>
            </div>
            <div className="mt-3 text-xs font-mono" style={{ color: "#525252" }}>
              / no-rules.css applied // alignment.css disabled
            </div>
            <button
              className="mt-4 px-4 py-2 border-2 text-sm font-bold"
              style={{
                borderColor: "#000",
                background: "transparent",
                fontFamily: "sans-serif",
                transform: "rotate(-1deg)",
              }}
            >
              click .... if you want
            </button>
          </div>
        </div>
      }
    />
  );
}
