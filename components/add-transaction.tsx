"use client";

import { CalendarIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/constants";
import { DialogClose } from "@radix-ui/react-dialog";
import { addTransaction } from "@/actions/transaction";
import { toast } from "sonner";

export default function AddTransaction({ accounts }) {
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");

  // Simplified the useMemo usage to directly find the accountId based on the selected account name

  const accountId = useMemo(
    () => accounts.find((acc) => acc.name === account)?.id,
    [account, accounts]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5 md:mr-2" />
          <span className="hidden md:block font-semibold">Add Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="account">Account</Label>
              <Select onValueChange={(e) => setAccount(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.name}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                      {createdAt.toLocaleDateString("en-Us", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={createdAt}
                    onSelect={(e) => setCreatedAt(e as Date)}
                    className="rounded-md border"
                  />{" "}
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(e) => setType(e as "INCOME" | "EXPENSE")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(e) => setCategory(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {type === "EXPENSE" &&
                    CATEGORIES.expense.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  {type === "INCOME" &&
                    CATEGORIES.income.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
              const { success, message } = await addTransaction({
                description,
                createdAt,
                amount,
                type,
                category,
                account,
                accountId,
              });

              if (success) {
                toast.success(message);
              } else {
                toast.error(message);
              }
            }}
          >
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
