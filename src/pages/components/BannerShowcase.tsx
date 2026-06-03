import { useState } from 'react'
import { Banner } from '../../components/ui/Banner'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function BannerShowcase() {
  const [open, setOpen] = useState(true)
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Tones">
        <div className="w-full space-y-2">
          <Banner tone="info">新機能リリース!ダークモードに対応しました。</Banner>
          <Banner tone="success">サブスクリプションが有効になりました。</Banner>
          <Banner tone="warning">
            メンテナンスを予定しています (12/24 02:00 - 04:00)。
          </Banner>
          <Banner tone="error">
            一部機能で障害が発生しています。復旧作業中です。
          </Banner>
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Closable">
        <div className="w-full">
          {open ? (
            <Banner tone="info" onClose={() => setOpen(false)}>
              ×ボタンで閉じられる。
            </Banner>
          ) : (
            <button
              className="text-xs text-zinc-500 underline"
              onClick={() => setOpen(true)}
            >
              戻す
            </button>
          )}
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
