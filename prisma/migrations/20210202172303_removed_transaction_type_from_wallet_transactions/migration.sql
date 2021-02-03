/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `wallet_transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wallet_transactions" DROP COLUMN "transaction_id",
DROP COLUMN "transaction_type",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT E'Deposit';
