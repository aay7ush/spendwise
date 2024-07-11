"use client";

import { CalendarIcon, FilterIcon, IndianRupee, ListIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useFilterStore from "@/store/useFilterStore";
import { CATEGORIES } from "@/constants";

export default function Filters() {
  const { setType, setAmount, setDate, setCategory } = useFilterStore();

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setType}>
        <SelectTrigger>
          <FilterIcon className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setAmount}>
        <SelectTrigger>
          <IndianRupee className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Amount" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="up-to-200">Up to ₹200</SelectItem>
          <SelectItem value="200-500">₹200 - ₹500</SelectItem>
          <SelectItem value="500-2000">₹500 - ₹2,000</SelectItem>
          <SelectItem value="above-2000">Above ₹2,000</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setDate}>
        <SelectTrigger>
          <CalendarIcon className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this-month">This month</SelectItem>
          <SelectItem value="last-30-days">Last 30 days</SelectItem>
          <SelectItem value="last-90-days">Last 90 days</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setCategory}>
        <SelectTrigger>
          <ListIcon className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Income</SelectLabel>
            {CATEGORIES.income.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Expense</SelectLabel>
            {CATEGORIES.expense.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
