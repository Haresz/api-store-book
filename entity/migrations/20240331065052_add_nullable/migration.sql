-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_id_point_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "id_ponit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "id_point" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_id_point_fkey" FOREIGN KEY ("id_point") REFERENCES "Point"("id_point") ON DELETE SET NULL ON UPDATE CASCADE;
