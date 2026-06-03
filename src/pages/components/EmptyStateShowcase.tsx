import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'
import { Search } from 'lucide-react'

export default function EmptyStateShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="No data">
        <div className="w-full rounded-lg border border-zinc-200 bg-white">
          <EmptyState
            title="まだプロジェクトがありません"
            description="新しいプロジェクトを作って始めましょう"
            action={<Button>プロジェクトを作成</Button>}
          />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Search no result">
        <div className="w-full rounded-lg border border-zinc-200 bg-white">
          <EmptyState
            icon={<Search className="w-5 h-5" />}
            title="該当する結果が見つかりません"
            description="別のキーワードでお試しください"
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
