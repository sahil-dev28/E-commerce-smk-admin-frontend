import { useMemo, useState } from "react";
import { CouponFormDialog } from "./CouponFormDialog";
import { DataTable } from "./coupons-table/data-table";
import { columns } from "./coupons-table/columns";

import type { Coupon } from "@/types/auth.types";
import { useShowMeCouponQuery } from "@/hooks/coupon/useShowMeCoupons";
import { type PaginationState } from "@tanstack/react-table";
import { debounce } from "@tanstack/react-pacer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface CouponResponse {
  coupons: Coupon[];
  totalCoupons: number;
  numOfPages: number;
}

function CouponsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const debounceSearch = useMemo(
    () =>
      debounce(
        (value: string) => {
          setSearchQuery(value);
          // setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        },
        { wait: 1000 },
      ),
    [],
  );

  const showMeCoupons = useShowMeCouponQuery({
    page: pagination.pageIndex + 1,
    search: searchQuery,
  });

  if (showMeCoupons.isPending) {
    return <div className="p-10">Loading coupons...</div>;
  }

  return (
    <div className="flex-col w-full">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-2xl font-extrabold">All Coupons /</h1>
        <div className="flex items-center gap-4">
          <div className="rounded-md">
            <Search className="absolute m-2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search coupon codes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debounceSearch(e.target.value);
              }}
              className="max-w-sm border-muted-foreground w-md placeholder:muted pl-10"
            />
          </div>
          <div className="">
            <CouponFormDialog
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              mode="create"
            />
          </div>
        </div>
      </div>

      <div className="mx-10 rounded-xl min-h-fit">
        <DataTable
          columns={columns}
          data={showMeCoupons.data?.coupons || []}
          pagination={pagination}
          setPagination={setPagination}
          rowCount={showMeCoupons.data?.totalCoupons || 0}
        />
      </div>
    </div>
  );
}

export default CouponsPage;
