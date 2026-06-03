import { Button } from '../../components/ui/Button'
import { Popover } from '../../components/ui/Popover'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function PopoverShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Click to open">
        <Popover trigger={<Button variant="secondary">フィルタ ▾</Button>}>
          <div className="space-y-2">
            <div className="font-semibold text-sm">絞り込み</div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> 公開のみ
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> 自分が作成
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> アーカイブ済を含む
            </label>
          </div>
        </Popover>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
