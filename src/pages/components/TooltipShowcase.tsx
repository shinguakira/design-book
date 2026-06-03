import { Button } from '../../components/ui/Button'
import { Tooltip } from '../../components/ui/Tooltip'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function TooltipShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Hover to show">
        <Tooltip label="保存する (⌘S)">
          <Button>保存</Button>
        </Tooltip>
        <Tooltip label="このアカウントから出る">
          <Button variant="secondary">ログアウト</Button>
        </Tooltip>
        <Tooltip label="ヘルプを開く">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-200 text-zinc-700 text-xs cursor-help">
            ?
          </span>
        </Tooltip>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
