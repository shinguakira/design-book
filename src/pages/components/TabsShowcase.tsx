import { Tabs } from "../../components/ui/Tabs";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function TabsShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Basic">
        <div className="w-full max-w-2xl">
          <Tabs
            tabs={[
              { id: "profile", label: "プロフィール", content: "プロフィールの内容" },
              { id: "account", label: "アカウント", content: "アカウントの内容" },
              { id: "notif", label: "通知", content: "通知の内容" },
              { id: "billing", label: "請求", content: "請求の内容" },
            ]}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
