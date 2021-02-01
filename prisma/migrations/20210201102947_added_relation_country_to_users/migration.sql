/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[mobile]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[username]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[email]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `country_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "country_id" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users.mobile_unique" ON "users"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
