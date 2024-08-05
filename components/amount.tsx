"use client";

import { cn } from "@/lib/utils";
import { AmountProps } from "@/types";
import CountUp from "react-countup";

export default function Amount({ title, amount }: AmountProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-medium text-muted-foreground">{title}</div>
      <div
        className={cn(
          "flex items-center gap-1 text-2xl font-bold",
          title.toLowerCase().includes("expenses") && "text-red-500",
          title.toLowerCase().includes("income") && "text-green-500"
        )}
      >
        <CountUp end={amount} decimals={2} prefix="₹" useIndianSeparators />
      </div>
    </div>
  );
}
