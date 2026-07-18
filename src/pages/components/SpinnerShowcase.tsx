import { Spinner } from "../../components/ui/Spinner";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function SpinnerShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Default">
        <Spinner />
      </ShowcaseRow>
      <ShowcaseRow label="On dark background">
        <div className="bg-zinc-900 rounded-md p-6">
          <Spinner className="border-zinc-700 border-t-white" />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="With label">
        <div className="inline-flex items-center gap-2 text-sm text-zinc-600">
          <Spinner size="sm" />
          読み込み中...
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
