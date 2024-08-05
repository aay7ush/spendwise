import { getAccounts } from "@/actions/account";
import { getTransactions } from "@/actions/transaction";
import { columns } from "@/components/accounts/columns";
import { DataTable } from "@/components/accounts/data-table";

const AccountsPage = async () => {
  const accounts = await getAccounts();
  // console.log(accounts);

  // const transactions = await getTransactions();
  // console.log(transactions);

  // const transactionsByAccount = transactions.reduce((acc, transaction) => {
  //   if (!acc[transaction.account]) {
  //     acc[transaction.account] = [];
  //   }
  //   acc[transaction.account].push(transaction);
  //   return acc;
  // }, {});

  // console.log(transactionsByAccount);

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
      </div>
      <DataTable columns={columns} data={accounts} />
    </main>
  );
};
export default AccountsPage;
