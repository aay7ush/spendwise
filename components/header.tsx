"use client";

import { UserIcon, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";

export default function Header({ user }: { user: User }) {
  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Wallet className="size-8" />
          <span className="text-lg font-semibold">Spendwise</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-muted-foreground">
          <Avatar>
            <AvatarImage src={user?.image!} />
            <AvatarFallback>
              <UserIcon className="size-8" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">Hey, {user?.name?.split(" ")[0]}</span>
        </div>
      </div>
      <Button variant="destructive" onClick={() => signOut()}>
        Log out
      </Button>
    </header>
  );
}
