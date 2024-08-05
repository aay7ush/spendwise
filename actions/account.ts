"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./getUser";
import prisma from "@/prisma/db";

export async function getAccounts() {
  const user = await getUser();

  const accounts = await prisma.transactionAccount.findMany({
    where: {
      userId: user?.id,
    },
  });

  revalidatePath("/dashboard/accounts");
  return accounts;
}

export async function getAccountByName(name: string) {
  const user = await getUser();

  const account = await prisma.transactionAccount.findUnique({
    where: {
      name,
      id: "",
    },
  });

  console.log(account);

  revalidatePath("/dashboard/accounts");
  return account;
}

export async function addAccount(name: string, balance: number) {
  const user = await getUser();

  try {
    await prisma.transactionAccount.create({
      data: {
        name,
        balance,
        userId: user?.id,
      },
    });

    revalidatePath("/dashboard/accounts");
    return { success: true, message: "Account added successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add account" };
  }
}
