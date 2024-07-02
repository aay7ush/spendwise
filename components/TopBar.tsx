"use client";

import { UserIcon, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
  }
  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          <span className="text-lg font-semibold">Spendwise</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-muted-foreground">
          <UserIcon className="size-5" />
          <span>{session?.user?.name}</span>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut()}>
        Sign Out
      </Button>
    </header>
  );
}
