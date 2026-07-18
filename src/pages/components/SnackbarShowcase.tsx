import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Snackbar } from "../../components/ui/Snackbar";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

type Tone = "info" | "success" | "error";

export default function SnackbarShowcase() {
  const [state, setState] = useState<{ open: boolean; tone: Tone; message: string }>({
    open: false,
    tone: "info",
    message: "",
  });

  const show = (tone: Tone, message: string) => setState({ open: true, tone, message });

  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Trigger">
        <Button onClick={() => show("info", "保存しました")}>Info</Button>
        <Button variant="secondary" onClick={() => show("success", "アップロード完了")}>
          Success
        </Button>
        <Button variant="danger" onClick={() => show("error", "失敗しました")}>
          Error
        </Button>
      </ShowcaseRow>

      <Snackbar
        open={state.open}
        message={state.message}
        tone={state.tone}
        onClose={() => setState((s) => ({ ...s, open: false }))}
      />
    </ShowcaseGrid>
  );
}
