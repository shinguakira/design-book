import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Dialog } from "../../components/ui/Dialog";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function DialogShowcase() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <Button onClick={() => setOpen(true)}>ダイアログを開く</Button>
      </ShowcaseRow>
      <ShowcaseRow label="Confirm">
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          削除...
        </Button>
      </ShowcaseRow>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="お知らせ"
        actions={<Button onClick={() => setOpen(false)}>OK</Button>}
      >
        ダイアログの本文。背景クリックまたは Esc で閉じる。
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="本当に削除しますか?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              キャンセル
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>
              削除する
            </Button>
          </>
        }
      >
        この操作は取り消せません。
      </Dialog>
    </ShowcaseGrid>
  );
}
