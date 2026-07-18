import { StyleDoc } from "../_shared/StyleDoc";

export default function Aurora() {
  return (
    <StyleDoc
      intro="ぼかしの効いた多色グラデーション (Mesh Gradient) を主役にするスタイル。Stripe / Linear / Vercel が代表。「Aurora」「Mesh Gradient」「Blob Background」とも呼ばれる。AI画像生成の発展で派生したパターン。"
      pros={[
        "画面に深みと現代感が一気に出る",
        "CSS だけで再現可 (画像不要)",
        "AI / ML / 次世代テック系ブランドと相性",
      ]}
      cons={[
        "コントラストが落ちると文字が読みにくい",
        "やり過ぎると軽薄に見える",
        "モバイルでパフォーマンス注意 (blur)",
      ]}
      example={
        <div
          className="relative overflow-hidden rounded-md p-8"
          style={{ background: "#0a0a0f", minHeight: 240 }}
        >
          <div
            className="absolute"
            style={{
              top: -40,
              left: -40,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: 40,
              right: -60,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: -40,
              left: 80,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
              filter: "blur(45px)",
            }}
          />
          <div className="relative max-w-sm mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] backdrop-blur"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              New release · v4.0
            </div>
            <h1
              className="mt-3 text-4xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The new
              <br />
              Aurora
            </h1>
            <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
              Soft, layered gradients —<br />
              the language of modern SaaS.
            </p>
            <button
              className="mt-4 px-5 h-10 rounded-full text-sm font-semibold backdrop-blur"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Get started →
            </button>
          </div>
        </div>
      }
    />
  );
}
