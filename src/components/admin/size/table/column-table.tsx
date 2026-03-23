"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { SizeActions } from "./Size-Actions";

export interface Size {
  id: string;
  value: number;
}

export const sizesColumns: ColumnDef<Size>[] = [
  {
    accessorKey: "value",
    header: "Size",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sizeId = row.original.id;
      const sizeValue = row.original.value;
      return (
        <>
          <SizeActions sizeId={sizeId} sizeValue={sizeValue} />
        </>
      );
    },
  },
];
