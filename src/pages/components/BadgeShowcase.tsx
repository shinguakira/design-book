import { Badge } from '../../components/ui/Badge'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function BadgeShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Tones">
        <Badge>Neutral</Badge>
        <Badge tone="info">Info</Badge>
        <Badge tone="success">Active</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="error">Error</Badge>
      </ShowcaseRow>
      <ShowcaseRow label="With dot">
        <Badge tone="success">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
          オンライン
        </Badge>
        <Badge tone="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mr-1.5" />
          オフライン
        </Badge>
      </ShowcaseRow>
      <ShowcaseRow label="As counter">
        <span className="relative inline-flex items-center">
          <span className="text-sm">通知</span>
          <Badge tone="error">3</Badge>
        </span>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
