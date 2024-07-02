import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

// TODO: change the font

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Spendwise",
  description: "AI driven finance tracker app to make budgeting smarter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {children}
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </SessionProvider>
  );
}
