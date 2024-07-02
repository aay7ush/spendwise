"use server";

import getUser from "@/actions/getUser";
import prisma from "@/prisma/db";

export default async function getTransactionByCategory() {
  const user = await getUser();
  const expenses = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
      type: "EXPENSE",
    },
  });
  const expenseByCategory = expenses.reduce((acc: Categories, expense) => {
    const category = expense.category;
    if (acc[category]) {
      acc[category] += expense.amount;
    } else {
      acc[category] = expense.amount;
    }
    return acc;
  }, {} as Categories);

  const income = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
      type: "INCOME",
    },
  });
  const incomeByCategory = income.reduce((acc: Categories, income) => {
    const category = income.category;
    if (acc[category]) {
      acc[category] += income.amount;
    } else {
      acc[category] = income.amount;
    }
    return acc;
  }, {} as Categories);

  return { incomes: incomeByCategory, expenses: expenseByCategory };
}
