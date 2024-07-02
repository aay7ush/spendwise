"use server";

import getUser from "@/actions/getUser";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export default async function addTransaction({
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
  if (!user?.id) {
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
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
