/*
  Warnings:

  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "result" "TransactionStatus" NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
