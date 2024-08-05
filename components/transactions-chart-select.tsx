"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTransactionsChartStore from "@/store/useTransactionsChartStore";
import useChartStore from "@/store/useTransactionsChartStore";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import { useState } from "react";

export default function TransactionsChartSelect() {
  const { chartType, setChartType } = useTransactionsChartStore();

  return (
    <Select value={chartType} onValueChange={(value) => setChartType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chart Type" />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectItem value="area">
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <AreaChart className="size-7 mr-2" />
            <span>Area Chart</span>
          </div>
        </SelectItem>
        <SelectItem value="bar" className="flex gap-x-3">
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <BarChart className="size-7 mr-2" />
            <span>Bar Chart</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
