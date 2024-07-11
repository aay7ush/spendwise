import getBalance from "@/actions/getBalance";
import AddTransaction from "./add-transaction";
import Amount from "./amount";

export default async function Balance() {
  const { incomes, expenses, balance } = await getBalance();

  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <Amount title="Total Incomes" amount={incomes ?? 0} />
        <Amount title="Total Expenses" amount={expenses ?? 0} />
        <Amount title="Current Balance" amount={balance ?? 0} />
      </div>

      <AddTransaction />
    </header>
  );
}
