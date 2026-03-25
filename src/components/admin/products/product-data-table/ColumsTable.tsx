import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Product } from "@/types/auth.types";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { ProductActions } from "./Product-Actions";

export const ProductColumns: ColumnDef<Product>[] = [
  {
    header: "Product",
    accessorKey: "name",
    cell: ({ row }: CellContext<Product, unknown>) => (
      <div className="flex items-center gap-3">
        <Avatar className="rounded-sm">
          <AvatarImage
            src={(row.original.image as string) || "/placeholder.png"}
          />
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },

  {
    header: "Category",
    accessorFn: (row) => row.category?.name,
    id: "category",
    cell: ({ getValue }) => getValue<string>() || "—",
  },

  {
    header: "Discount",
    accessorKey: "discountAmount",
    cell: ({ getValue }) => {
      const value = getValue<number | undefined>();
      return value ? `${value}%` : "—";
    },
  },
  {
    header: "Size",
    accessorFn: (row) => row.sizes?.[0]?.value,
    id: "size",
    cell: ({ getValue }) => getValue<string>() || "—",
  },
  {
    header: "Inventory",
    accessorKey: "inventory",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `₹${value?.toFixed(2)}`;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: CellContext<Product, unknown>) => {
      return <ProductActions products={row.original} />;
    },
  },
];
