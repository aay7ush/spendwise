"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/db";

export default async function getUser() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  return user;
}
