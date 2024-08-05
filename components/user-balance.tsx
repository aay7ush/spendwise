import getBalance from "@/actions/getBalance";
import AddTransaction from "./add-transaction";
import Amount from "./amount";
import { getAccounts } from "@/actions/account";

export default async function UserBalance() {
  const { incomes, expenses, balance } = await getBalance();
  const accounts = await getAccounts();

  return (
    <header className="px-6 py-4 flex items-center justify-between border-b">
      <section className="flex items-center gap-6">
        <Amount title="Total Income" amount={incomes ?? 0} />
        <Amount title="Total Expenses" amount={expenses ?? 0} />
        <Amount title="Current Balance" amount={balance ?? 0} />
      </section>

      <AddTransaction accounts={accounts} />
    </header>
  );
}
