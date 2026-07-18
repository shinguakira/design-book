import { useState } from "react";
import { Pagination } from "../../components/ui/Pagination";
import { ShowcaseGrid, ShowcaseRow } from "../_shared/Showcase";

export default function PaginationShowcase() {
  const [page, setPage] = useState(3);
  return (
    <ShowcaseGrid>
      <ShowcaseRow label="Interactive">
        <Pagination page={page} total={7} onChange={setPage} />
      </ShowcaseRow>
      <ShowcaseRow label="Few pages">
        <Pagination page={1} total={3} onChange={() => {}} />
      </ShowcaseRow>
    </ShowcaseGrid>
  );
}
