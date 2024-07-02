"use server";

import getUser from "@/actions/getUser";
import prisma from "@/prisma/db";

export default async function getTransactions() {
  const user = await getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactions;
}
