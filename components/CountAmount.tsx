"use client";

import CountUp from "react-countup";

export default function CountAmount({ amount }: { amount: number }) {
  return (
    <>
      <CountUp end={amount} decimals={2} prefix="₹ " useIndianSeparators />
    </>
  );
}
