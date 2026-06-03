import { Alert } from '../../components/ui/Alert'
import { ShowcaseGrid, ShowcaseRow } from '../_shared/Showcase'

export default function AlertShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Tones">
        <div className="w-full space-y-3">
          <Alert tone="info" title="お知らせ">
            メンテナンスを予定しています。
          </Alert>
          <Alert tone="success" title="保存しました">
            変更がすべて保存されました。
          </Alert>
          <Alert tone="warning" title="ご注意">
            この操作は元に戻せません。
          </Alert>
          <Alert tone="error" title="エラー">
            通信に失敗しました。時間をおいて再度お試しください。
          </Alert>
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Title only">
        <div className="w-full">
          <Alert tone="info" title="情報のみ。詳細テキストなし。" />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  )
}
