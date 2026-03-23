import { useShowMeProductQuery } from "@/hooks/product/useShowMeProducts";
import { ProductColumns } from "./product-data-table/ColumsTable";
import { ProductTable } from "./product-data-table/Product-Table";
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

function ProductsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 8, //default page size
  });
  const showMeProducts = useShowMeProductQuery({
    page: pagination.pageIndex + 1,
  });
  console.log(showMeProducts.data);
  return (
    <div className="flex-col w-full">
      <div className="flex items-center p-8">
        <h1 className="text-2xl font-extrabold">All Products /</h1>
      </div>

      <div className="mx-10 rounded-xl min-h-fit">
        <ProductTable
          columns={ProductColumns}
          setPagination={setPagination}
          pagination={pagination}
          data={showMeProducts.data?.products || []}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
