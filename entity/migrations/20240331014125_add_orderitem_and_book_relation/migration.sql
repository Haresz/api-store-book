/*
  Warnings:

  - A unique constraint covering the columns `[id_book]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_book_key" ON "OrderItem"("id_book");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Books"("id_book") ON DELETE RESTRICT ON UPDATE CASCADE;
