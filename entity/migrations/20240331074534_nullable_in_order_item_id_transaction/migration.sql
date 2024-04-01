-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_id_transaction_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "id_transaction" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "Transaction"("id_transaction") ON DELETE SET NULL ON UPDATE CASCADE;
