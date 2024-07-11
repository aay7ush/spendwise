"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button, buttonVariants } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteTransaction } from "@/actions/transaction";
import { toast } from "react-toastify";
import EditTransaction from "./edit-transaction";
import formatAmount from "@/lib/formatAmount";
import DeleteTransaction from "./delete-transaction";

export default function TransactionsItem({
  transaction,
}: {
  transaction: TransactionProps;
}) {
  const { id, description, createdAt, amount, type, category } = transaction;
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{description}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {createdAt &&
          new Date(createdAt).toLocaleDateString("en-Us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{category}</TableCell>
      <TableCell className="text-right">
        <div
          className={cn(
            "font-medium",
            type === "INCOME" && "text-green-500",
            type === "EXPENSE" && "text-red-500"
          )}
        >
          {type === "INCOME" ? "+" : "-"} {formatAmount(amount)}
        </div>
      </TableCell>
      <TableCell className="text-right">{type}</TableCell>
      <TableCell className="text-right">
        <EditTransaction transaction={transaction} />
        <DeleteTransaction id={id} />
      </TableCell>
    </TableRow>
  );
}
