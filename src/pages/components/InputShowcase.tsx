import { Input } from '../../components/ui/Input'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function InputShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="States">
        <div className="w-full max-w-sm space-y-3">
          <Input label="名前" placeholder="山田太郎" />
          <Input
            label="メール"
            type="email"
            placeholder="you@example.com"
            hint="ログインに使うメールアドレス"
          />
          <Input
            label="パスワード"
            type="password"
            defaultValue="weakpw"
            error="8文字以上で入力してください"
          />
          <Input label="無効" placeholder="編集不可" disabled />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
