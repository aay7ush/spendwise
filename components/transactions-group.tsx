import Filters from "./filters";
import TransactionsTable from "./transactions-table";
import { TransactionProps } from "@/types";

export default function TransactionsGroup({
  transactions,
}: {
  transactions: TransactionProps[];
}) {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <Filters />
      </div>
      <TransactionsTable transactions={transactions} />
    </main>
  );
}
