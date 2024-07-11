import { auth } from "@/auth";
import Balance from "@/components/balance";
import Header from "@/components/header";
import CategorizeTransactions from "@/components/categorize-transactions";
import TransactionsGroup from "@/components/transactions-group";
import { getTransactions } from "@/actions/transaction";
import ChatAI from "@/components/chat-ai";

export default async function DashboardPage() {
  const session = await auth();

  const transactions = await getTransactions();

  return (
    <>
      {session?.user && (
        <main className="flex flex-col h-full w-full">
          <Header user={session.user} />

          <div className="flex flex-col h-full w-full">
            <Balance />

            <TransactionsGroup transactions={transactions} />

            <CategorizeTransactions />
          </div>

          <ChatAI user={session.user} transactions={transactions} />

          <footer className="p-4 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Spendwise. All rights reserved.
          </footer>
        </main>
      )}
    </>
  );
}
