import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Spendwise",
  description: "AI driven finance tracker app to make budgeting smarter.",
  icons: "/wallet.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
