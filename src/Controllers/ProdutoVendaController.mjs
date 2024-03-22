import { prisma } from "../Middlewares/InstanciaCliente.mjs";


export class ProdutoVendaController {
  async listarProdutosVenda(req, res) {
    try {
      const listaProdutos = await prisma.produtoVenda.findMany();
      return res.status(200).send(listaProdutos);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Erro", error: error });
    }

  }

  async cadastrarProdutoVenda(req, res) {
    const { body } = req;

    try {
      const novoProduto = await prisma.produtoVenda.create({ data: body });
      if (novoProduto)
        return res.status(201).json(novoProduto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async atualizarProdutoVenda(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const produtoAtualizado = await prisma.produtoVenda.update({ where: { id: id }, data: body });
      return res.status(200).send(produtoAtualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async deletarProdutoVenda(req, res) {
    try {
      const { id } = req.params;
      const produtoDeletado = await prisma.produtoVenda.delete({ where: { id: id } });
      return res.status(200).send({ msg: "Produto deletado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}