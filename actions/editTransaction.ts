"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export default async function editTransaction({
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
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
