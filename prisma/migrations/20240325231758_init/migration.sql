/*
  Warnings:

  - You are about to drop the column `recheio_id` on the `produto_venda` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `recheio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "produto_venda" DROP CONSTRAINT "produto_venda_recheio_id_fkey";

-- AlterTable
ALTER TABLE "produto_venda" DROP COLUMN "recheio_id",
ADD COLUMN     "recheio_nome" TEXT;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- CreateIndex
CREATE UNIQUE INDEX "recheio_nome_key" ON "recheio"("nome");

-- AddForeignKey
ALTER TABLE "produto_venda" ADD CONSTRAINT "produto_venda_recheio_nome_fkey" FOREIGN KEY ("recheio_nome") REFERENCES "recheio"("nome") ON DELETE SET NULL ON UPDATE CASCADE;
