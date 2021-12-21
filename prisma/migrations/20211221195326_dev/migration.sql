/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SignUpType" AS ENUM ('LOCAL', 'FACEBOOK', 'GOOGLE');

-- DropIndex
DROP INDEX "Admin_username_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "signUpType" "SignUpType" NOT NULL DEFAULT E'LOCAL';

-- DropEnum
DROP TYPE "Role";
