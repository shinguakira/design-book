import { useState } from 'react'
import { Radio } from '../../components/ui/Radio'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function RadioShowcase() {
  const [value, setValue] = useState('monthly')
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Plan">
        <div className="space-y-2">
          <Radio
            name="plan"
            value="monthly"
            label="月額プラン"
            checked={value === 'monthly'}
            onChange={setValue}
          />
          <Radio
            name="plan"
            value="yearly"
            label="年額プラン (2ヶ月分お得)"
            checked={value === 'yearly'}
            onChange={setValue}
          />
          <Radio
            name="plan"
            value="lifetime"
            label="買い切りプラン"
            checked={value === 'lifetime'}
            onChange={setValue}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
