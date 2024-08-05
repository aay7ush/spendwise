"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import EditTransaction from "./edit-transaction";
import DeleteTransaction from "./delete-transaction";
import { TransactionProps } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export const columns: ColumnDef<TransactionProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const formatted = new Date(date).toLocaleDateString("en-Us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return <p>{formatted}</p>;
    },
  },
  { accessorKey: "account", header: "Account" },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;

      return (
        <Badge
          className={cn(
            type === "INCOME" && "bg-green-500",
            type === "EXPENSE" && "bg-red-500"
          )}
        >
          {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <Badge>{category}</Badge>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      const type = row.getValue("type");

      return (
        <p
          className={cn(
            type === "INCOME" && "text-green-500",
            type === "EXPENSE" && "text-red-500"
          )}
        >
          {type === "INCOME" ? "+" : "-"} {formatted}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <p className="px-5">Actions</p>,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div>
          <EditTransaction transaction={transaction} />
          <DeleteTransaction id={transaction.id as string} />
        </div>
      );
    },
  },
];
