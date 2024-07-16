/*
  Warnings:

  - Changed the type of `date` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `baseFee` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deliveryFee` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "baseFee",
ADD COLUMN     "baseFee" DOUBLE PRECISION NOT NULL,
DROP COLUMN "deliveryFee",
ADD COLUMN     "deliveryFee" DOUBLE PRECISION NOT NULL;
