import { StyleDoc } from '../_shared/StyleDoc'

export default function MidCentury() {
  return (
    <StyleDoc
      intro="1950-60年代、戦後の楽観主義と機能美。マスタード・ティール・オレンジ + 木目テクスチャ + 細い金属脚 + Helvetica。Eames チェアやアトミックエイジ。北欧家具、West Elm、Apple TV+ ロゴデザインなどに影響。"
      pros={[
        '暖かさ + 知性が同居する大人の落ち着き',
        '家具・インテリア・ECサイトと相性',
        '時代を超えて愛される定番感',
      ]}
      cons={[
        '若年層には地味に見えがち',
        'デジタル UI の派手さは出せない',
        'カラーの組合せがやや限定',
      ]}
      example={
        <div
          className="p-8 rounded-md"
          style={{
            background: '#f5ead4',
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(216,180,99,0.15) 0%, transparent 50%)',
          }}
        >
          <div className="max-w-sm mx-auto">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{
                  background: '#d4a85f',
                  color: '#3e2f17',
                  fontFamily: 'Helvetica, sans-serif',
                  boxShadow: '4px 4px 0 #5a3f1a',
                }}
              >
                ★
              </div>
              <div className="flex-1">
                <div
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: '#7a5732', fontFamily: 'Helvetica' }}
                >
                  Atomic Age
                </div>
                <div
                  className="text-2xl font-bold mt-1"
                  style={{ color: '#3e2f17', fontFamily: 'Helvetica' }}
                >
                  Eames Chair
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: '#5a3f1a', fontFamily: 'Helvetica' }}
                >
                  Designed 1956 · Still in production
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: '#d97742',
                  color: '#fff',
                  fontFamily: 'Helvetica',
                  boxShadow: '3px 3px 0 #5a2a10',
                }}
              >
                Shop now
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: '#3a7a72',
                  color: '#fff',
                  fontFamily: 'Helvetica',
                  boxShadow: '3px 3px 0 #1c3a35',
                }}
              >
                Details
              </button>
            </div>
            <div
              className="mt-6 h-px"
              style={{ background: '#7a5732', opacity: 0.4 }}
            />
            <div
              className="mt-3 text-[10px] uppercase tracking-[0.3em] text-right"
              style={{ color: '#7a5732' }}
            >
              EST 1952
            </div>
          </div>
        </div>
      }
    />
  )
}
