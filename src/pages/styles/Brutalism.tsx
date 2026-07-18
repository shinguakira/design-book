import { StyleDoc } from "../_shared/StyleDoc";

export default function Brutalism() {
  return (
    <StyleDoc
      intro="洗練を意図的に拒否し、生(raw)・粗削り・等幅フォント・太い枠・強コントラスト・ハードシャドウで構成する反デザイン的スタイル。建築のブルータリズムが語源。アンダーグラウンドやアート寄りで採用される。"
      pros={[
        "強烈に記憶に残る・他と被らない",
        "尖ったメッセージ性・態度を出せる",
        "実装はシンプル (グラデや影が要らない)",
      ]}
      cons={[
        "読みづらく、合う顧客が限られる",
        "B2B / 一般消費者向けプロダクトには基本ハマらない",
        "使いどころを間違えるとただの素人感",
      ]}
      example={
        <div className="p-12 bg-yellow-300 rounded-md">
          <div className="bg-white p-6 max-w-sm border-4 border-black shadow-[8px_8px_0_#000] font-mono">
            <div className="text-xl font-bold uppercase">PLAN</div>
            <div className="text-sm mt-1">¥980 / month</div>
            <p className="text-sm mt-3">すべての機能を制限なく利用できます。</p>
            <button className="mt-4 bg-black text-yellow-300 font-bold uppercase tracking-wider px-4 h-10 border-2 border-black hover:bg-yellow-300 hover:text-black transition">
              UPGRADE →
            </button>
          </div>
        </div>
      }
    />
  );
}
