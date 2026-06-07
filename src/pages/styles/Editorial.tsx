import { StyleDoc } from '../_shared/StyleDoc'

export default function Editorial() {
  return (
    <StyleDoc
      intro="雑誌・新聞の組版を Web に持ち込んだスタイル。大型 Serif タイトル + ドロップキャップ + 段組 + ヘアラインの区切り。Stripe Blog / Vox / Apple Newsroom / NYT が代表例。読み物として信頼感がある。"
      pros={[
        '読みやすさ・知性のある印象',
        '長文コンテンツとの相性が抜群',
        'ブランドの「品」を出せる',
      ]}
      cons={[
        '画面狭いと段組が破綻しやすい',
        'インタラクティブ UI には不向き',
        'Serif フォントが日本語で映えにくい場面も',
      ]}
      example={
        <div
          className="rounded-md bg-white p-8 border border-zinc-200"
          style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
        >
          <div className="text-[10px] uppercase tracking-[0.32em] text-zinc-500 mb-3">
            Design — Vol. XXI
          </div>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 mb-3">
            The Future of Editorial Design on the Web
          </h1>
          <p className="text-xs italic text-zinc-500 mb-5">
            By Toranosuke · June 4, 2026 · 6 min read
          </p>
          <hr className="border-zinc-300 mb-5" />
          <div className="columns-2 gap-8 text-[14px] leading-relaxed text-zinc-800">
            <p>
              <span className="float-left mr-2 mt-1 text-5xl font-bold leading-none text-zinc-900">
                T
              </span>
              he web is rediscovering its roots in print typography. Where
              early CSS was content with body copy in Verdana, today's
              editorial-minded sites lean into the conventions of magazine
              design — drop caps, ligatures, and a deliberate hierarchy that
              guides the eye down the column.
            </p>
            <p className="mt-3">
              Designers at <em>Stripe</em>, <em>Vox</em>, and{' '}
              <em>The New York Times</em> have shown that long-form reading
              and dense information can coexist on the same screen. The trick
              is restraint: a strong grid, a single accent color, and
              typography that does the heavy lifting.
            </p>
          </div>
        </div>
      }
    />
  )
}
