import { getTransactions } from "@/actions/transaction";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

const TransactionsPage = async () => {
  const transactions = await getTransactions();

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>
      <DataTable columns={columns} data={transactions} />
    </main>
  );
};
export default TransactionsPage;
