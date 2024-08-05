"use client";

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
import { Button } from "./ui/button";
import { CalendarIcon, FilePenIcon, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { editTransaction } from "@/actions/transaction";
import { CATEGORIES } from "@/constants";
import { TransactionProps } from "@/types";

export default function EditTransaction({
  transaction,
}: {
  transaction: TransactionProps;
}) {
  const [description, setDescription] = useState(transaction.description);
  const [createdAt, setCreatedAt] = useState<Date | undefined>(
    transaction.createdAt
  );
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState<"INCOME" | "EXPENSE">(transaction.type);
  const [category, setCategory] = useState(transaction.category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mr-2">
          <Pencil className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount.toString()}
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
                      {createdAt
                        ? createdAt.toLocaleDateString("en-Us", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={createdAt}
                    onSelect={setCreatedAt}
                    className="rounded-md border"
                  />{" "}
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(e) => setType(e as "INCOME" | "EXPENSE")}>
                <SelectTrigger>
                  <SelectValue placeholder={type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(e) => setCategory(e)} value={category}>
                <SelectTrigger>
                  <SelectValue placeholder={category} />
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
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
          <Button
            type="submit"
            onClick={async () => {
              const { success, message } = await editTransaction({
                id: transaction.id,
                description,
                createdAt,
                amount,
                type,
                category,
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
