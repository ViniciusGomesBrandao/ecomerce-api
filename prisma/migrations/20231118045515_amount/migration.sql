/*
  Warnings:

  - Added the required column `amount` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "amount" INTEGER NOT NULL;
