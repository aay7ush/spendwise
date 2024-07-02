import getBalance from "@/actions/getBalance";
import AddTransaction from "./AddTransaction";
import formatAmount from "@/lib/formatAmount";

export default async function UserBalance() {
  const { incomes, expenses, balance } = await getBalance();

  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">Total Incomes</div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <span className="text-green-500">{formatAmount(incomes ?? 0)}</span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">
            Total Expenses
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <span className="text-red-500">{formatAmount(expenses ?? 0)}</span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="font-medium text-muted-foreground">
            Current Balance
          </div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <span>{formatAmount(balance ?? 0)}</span>
          </div>
        </div>
      </div>

      <AddTransaction />
    </header>
  );
}
