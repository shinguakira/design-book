import { Textarea } from '../../components/ui/Textarea'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function TextareaShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <div className="w-full max-w-md space-y-3">
          <Textarea
            label="フィードバック"
            placeholder="ご意見をお聞かせください"
            rows={5}
          />
          <Textarea
            label="メモ"
            defaultValue="改行も入れられる\n複数行のテキスト。"
            rows={3}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
