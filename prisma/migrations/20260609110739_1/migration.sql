/*
  Warnings:

  - Added the required column `placed` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "placed" BOOLEAN NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "payout" DROP NOT NULL;
