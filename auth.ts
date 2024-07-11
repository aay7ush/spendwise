import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/db";
import NextAuth, { type DefaultSession } from "next-auth";
import { getUserById } from "./data/user";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      // Prevent sign in without email verification
      const existingUser = await getUserById(user.id!);
      if (!existingUser || !existingUser?.emailVerified) return false;
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
