/*
  Warnings:

  - You are about to drop the column `recheio_nome` on the `produto_venda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto_venda" DROP CONSTRAINT "produto_venda_recheio_nome_fkey";

-- AlterTable
ALTER TABLE "produto_venda" DROP COLUMN "recheio_nome",
ADD COLUMN     "recheio_id" TEXT;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "produto_venda" ADD CONSTRAINT "produto_venda_recheio_id_fkey" FOREIGN KEY ("recheio_id") REFERENCES "recheio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
