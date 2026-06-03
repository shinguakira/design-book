import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function CardShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <div className="w-full max-w-md">
          <Card title="プロジェクト" description="月次の概要">
            このカードは title と description、コンテンツ、フッターを持ちます。
          </Card>
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="With footer">
        <div className="w-full max-w-md">
          <Card
            title="利用規約への同意"
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="secondary">あとで</Button>
                <Button>同意する</Button>
              </div>
            }
          >
            最新の利用規約に同意してください。
          </Card>
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
