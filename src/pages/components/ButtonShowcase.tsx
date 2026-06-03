import { Button } from '../../components/ui/Button'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function ButtonShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </ShowcaseRow>

      <ShowcaseRow label="Disabled">
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="danger" disabled>Danger</Button>
      </ShowcaseRow>

      <ShowcaseRow label="With icon">
        <Button>
          <span className="mr-2">＋</span>新規作成
        </Button>
        <Button variant="secondary">
          ダウンロード<span className="ml-2">↓</span>
        </Button>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
