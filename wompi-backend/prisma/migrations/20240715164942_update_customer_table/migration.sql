/*
  Warnings:

  - You are about to drop the column `IdNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "IdNumber",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
ADD COLUMN     "fullName" TEXT NOT NULL;
