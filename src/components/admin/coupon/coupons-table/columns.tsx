"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { parseISO } from "date-fns";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCoupon } from "@/hooks/coupon/useDeleteCoupon";
import { useState } from "react";
import type { Coupon } from "@/types/auth.types";
import { CouponFormDialog } from "../CouponFormDialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<Coupon>();

export const columns = [
  columnHelper.accessor("code", {
    header: "Code",
  }),

  columnHelper.accessor("startTime", {
    header: "Start",
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return "-";

      const date = parseISO(value);
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
  }),

  columnHelper.accessor("expiryTime", {
    header: "Expiration",
    cell: ({ getValue }) => {
      const date = parseISO(getValue());
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
  }),

  columnHelper.accessor("valid", {
    header: "Status",
    cell: ({ row }) => {
      const valid = row.getValue("valid") as boolean | undefined;

      const styles = {
        valid:
          "bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
        invalid:
          "bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive",
        unspecified:
          "bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5",
      }[valid === true ? "valid" : valid === false ? "invalid" : "unspecified"];

      return (
        <Badge
          className={(cn("border-none focus-visible:outline-none"), styles)}
        >
          {valid === true
            ? "Valid"
            : valid === false
              ? "Invalid"
              : "Unspecified"}
        </Badge>
      );
    },
  }),

  columnHelper.accessor("maxRedemptions", {
    header: "Redemptions",
    cell: ({ row }) =>
      `${row.original.totalRedemptions} / ${row.original.maxRedemptions}`,
  }),

  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ row, getValue }) => {
      const amount = getValue();
      const type = row.original.type;

      if (type === "FIXED") {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
      }

      if (type === "PERCENTAGE") {
        return `${amount}%`;
      }

      return amount;
    },
  }),

  {
    id: "actions",

    cell: ({ row }: { row: { original: Coupon } }) => {
      const [openDialog, setOpenDialog] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);

      const coupons = row.original;
      const { mutateAsync: deleteCoupon } = useDeleteCoupon();
      const handleDelete = () => {
        deleteCoupon(coupons.id);
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <CouponFormDialog
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                mode="edit"
                coupon={coupons}
              />

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
                variant="destructive"
              >
                <button>Delete</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this coupon?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="cursor-pointer bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
