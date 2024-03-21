/*
  Warnings:

  - You are about to drop the column `recheio_id` on the `item_venda` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `venda` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "item_venda" DROP CONSTRAINT "item_venda_recheio_id_fkey";

-- AlterTable
ALTER TABLE "item_venda" DROP COLUMN "recheio_id";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- CreateIndex
CREATE UNIQUE INDEX "venda_id_key" ON "venda"("id");
