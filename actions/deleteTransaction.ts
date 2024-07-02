"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export default async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, message: "Transaction deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
