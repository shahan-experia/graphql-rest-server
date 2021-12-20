/*
  Warnings:

  - The values [SUPER_ADMIN,ADMIN] on the enum `AdminRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- AlterEnum
BEGIN;
CREATE TYPE "AdminRole_new" AS ENUM ('SYSTEM', 'MANAGER');
ALTER TABLE "Admin" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Admin" ALTER COLUMN "role" TYPE "AdminRole_new" USING ("role"::text::"AdminRole_new");
ALTER TYPE "AdminRole" RENAME TO "AdminRole_old";
ALTER TYPE "AdminRole_new" RENAME TO "AdminRole";
DROP TYPE "AdminRole_old";
ALTER TABLE "Admin" ALTER COLUMN "role" SET DEFAULT 'MANAGER';
COMMIT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "role" SET DEFAULT E'MANAGER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cell" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL;
