/*
  Warnings:

  - You are about to drop the column `id_ponit` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_point]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_point` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "id_ponit",
ADD COLUMN     "id_point" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_point_key" ON "Transaction"("id_point");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_point_fkey" FOREIGN KEY ("id_point") REFERENCES "Point"("id_point") ON DELETE RESTRICT ON UPDATE CASCADE;
