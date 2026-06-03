import { StyleDoc } from '../_shared/StyleDoc'

export default function MaterialDesign() {
  return (
    <StyleDoc
      intro="Googleが提唱したデザイン言語。フラットデザインに「紙(material)」のメタファーを持ち込み、要素ごとに高さ (elevation) を与えて影で重なりを表現する。ボタンや FAB が浮いて見える。"
      pros={[
        'クリック可能な要素が「浮いている」のですぐ分かる',
        '一貫したコンポーネント体系で実装しやすい',
        'モーション・トランジションのガイドが揃っている',
        'Android との親和性',
      ]}
      cons={[
        'Googleっぽさが強く、ブランド固有感を出しにくい',
        '影の使い方を誤るとうるさい',
        '密度の高い情報設計には不向き',
      ]}
      example={
        <div className="bg-zinc-50 p-8 rounded-md">
          <div className="bg-white p-6 rounded-lg max-w-sm shadow-md">
            <div className="text-lg font-semibold text-zinc-900">プラン</div>
            <div className="text-sm text-zinc-500 mt-1">月額 ¥980</div>
            <p className="text-sm text-zinc-700 mt-3">
              すべての機能を制限なく利用できます。
            </p>
            <button className="mt-4 bg-indigo-600 text-white text-sm font-medium uppercase tracking-wider px-4 h-10 rounded shadow-md hover:shadow-lg transition">
              Upgrade
            </button>
          </div>
          <button className="mt-6 ml-auto flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 text-white text-2xl shadow-lg hover:shadow-xl transition">
            ＋
          </button>
        </div>
      }
    />
  )
}
