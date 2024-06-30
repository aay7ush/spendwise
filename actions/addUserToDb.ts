"use server";

import { RegisterSchema } from "@/lib/zodSchemas";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

interface addUserResponse {
  success?: boolean;
  message?: string;
}

export default async function addUserToDb(
  formData: FormData
): Promise<addUserResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "Missing name, email or password" };
  }

  const validateFields = RegisterSchema.safeParse({
    name,
    email,
    password,
  });

  if (validateFields.success) {
    const { name, email, password } = validateFields.data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true, message: "User registered successfully" };
  } else {
    return { success: false, message: "Invalid data" };
  }
}
