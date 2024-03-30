import { prisma } from "../Middlewares/InstanciaCliente.mjs";


class ProdutoVendaRepository {
  async listar() {
    const listaProdutos = await prisma.produtoVenda.findMany({ include: { recheio: true } });
    return listaProdutos;
  }

  async cadastrar(body) {
    const novoProduto = await prisma.produtoVenda.create({ data: body });
    return novoProduto;
  }

  async atualizar(id, body) {
    const produtoAtualizado = await prisma.produtoVenda.update({ where: { id: id }, data: body });
    return produtoAtualizado;
  }

  async atualizarEstoque(produto) {
    for (const item of produto) {
      await prisma.produtoVenda.update({
        where: { id: item.produto_venda_id },
        data: {
          quantidade: {
            decrement: item.quantidade
          }
        }
      });
    }
  }

  async deletar(id) {
    const produtoDeletado = await prisma.produtoVenda.delete({ where: { id: id } });
    return produtoDeletado;
  }
}

export default new ProdutoVendaRepository();