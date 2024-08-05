import {
  getTransactionByCategory,
  getTransactions,
} from "@/actions/transaction";
import TransactionsChartSelect from "@/components/transactions-chart-select";
import CategoriesChartSelect from "@/components/categories-chart-select";
import TransactionsChart from "@/components/transactions-chart";
import CategoriseChart from "@/components/categorise-chart";

const DashboardPage = async () => {
  const transactions = await getTransactions();
  const transactionsByCategory = await getTransactionByCategory();

  return (
    <main className="p-6 grid grid-cols-5 gap-x-5">
      <div className="col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <TransactionsChartSelect />
        </div>
        <TransactionsChart data={transactions} />
      </div>

      <div className="col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <CategoriesChartSelect />
        </div>
        <CategoriseChart data={transactionsByCategory.expenses} />
      </div>
    </main>
  );
};
export default DashboardPage;
