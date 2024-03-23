import { prisma } from '../Middlewares/InstanciaCliente.mjs';
import { criarValidacao } from "../Middlewares/Validacoes/CriarValidacao.mjs";

export class ProdutoEstoqueController {

  async listarProdutos(req, res) {
    try {
      const listarProdutos = await prisma.produtoEstoque.findMany();

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
    const validacao = criarValidacao(req);
    if (validacao) {
      const { msg, campo, value } = validacao;
      console.log({ msg, campo, value });
      return res.status(403).json({ campo_erro: campo, valor: value, msg });
    }

    try {
      const { body } = req;
      const novoProduto = await prisma.produtoEstoque.create({ data: body });
      if (novoProduto)
        return res.status(201).json(novoProduto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async atualizarProduto(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      const { msg, campo, value } = validacao;
      console.log({ msg, campo, value });
      return res.status(403).json({ campo_erro: campo, valor: value, msg });
    }
    
    try {
      const { body } = req;
      const { id } = req.params;
      const produtoAtualizado = await prisma.produtoEstoque.update({ where: { id: id }, data: body });

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
      const produtoDeletado = await prisma.produtoEstoque.delete({ where: { id: id } });

      return res.status(200).json({ msg: "Produto deletado com sucesso!" });
    } catch (error) {
      const { meta } = error;
      if (meta.cause === "Record to delete does not exist.")
        return res.status(404).json({ msg: "Este produto não existe" });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}