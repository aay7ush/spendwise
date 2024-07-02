import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import UserBalance from "@/components/UserBalance";
import { AArrowUpIcon, ArrowDownWideNarrowIcon } from "lucide-react";
import TransactionsList from "@/components/TransactionsList";
import TransactionByCategory from "@/components/TransactionByCategory";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <TopBar />
      <div className="flex flex-col h-full w-full">
        <UserBalance />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <AArrowUpIcon className="w-4 h-4" />
                Sort by Date
              </Button>
              <Button variant="outline" size="sm">
                <ArrowDownWideNarrowIcon className="w-4 h-4" />
                Sort by Amount
              </Button>
            </div>
          </div>
          <TransactionsList />
        </main>
        <TransactionByCategory />
      </div>
      <footer className="bg-muted p-4 text-center text-sm text-muted-foreground">
        &copy; 2024 Spendwise. All rights reserved.
      </footer>
    </div>
  );
}
