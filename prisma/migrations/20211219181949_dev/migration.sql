-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LOCAL', 'FACEBOOK', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'LOCAL';
