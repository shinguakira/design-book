import { ProgressBar } from "../../components/ui/ProgressBar";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function ProgressBarShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Values">
        <div className="w-full space-y-3 max-w-md">
          <div>
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>アップロード中</span>
              <span>30%</span>
            </div>
            <ProgressBar value={30} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>処理中</span>
              <span>65%</span>
            </div>
            <ProgressBar value={65} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>完了</span>
              <span>100%</span>
            </div>
            <ProgressBar value={100} />
          </div>
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
