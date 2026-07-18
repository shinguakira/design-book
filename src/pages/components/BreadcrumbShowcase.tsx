import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function BreadcrumbShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "Settings", href: "#" },
            { label: "プロフィール" },
          ]}
        />
      </ShowcaseRow>
      <ShowcaseRow label="Long">
        <Breadcrumb
          items={[
            { label: "Workspace", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Design Book", href: "#" },
            { label: "Components", href: "#" },
            { label: "Breadcrumb" },
          ]}
        />
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
