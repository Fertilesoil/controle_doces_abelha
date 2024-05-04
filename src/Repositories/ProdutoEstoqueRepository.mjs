import { prisma } from "../Middlewares/InstanciaCliente.mjs";

class ProdutoEstoqueRepository {
  async listar() {
    const listarProdutos = await prisma.produtoEstoque.findMany();
    return listarProdutos;
  }

  async cadastrar(body) {
    const novoProduto = await prisma.produtoEstoque.create({ data: body });
    return novoProduto;
  }

  async atualizar(id, body) {
    const produtoAtualizado = await prisma.produtoEstoque.update({ where: { id: id }, data: body });
    return produtoAtualizado;
  }

  async deletar(id) {
    const produtoDeletado = await prisma.produtoEstoque.delete({ where: { id: id } });
    return produtoDeletado;
  }

  async buscarPorId(id) {
    const produto = await prisma.produtoEstoque.findUnique({ where: { id: id } });
    return produto;
  }
}

export default new ProdutoEstoqueRepository();