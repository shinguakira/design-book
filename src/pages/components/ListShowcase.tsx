import { Switch } from '../../components/ui/Switch'
import { Badge } from '../../components/ui/Badge'
import { List } from '../../components/ui/List'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'
import { useState } from 'react'
import { Bell, Mail, Lock, ChevronRight } from 'lucide-react'

export default function ListShowcase() {
  const [push, setPush] = useState(true)
  const [email, setEmail] = useState(false)
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Settings">
        <div className="w-full max-w-lg">
          <List
            items={[
              {
                icon: <Bell className="w-5 h-5" />,
                title: 'プッシュ通知',
                description: '新着メッセージで通知',
                trailing: <Switch checked={push} onChange={setPush} />,
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'メール通知',
                description: '毎週ダイジェスト',
                trailing: <Switch checked={email} onChange={setEmail} />,
              },
              {
                icon: <Lock className="w-5 h-5" />,
                title: 'プライバシー',
                description: '公開範囲の設定',
                trailing: <ChevronRight className="w-4 h-4 text-zinc-400" />,
              },
            ]}
          />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Inbox">
        <div className="w-full max-w-lg">
          <List
            items={[
              {
                title: '山田 太郎',
                description: 'ミーティングの件で...',
                trailing: <Badge tone="info">New</Badge>,
              },
              {
                title: '佐藤 花子',
                description: '資料ありがとうございます',
              },
              {
                title: 'GitHub',
                description: 'PR #123 がマージされました',
              },
            ]}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
