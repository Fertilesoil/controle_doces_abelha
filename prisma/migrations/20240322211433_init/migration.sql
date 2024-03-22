-- DropForeignKey
ALTER TABLE "item_venda" DROP CONSTRAINT "item_venda_venda_id_fkey";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
