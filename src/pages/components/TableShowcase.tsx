import { Badge } from "../../components/ui/Badge";
import { Table } from "../../components/ui/Table";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function TableShowcase() {
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Users">
        <div className="w-full">
          <Table
            columns={[
              { key: "name", label: "名前" },
              { key: "email", label: "メール" },
              { key: "role", label: "権限" },
              { key: "status", label: "ステータス" },
            ]}
            rows={[
              {
                name: "山田太郎",
                email: "taro@example.com",
                role: "Admin",
                status: <Badge tone="success">Active</Badge>,
              },
              {
                name: "佐藤花子",
                email: "hanako@example.com",
                role: "Editor",
                status: <Badge tone="success">Active</Badge>,
              },
              {
                name: "田中一郎",
                email: "ichiro@example.com",
                role: "Viewer",
                status: <Badge tone="warning">Pending</Badge>,
              },
              {
                name: "John Doe",
                email: "john@example.com",
                role: "Viewer",
                status: <Badge tone="neutral">Invited</Badge>,
              },
            ]}
          />
        </div>
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
