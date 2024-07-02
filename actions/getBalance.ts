"use server";

import getUser from "@/actions/getUser";
import prisma from "@/prisma/db";

export default async function getBalance() {
  const user = await getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
  });

  const incomes = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

  const balance = incomes - expenses;
  return { incomes, expenses, balance };
}
