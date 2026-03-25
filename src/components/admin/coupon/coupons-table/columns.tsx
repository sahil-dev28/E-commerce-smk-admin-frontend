"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { parseISO } from "date-fns";

import type { Coupon } from "@/types/auth.types";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CouponActions } from "./CouponActions";

export const columns: ColumnDef <Coupon>[] = [
  {
    header: "Code",
    accessorKey: "code",
  },

  {
    header: "Start",
    accessorKey: "startTime",
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) return "-";

      const date = parseISO(value);
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
  },

  {
    header: "Expiration",
    accessorKey: "expiryTime",
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) return "-";

      const date = parseISO(value);
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    },
  },

  {
    header: "Status",
    accessorKey: "valid",
    cell: ({ getValue }) => {
      const valid = getValue<boolean | undefined>();

      const styles = {
        valid:
          "bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",
        invalid: "bg-destructive/10 text-destructive",
        unspecified:
          "bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
      }[valid === true ? "valid" : valid === false ? "invalid" : "unspecified"];

      return (
        <Badge className={cn("border-none", styles)}>
          {valid === true
            ? "Valid"
            : valid === false
              ? "Invalid"
              : "Unspecified"}
        </Badge>
      );
    },
  },

  {
    header: "Redemptions",
    accessorKey: "maxRedemptions",
    cell: ({ row }) => {
      return `${row.original.totalRedemptions} / ${row.original.maxRedemptions}`;
    },
  },

  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row, getValue }) => {
      const amount = getValue<number>();
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
  },

  {
    id: "actions", // ✅ IMPORTANT: use id, not accessorKey
    header: "Actions",
    cell: ({ row }) => {
      return <CouponActions coupons={row.original} />;
    },
  },
];
