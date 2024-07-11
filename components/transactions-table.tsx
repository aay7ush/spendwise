"use client";

import useFilterStore from "@/store/useFilterStore";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import TransactionsItem from "./transactions-item";
import PaginationGroup from "./pagination-group";
import { useSearchParams } from "next/navigation";
import { TransactionProps } from "@/types";

export default function TransactionsTable({
  transactions,
}: {
  transactions: TransactionProps[];
}) {
  const { type, amount, date, category } = useFilterStore();
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionProps[]>(transactions);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const transactionPerPage = 5;
  const totalPage = Math.ceil(filteredTransactions.length / transactionPerPage);
  const startIndex = (Number(page) - 1) * transactionPerPage;
  const endIndex = startIndex + transactionPerPage;

  useEffect(() => {
    const filteredTransactions = transactions.filter(
      (transaction: TransactionProps) => {
        const filterByType = (transaction: TransactionProps) => {
          return type === "" || transaction.type === type.toUpperCase();
        };

        const filterByAmount = (transaction: TransactionProps) => {
          if (amount === "") return true;
          const amountValue = transaction.amount;
          switch (amount) {
            case "up-to-200":
              return amountValue <= 200;
            case "200-500":
              return amountValue >= 200 && amountValue <= 500;
            case "500-2000":
              return amountValue >= 500 && amountValue <= 2000;
            case "above-2000":
              return amountValue >= 2000;
            default:
              return false;
          }
        };

        const filterByDate = (transaction: TransactionProps) => {
          if (date === "") return true;
          const transactionDate = new Date(transaction.createdAt || 0);
          const currentDate = new Date();
          switch (date) {
            case "this-month":
              return (
                transactionDate >= new Date(currentDate.setDate(1)) &&
                transactionDate <=
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              );
            case "last-30-days":
              return (
                transactionDate >=
                  new Date(currentDate.setDate(currentDate.getDate() - 30)) &&
                transactionDate <= new Date()
              );
            case "last-90-days":
              return (
                transactionDate >=
                  new Date(currentDate.setDate(currentDate.getDate() - 90)) &&
                transactionDate <= new Date()
              );
            default:
              return false;
          }
        };

        const filterByCategory = (transaction: TransactionProps) => {
          return category === "" || transaction.category === category;
        };

        return (
          filterByType(transaction) &&
          filterByAmount(transaction) &&
          filterByDate(transaction) &&
          filterByCategory(transaction)
        );
      }
    );

    setFilteredTransactions(
      Array.isArray(filteredTransactions) ? filteredTransactions : []
    );
  }, [type, amount, date, category, transactions, endIndex, startIndex]);

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions
            .slice(startIndex, endIndex)
            .map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
        </TableBody>
      </Table>
      <PaginationGroup page={Number(page)} totalPage={totalPage} />
    </Card>
  );
}
