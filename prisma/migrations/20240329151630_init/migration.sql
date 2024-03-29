-- AlterTable
ALTER TABLE "produto_venda" ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE "total_venda_diaria" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();
