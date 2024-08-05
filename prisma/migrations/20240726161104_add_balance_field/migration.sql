/*
  Warnings:

  - Added the required column `balance` to the `TransactionAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionAccount" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expense" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "income" DOUBLE PRECISION NOT NULL DEFAULT 0;
