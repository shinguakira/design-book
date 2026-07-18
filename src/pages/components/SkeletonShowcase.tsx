import { Skeleton } from "../../components/ui/Skeleton";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function SkeletonShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Text lines">
        <div className="w-full max-w-md space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="Card placeholder">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 p-4 bg-white space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
