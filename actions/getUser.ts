"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/db";

export const getUser = async () => {
  const session = await auth();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
