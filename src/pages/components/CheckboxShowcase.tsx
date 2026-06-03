import { useState } from 'react'
import { Checkbox } from '../../components/ui/Checkbox'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function CheckboxShowcase() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="States">
        <Checkbox label="チェック済み" checked={a} onChange={setA} />
        <Checkbox label="未チェック" checked={b} onChange={setB} />
      </ShowcaseRow>
      <ShowcaseRow label="Group">
        <div className="space-y-2">
          <Checkbox label="メールで通知" />
          <Checkbox label="プッシュ通知" />
          <Checkbox label="SMS通知" />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
