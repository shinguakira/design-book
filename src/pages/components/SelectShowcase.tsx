import { Select } from '../../components/ui/Select'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function SelectShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <div className="w-full max-w-sm space-y-3">
          <Select
            label="国"
            options={[
              { value: 'jp', label: '日本' },
              { value: 'us', label: 'アメリカ' },
              { value: 'uk', label: 'イギリス' },
            ]}
          />
          <Select
            label="並び順"
            options={[
              { value: 'new', label: '新しい順' },
              { value: 'old', label: '古い順' },
              { value: 'name', label: '名前順' },
            ]}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
