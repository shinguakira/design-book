import { Button } from '../../components/ui/Button'
import { Menu } from '../../components/ui/Menu'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function MenuShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Dropdown">
        <Menu
          trigger={<Button variant="secondary">操作 ▾</Button>}
          items={[
            { label: '編集', onClick: () => {} },
            { label: '複製', onClick: () => {} },
            { label: 'アーカイブ', onClick: () => {} },
            { label: '削除', onClick: () => {}, danger: true },
          ]}
        />
      </ShowcaseRow>
      <ShowcaseRow label="User menu">
        <Menu
          trigger={
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 text-sm font-medium">
              YT
            </span>
          }
          items={[
            { label: 'プロフィール' },
            { label: '設定' },
            { label: 'ヘルプ' },
            { label: 'ログアウト', danger: true },
          ]}
        />
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
