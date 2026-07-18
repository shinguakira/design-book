import { StyleDoc } from "../_shared/StyleDoc";

export default function FlatDesign() {
  return (
    <StyleDoc
      intro="装飾を極力削ぎ落とし、純色・シンプルな形・タイポグラフィのコントラストだけで構成するスタイル。影やグラデーション、テクスチャを使わない。2013年以降のWebUIの基本となった考え方。"
      pros={[
        "読みやすく、情報の構造が伝わりやすい",
        "パフォーマンスが良い (重い影や画像不要)",
        "モバイル/レスポンシブとの相性が抜群",
        "デザイナーの好みに左右されにくく長持ち",
      ]}
      cons={[
        "クリック可能/不可の区別が弱くなる (要件としてのアフォーダンス低下)",
        "差別化が難しい・量産型に見える",
        "触覚的な楽しさはない",
      ]}
      example={
        <div className="bg-zinc-50 p-8 rounded-md">
          <div className="bg-white p-6 rounded-md max-w-sm">
            <div className="text-lg font-semibold text-zinc-900">プラン</div>
            <div className="text-sm text-zinc-500 mt-1">月額 ¥980</div>
            <p className="text-sm text-zinc-700 mt-3">すべての機能を制限なく利用できます。</p>
            <button className="mt-4 bg-blue-600 text-white text-sm font-medium px-4 h-10 rounded">
              アップグレード
            </button>
          </div>
        </div>
      }
    />
  );
}
