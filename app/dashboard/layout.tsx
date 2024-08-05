import { auth } from "@/auth";
import Header from "@/components/header";
import { getTransactions } from "@/actions/transaction";
import ChatAI from "@/components/chat-ai";
import React from "react";
import UserBalance from "@/components/user-balance";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const transactions = await getTransactions();

  return (
    <>
      {session?.user && (
        <>
          <Header user={session.user} />
          <UserBalance />
          {children}
          <ChatAI user={session.user} transactions={transactions} />
          <footer className="p-4 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Spendwise. All rights reserved.
          </footer>
        </>
      )}
    </>
  );
}
