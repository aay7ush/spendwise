"use client";

import { UserIcon, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";
import Link from "next/link";
import { NAVLINKS } from "@/constants";

export default function Header({ user }: { user: User }) {
  return (
    <header className="bg-background px-6 py-4 flex items-center justify-between border-b">
      <div className="flex gap-x-5 items-center">
        <Link href="/dashboard" className="flex items-center gap-x-2">
          <Wallet className="size-7" />
          <span className="text-lg font-semibold">Spendwise</span>
        </Link>

        {NAVLINKS.map((navlink, index) => (
          <Button
            key={index}
            variant="link"
            size="sm"
            className="text-base"
            asChild
          >
            <Link href={navlink.href}>{navlink.label}</Link>
          </Button>
        ))}
      </div>

      <div className="flex gap-x-3">
        <div className="flex items-center gap-2 font-semibold text-muted-foreground">
          <Avatar>
            <AvatarImage src={user?.image!} />
            <AvatarFallback>
              <UserIcon className="size-8" />
            </AvatarFallback>
          </Avatar>
          {/* <span className="font-medium">Hey, {user?.name?.split(" ")[0]}</span> */}
        </div>
        <Button variant="destructive" onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    </header>
  );
}
