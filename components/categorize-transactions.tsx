import { getTransactionByCategory } from "@/actions/transaction";
import Chart from "./chart";

export default async function CategorizeTransactions() {
  const transactions = await getTransactionByCategory();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="Expenses by Category" data={transactions.expenses} />
        <Chart title="Incomes by Category" data={transactions.incomes} />
      </div>
    </div>
  );
}
