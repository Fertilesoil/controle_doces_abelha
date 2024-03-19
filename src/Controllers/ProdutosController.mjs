import { prisma } from '../Middlewares/InstanciaCliente.mjs';

export class ProdutosController {

  async listarProdutos(req, res) {
    try {
      const listarProdutos = await prisma.produto.findMany();

      if (listarProdutos)
        return res.status(200).json(listarProdutos);
    } catch (error) {
      const { data } = error;
      if (data === undefined)
        return res.status(404).json({ msg: "Não existem produtos cadastrados no banco de dados." });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async cadastrarProduto(req, res) {
    const { body } = req;

    try {
      const novoProduto = await prisma.produto.create({ data: body });
      if (novoProduto)
        return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async atualizarProduto(req, res) {
    const { body } = req;
    const { id } = req.params;

    try {
      const produtoAtualizado = await prisma.produto.update({ where: { id: id }, data: body });

      console.log(produtoAtualizado.id);

      if (produtoAtualizado)
        return res.status(201).json(produtoAtualizado);
    } catch (error) {
      if (error.meta.cause === "Record to update not found.")
        return res.status(404).json({ msg: "Produto não pode ser encontrado." });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async deletarProduto(req, res) {
    const { id } = req.params;

    try {
      const produtoDeletado = await prisma.produto.delete({ where: { id: id } });

      return res.status(200).json({ msg: "Produto deletado com sucesso!" });
    } catch (error) {
      const { meta } = error;
      if (meta.cause === "Record to delete does not exist.")
        return res.status(404).json({ msg: "Este produto não existe" });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}