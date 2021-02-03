/*
  Warnings:

  - You are about to drop the column `transaction_type` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_status` on the `wallet_transactions` table. All the data in the column will be lost.
  - Made the column `meta` on table `wallet_transactions` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "wallet_transactions" DROP COLUMN "transaction_type",
DROP COLUMN "transaction_status",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT E'Deposit',
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT E'Pending',
ALTER COLUMN "meta" SET NOT NULL;
