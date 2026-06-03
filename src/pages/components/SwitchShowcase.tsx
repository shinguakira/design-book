import { useState } from 'react'
import { Switch } from '../../components/ui/Switch'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function SwitchShowcase() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="States">
        <Switch checked={a} onChange={setA} />
        <Switch checked={b} onChange={setB} />
      </ShowcaseRow>
      <ShowcaseRow label="With label">
        <label className="flex items-center justify-between w-full max-w-sm">
          <div>
            <div className="text-sm font-medium">通知を受け取る</div>
            <div className="text-xs text-zinc-500">新着メッセージで通知</div>
          </div>
          <Switch checked={a} onChange={setA} />
        </label>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
