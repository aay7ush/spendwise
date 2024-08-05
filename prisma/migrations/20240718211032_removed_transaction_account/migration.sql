/*
  Warnings:

  - You are about to drop the column `accountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `TransactionAccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionAccount" DROP CONSTRAINT "TransactionAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "accountId",
ADD COLUMN     "account" TEXT NOT NULL;

-- DropTable
DROP TABLE "TransactionAccount";
