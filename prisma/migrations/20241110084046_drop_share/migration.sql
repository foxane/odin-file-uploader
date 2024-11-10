/*
  Warnings:

  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_ownerId_fkey";

-- DropTable
DROP TABLE "Share";
