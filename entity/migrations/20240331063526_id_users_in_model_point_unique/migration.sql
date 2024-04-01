/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "id_user" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Point_id_user_key" ON "Point"("id_user");
