-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "primeiro_nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_estoque" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL,

    CONSTRAINT "produto_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_venda" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "peso" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "recheio_id" TEXT,

    CONSTRAINT "produto_venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recheio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "recheio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venda" (
    "id" TEXT NOT NULL,
    "total_venda" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_venda" (
    "id" TEXT NOT NULL,
    "venda_id" TEXT NOT NULL,
    "produto_venda_id" TEXT NOT NULL,
    "recheio_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "total_item" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "item_venda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produto_venda_recheio_id_key" ON "produto_venda"("recheio_id");

-- AddForeignKey
ALTER TABLE "produto_venda" ADD CONSTRAINT "produto_venda_recheio_id_fkey" FOREIGN KEY ("recheio_id") REFERENCES "recheio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_produto_venda_id_fkey" FOREIGN KEY ("produto_venda_id") REFERENCES "produto_venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_recheio_id_fkey" FOREIGN KEY ("recheio_id") REFERENCES "recheio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
