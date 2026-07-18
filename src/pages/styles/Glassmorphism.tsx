import { StyleDoc } from "../_shared/StyleDoc";

export default function Glassmorphism() {
  return (
    <StyleDoc
      intro="半透明 + 背景ブラー + 細い縁取り + カラフルな背景。「すりガラス」の質感。Apple の Big Sur / iOS、Windows 11 でも採用されている。"
      pros={[
        "奥行きと階層が直感的に伝わる",
        "カラフルな写真や背景と組み合わせると映える",
        "モダン・先進的な印象",
      ]}
      cons={[
        "背景がないと成立しない (単色背景では効果ゼロ)",
        "コントラストが弱く、テキストが読みにくくなりがち",
        "backdrop-filter の負荷 / 古いブラウザ非対応",
      ]}
      example={
        <div
          className="p-12 rounded-md relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f472b6 0%, #818cf8 50%, #22d3ee 100%)",
          }}
        >
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-yellow-300/60" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-emerald-300/50" />
          <div className="relative max-w-sm p-6 rounded-2xl border border-white/40 backdrop-blur-md bg-white/20 shadow-xl">
            <div className="text-lg font-semibold text-white drop-shadow">プラン</div>
            <div className="text-sm text-white/80 mt-1">月額 ¥980</div>
            <p className="text-sm text-white/90 mt-3">すべての機能を制限なく利用できます。</p>
            <button className="mt-4 text-sm font-medium px-4 h-10 rounded-lg bg-white/30 backdrop-blur text-white border border-white/40">
              アップグレード
            </button>
          </div>
        </div>
      }
    />
  );
}
