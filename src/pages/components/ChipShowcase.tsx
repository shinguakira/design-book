import { useState } from 'react'
import { Chip } from '../../components/ui/Chip'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function ChipShowcase() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Vite'])
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Static">
        <Chip>Default</Chip>
        <Chip>Design</Chip>
        <Chip>UI</Chip>
        <Chip>Frontend</Chip>
      </ShowcaseRow>
      <ShowcaseRow label="Removable">
        {tags.map((t) => (
          <Chip key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>
            {t}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-zinc-400">
            全部消したら一度リロード
          </span>
        )}
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
