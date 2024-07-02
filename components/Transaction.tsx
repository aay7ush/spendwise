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
import deleteTransaction from "@/actions/deleteTransaction";
import { toast } from "react-toastify";
import EditTransaction from "./EditTransaction";
import formatAmount from "@/lib/formatAmount";

export default function Transaction({
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
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline" size="icon" className="text-red-500">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this transaction?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The transaction will be
                permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={cn(buttonVariants({ variant: "destructive" }))}
                onClick={async () => {
                  const { success, message } = await deleteTransaction(id);
                  if (success) {
                    toast.success(message);
                  } else {
                    toast.error(message);
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
