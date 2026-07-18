import { Divider } from "../../components/ui/Divider";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function DividerShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Plain">
        <div className="w-full max-w-md">
          <Divider />
        </div>
      </ShowcaseRow>
      <ShowcaseRow label="With label">
        <div className="w-full max-w-md space-y-4">
          <Divider label="または" />
          <Divider label="2024" />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
