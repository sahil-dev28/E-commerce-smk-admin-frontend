import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Product } from "@/types/auth.types";
import { createColumnHelper, type CellContext } from "@tanstack/react-table";
import { ProductActions } from "./Product-Actions";
import { useMemo } from "react";

const columnHelper = createColumnHelper<Product>();

const ProductImage = ({ file }: { file: File }) => {
  const imageUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  return <AvatarImage src={imageUrl} />;
};

export const ProductColumns = [
  {
    header: "Product",
    accessorKey: "name",
    cell: ({ row }: CellContext<Product, unknown>) => (
      <div className="flex items-center gap-3">
        <Avatar className="rounded-sm">
          {/* <AvatarImage src={row.original.image} /> */}
          <ProductImage file={row.original.image} />
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },

  columnHelper.accessor((row) => row.category.name, {
    header: "Category",
    id: "categoryId",
  }),

  columnHelper.accessor("discountAmount", {
    header: "Discount",
  }),
  columnHelper.accessor((row) => row.sizes[0].value, {
    header: "Size",
    id: "sizeId",
  }),
  columnHelper.accessor("inventory", {
    header: "Inventory",
  }),
  columnHelper.accessor("price", {
    header: "Price",
  }),
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }: { row: { original: Product } }) => {
      const products = row.original;
      return (
        <>
          <ProductActions products={products} />
        </>
      );
    },
  },
];
