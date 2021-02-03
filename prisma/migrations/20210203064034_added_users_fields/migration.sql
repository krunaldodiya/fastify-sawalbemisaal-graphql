-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'None');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dob" TEXT NOT NULL DEFAULT E'01-01-1990',
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT E'None',
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "instagram_username" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "influencer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "demo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fcm_token" TEXT,
ADD COLUMN     "version" TEXT;
