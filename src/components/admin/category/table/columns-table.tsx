"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CategoryActions } from "./Actions";

export type Category = {
  id: string;
  name: string;
};

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const categoryId = row.original.id;
      const categoryName = row.original.name;
      return (
        <>
          <CategoryActions
            categoryId={categoryId}
            categoryName={categoryName}
          />
        </>
      );
    },
  },
];
