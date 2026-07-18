import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Drawer } from "../../components/ui/Drawer";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function DrawerShowcase() {
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Right">
        <Button onClick={() => setRight(true)}>右から開く</Button>
      </ShowcaseRow>
      <ShowcaseRow label="Left">
        <Button variant="secondary" onClick={() => setLeft(true)}>
          左から開く
        </Button>
      </ShowcaseRow>

      <Drawer open={right} onClose={() => setRight(false)} title="設定パネル" side="right">
        <p>右側にスライドインするDrawerの中身。</p>
        <p className="mt-3 text-zinc-500">背景クリックまたは Esc で閉じる。</p>
      </Drawer>
      <Drawer open={left} onClose={() => setLeft(false)} title="メニュー" side="left">
        <ul className="space-y-2">
          <li>ホーム</li>
          <li>プロジェクト</li>
          <li>設定</li>
        </ul>
      </Drawer>
    </ShowcaseGrid>
  );
}
