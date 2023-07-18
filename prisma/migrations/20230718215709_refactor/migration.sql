/*
  Warnings:

  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_username_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "username";
