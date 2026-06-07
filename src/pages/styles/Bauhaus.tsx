import { StyleDoc } from '../_shared/StyleDoc'

export default function Bauhaus() {
  return (
    <StyleDoc
      intro="1919年ドイツ発の総合芸術運動。原色 (赤・青・黄) + 基本図形 (◯△□) + サンセリフ典型。「Form follows function」のスローガンで100年経っても古びない。モダニズム UI の源流。"
      pros={[
        '時代を超える普遍性',
        'カラー&図形の引出しが明快で再現しやすい',
        'ブランド identity に強い印象を残せる',
      ]}
      cons={[
        'ビジュアル要素が少ないので「やり過ぎ」厳禁',
        '商業色が薄く、感情訴求は苦手',
        '原色は使いどころが難しい',
      ]}
      example={
        <div className="p-10 rounded-md" style={{ background: '#fdf6e3' }}>
          <div
            className="relative mx-auto"
            style={{ width: 260, height: 200 }}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: 260,
                height: 90,
                background: '#dc2626',
              }}
            />
            <div
              className="absolute"
              style={{
                left: 0,
                bottom: 0,
                width: 120,
                height: 60,
                background: '#2563eb',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                right: 0,
                bottom: 0,
                width: 130,
                height: 130,
                background: '#facc15',
              }}
            />
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: 50,
                height: 50,
                transform: 'translate(-50%, -50%)',
                background: '#111',
              }}
            />
          </div>
          <div
            className="text-center mt-6 text-[10px] uppercase tracking-[0.35em] text-zinc-700"
            style={{ fontFamily: 'sans-serif' }}
          >
            Form Follows Function · Est. 1919
          </div>
        </div>
      }
    />
  )
}
