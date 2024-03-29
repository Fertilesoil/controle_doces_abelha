-- DropIndex
DROP INDEX "total_venda_diaria_createdAt_key";

-- AlterTable
ALTER TABLE "total_venda_diaria" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();
