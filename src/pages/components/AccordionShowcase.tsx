import { Accordion } from '../../components/ui/Accordion'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function AccordionShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="FAQ">
        <div className="w-full max-w-2xl">
          <Accordion
            items={[
              {
                id: 'a',
                title: '料金プランは変更できますか?',
                content: 'いつでもプラン変更できます。差額は日割りで計算されます。',
              },
              {
                id: 'b',
                title: '解約方法を教えてください',
                content: '設定 > サブスクリプション から解約できます。',
              },
              {
                id: 'c',
                title: '請求書をPDFで欲しい',
                content: '請求履歴から各月の請求書をPDFでダウンロードできます。',
              },
            ]}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
