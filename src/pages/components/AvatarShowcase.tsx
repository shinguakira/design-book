import { Avatar } from '../../components/ui/Avatar'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function AvatarShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Initials">
        <Avatar name="Taro Yamada" />
        <Avatar name="Hanako Sato" />
        <Avatar name="John Doe" />
        <Avatar />
      </ShowcaseRow>
      <ShowcaseRow label="Stacked">
        <div className="flex -space-x-2">
          <Avatar name="Taro Yamada" className="ring-2 ring-white" />
          <Avatar name="Hanako Sato" className="ring-2 ring-white" />
          <Avatar name="John Doe" className="ring-2 ring-white" />
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 text-zinc-500 text-xs font-medium ring-2 ring-white">
            +5
          </span>
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
