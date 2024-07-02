import getBalance from "@/actions/getBalance";
import AddTransaction from "./AddTransaction";
import formatAmount from "@/lib/formatAmount";
import CountAmount from "./CountAmount";

export default async function UserBalance() {
  const { incomes, expenses, balance } = await getBalance();

  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">Total Incomes</div>
          <div className="flex items-center gap-1 text-2xl font-bold text-green-500">
            <CountAmount amount={balance ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">
            Total Expenses
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold text-red-500">
            <CountAmount amount={expenses ?? 0} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">
            Current Balance
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <CountAmount amount={balance ?? 0} />
          </div>
        </div>
      </div>

      <AddTransaction />
    </header>
  );
}
