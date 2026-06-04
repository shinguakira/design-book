import { useState } from 'react'
import { Mail, Newspaper, Scroll, Shuffle } from 'lucide-react'
import {
  PaperModal,
  pickRandomAnim,
  type DrawerAnim,
} from '../_shared/PaperModal'

type Variant = {
  id: DrawerAnim
  Icon: typeof Mail
  label: string
  description: string
  phases: string[]
}

const VARIANTS: Variant[] = [
  {
    id: 'envelope',
    Icon: Mail,
    label: 'Envelope',
    description:
      '伝書鳩が右上から封筒を運んでくる → ペーパーナイフが上端を切る → フタが回転して開く → 蝋封が弾ける。',
    phases: [
      '0–720ms: 伝書鳩が封筒を運ぶ',
      '720ms: モーダル本体が pop',
      '1080ms: ナイフが横切る',
      '1320ms: 蝋封が震える',
      '1500ms: フタが rotateX で開く',
    ],
  },
  {
    id: 'unfold',
    Icon: Newspaper,
    label: 'Unfold',
    description:
      '折り畳まれたニュースレターが下から飛んでくる → モーダルが pop → 中の各セクションが順に開く (rotateX)。',
    phases: [
      '0–720ms: ニュースレターが下から飛ぶ',
      '720ms: モーダル pop',
      '1080ms–: 各 .pm-section が順に開く',
    ],
  },
  {
    id: 'drop',
    Icon: Scroll,
    label: 'Drop',
    description:
      '巻物が天井から落ちてくる → モーダルが pop → 各セクションが軽くバウンドして着地。',
    phases: [
      '0–720ms: 巻物が上から落ちる',
      '720ms: モーダル pop',
      '1080ms–: 各 .pm-section が settle',
    ],
  },
]

export default function ModalEffects() {
  const [open, setOpen] = useState<{
    variant: DrawerAnim
    key: number
  } | null>(null)

  const trigger = (variant: DrawerAnim) =>
    setOpen({ variant, key: Date.now() })

  return (
    <div className="max-w-5xl space-y-6">
      <p className="text-sm text-zinc-700 leading-relaxed">
        モーダルを「ただ出す」だけでなく、世界観に合わせた演出を入れるパターン。
        pubmed-search プロジェクトで実装した3種類の「紙」モーダル — 封筒・新聞・巻物
        を移植。クリックで各演出を体験できます。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => trigger(v.id)}
            className="group text-left rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-400 hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <v.Icon className="w-5 h-5 text-amber-900" />
            </div>
            <div className="font-semibold text-sm">{v.label}</div>
            <div className="text-xs text-zinc-500 mt-1 leading-relaxed">
              {v.description}
            </div>
          </button>
        ))}
        <button
          onClick={() => trigger(pickRandomAnim())}
          className="sm:col-span-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-4 hover:border-zinc-500 hover:bg-white transition text-sm font-medium inline-flex items-center justify-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          ランダムで開く
        </button>
      </div>

      <section>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          タイミング (各 variant の Phase 構造)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VARIANTS.map((v) => (
            <div
              key={v.id}
              className="rounded-lg border border-zinc-200 bg-white p-4"
            >
              <div className="text-sm font-medium mb-2">{v.label}</div>
              <ol className="text-xs text-zinc-600 space-y-1">
                {v.phases.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-zinc-400 tabular-nums">{i + 1}.</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
        <div className="font-semibold mb-2">使い所</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>「特別感のあるコンテンツを開く」(論文・手紙・お知らせ等) で世界観を出す</li>
          <li>毎回ランダムに variant を切り替えると、繰り返し操作も飽きにくい</li>
          <li>注意: 720ms 以上の delay は「操作が遅い」と感じさせるリスク。
            実プロダクトでは初回のみ・スキップ可能にする等を検討</li>
        </ul>
      </section>

      <PaperModal
        variant={open?.variant ?? 'envelope'}
        open={!!open}
        onClose={() => setOpen(null)}
        title="モーダル"
        bodyKey={open?.key}
        meta={`Variant — ${open?.variant ?? ''}`}
      >
        <article className="space-y-5 text-[#2a1d10]">
          <header className="pm-section space-y-2 border-b border-[#b89e6b]/60 pb-3">
            <h1 className="font-serif text-2xl font-semibold leading-tight tracking-tight">
              いま開いたモーダルは "{open?.variant}" 演出
            </h1>
            <p className="text-xs italic text-[#7a5a30]">
              Demo · {new Date().getFullYear()}
            </p>
          </header>

          <section className="pm-section space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30]">
              How it works
            </h2>
            <p className="font-serif text-[14px] leading-relaxed text-[#2a1d10]/90">
              <code className="bg-[#e8dcbd] px-1 py-0.5 rounded text-[12px]">
                data-anim="{open?.variant}"
              </code>{' '}
              を backdrop に付けて、その下の <code>.mail-courier</code> /{' '}
              <code>.pm-flap</code> / <code>.pm-section</code> / <code>.pm-knife</code>
              などに CSS keyframes が割り当たります。
              各要素は親の data-anim を見て自分の動きを決めるので、
              variant を切り替えるだけで挙動が変わります。
            </p>
          </section>

          <section className="pm-section space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30]">
              Why three variants
            </h2>
            <p className="font-serif text-[14px] leading-relaxed text-[#2a1d10]/90">
              「毎回同じ演出は飽きる」「ランダム要素で記憶に残る」の2点。
              開閉のたびにユーザーへ小さな贈り物のような体験を提供します。
            </p>
          </section>
        </article>
      </PaperModal>
    </div>
  )
}
