"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { getUser } from "./getUser";
import { TransactionProps } from "@/types";

export async function addTransaction({
  description,
  createdAt,
  amount,
  type,
  category,
}: TransactionProps) {
  if (!description || !createdAt || !amount || !type || !category) {
    return { success: false, message: "All fields are required" };
  }

  const user = await getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  try {
    await prisma.transaction.create({
      data: {
        description,
        createdAt,
        amount,
        type,
        category,
        userId: user.id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, message: "Transaction added successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, message: "Transaction deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function editTransaction({
  id,
  description,
  createdAt,
  amount,
  type,
  category,
}: TransactionProps) {
  try {
    await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        description,
        createdAt,
        amount,
        type,
        category,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, message: "Transaction updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getTransactions() {
  const user = await getUser();

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  revalidatePath("/dashboard");
  return transactions;
}

// In @/actions/getTransactions.js
export async function getTransactionsByPage(page = 1) {
  // Implement pagination logic here
  // For example, if using a database:
  const offset = (page - 1) * 5;
  const data = await prisma.transaction.findMany({
    take: 5,
    skip: offset,
    orderBy: { createdAt: "desc" },
  });
  const totalCount = await prisma.transaction.count();

  revalidatePath("/dashboard");
  return { data, totalCount };
}

export async function getTransactionByCategory() {
  const user = await getUser();
  const expenses = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
      type: "EXPENSE",
    },
  });

  const expenseByCategory = expenses.reduce(
    (acc: { category: string; amount: number }[], expense) => {
      const existingCategory = acc.find(
        (obj) => obj.category === expense.category
      );
      if (existingCategory) {
        existingCategory.amount += expense.amount;
      } else {
        acc.push({ category: expense.category, amount: expense.amount });
      }
      return acc;
    },
    [] as { category: string; amount: number }[]
  );

  const income = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
      type: "INCOME",
    },
  });

  const incomeByCategory = income.reduce(
    (acc: { category: string; amount: number }[], income) => {
      const existingCategory = acc.find(
        (obj) => obj.category === income.category
      );
      if (existingCategory) {
        existingCategory.amount += income.amount;
      } else {
        acc.push({ category: income.category, amount: income.amount });
      }
      return acc;
    },
    [] as { category: string; amount: number }[]
  );

  return { incomes: incomeByCategory, expenses: expenseByCategory };
}
