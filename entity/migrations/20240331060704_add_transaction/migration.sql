/*
  Warnings:

  - You are about to drop the column `total_pint` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_transaction]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_point]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_transaction` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_point` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_point` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "id_transaction" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "total_pint",
ADD COLUMN     "total_point" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "point",
ADD COLUMN     "id_point" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Point" (
    "id_point" SERIAL NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id_point")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id_transaction" SERIAL NOT NULL,
    "id_ponit" INTEGER NOT NULL,
    "total_point" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id_transaction")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_transaction_key" ON "Transaction"("id_transaction");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_transaction_key" ON "OrderItem"("id_transaction");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_point_key" ON "Users"("id_point");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_id_point_fkey" FOREIGN KEY ("id_point") REFERENCES "Point"("id_point") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "Transaction"("id_transaction") ON DELETE RESTRICT ON UPDATE CASCADE;
