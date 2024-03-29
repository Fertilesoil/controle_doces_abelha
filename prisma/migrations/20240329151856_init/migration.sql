-- AlterTable
ALTER TABLE "produto_venda" ALTER COLUMN "quantidade" DROP DEFAULT;

-- AlterTable
ALTER TABLE "total_venda_diaria" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();
