/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `total_venda_diaria` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "total_venda_diaria" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- CreateIndex
CREATE UNIQUE INDEX "total_venda_diaria_createdAt_key" ON "total_venda_diaria"("createdAt");
