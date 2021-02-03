/*
  Warnings:

  - You are about to drop the column `status` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `wallet_transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wallet_transactions" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "transaction_type" "TransactionType" NOT NULL DEFAULT E'Deposit',
ADD COLUMN     "transaction_status" "TransactionStatus" NOT NULL DEFAULT E'Pending';
