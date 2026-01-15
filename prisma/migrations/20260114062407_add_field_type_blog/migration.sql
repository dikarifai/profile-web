/*
  Warnings:

  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BlogType" AS ENUM ('BLOG', 'PORTFOLIO');

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_categoryId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "type" "BlogType" NOT NULL DEFAULT 'BLOG';

-- DropTable
DROP TABLE "Portfolio";
