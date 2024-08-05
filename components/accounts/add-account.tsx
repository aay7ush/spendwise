"use client";

import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addAccount } from "@/actions/account";

export default function AddAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5 md:mr-2" />
          <span className="hidden md:block font-semibold">Add Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="balance">Balance</Label>
              <Input
                id="balance"
                type="number"
                placeholder="0.00"
                onChange={(e) => setBalance(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={async () => {
              const { success, message } = await addAccount(name, balance);

              if (success) {
                toast.success(message);
              } else {
                toast.error(message);
              }
            }}
          >
            Add Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
