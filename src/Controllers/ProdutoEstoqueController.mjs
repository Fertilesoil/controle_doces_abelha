import { criarValidacao, retornaErro } from "../Middlewares/Validacoes/CriarValidacao.mjs";
import ProdutoEstoqueRepository from "../Repositories/ProdutoEstoqueRepository.mjs";

export class ProdutoEstoqueController {

  async listarProdutos(req, res) {
    try {
      const lista = await ProdutoEstoqueRepository.listar();
      if (lista)
        return res.status(200).json(lista);
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
      retornaErro(validacao, res);
      return;
    }

    try {
      const { body } = req;
      const novoProduto = await ProdutoEstoqueRepository.cadastrar(body);
      if (novoProduto)
        return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async atualizarProduto(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { id } = req.params;
      const { body } = req;
      const produtoAtualizado = await ProdutoEstoqueRepository.atualizar(id, body);
      if (produtoAtualizado)
        if (produtoAtualizado)
          return res.status(201).json(produtoAtualizado);
    } catch (error) {
      if (error.meta.cause === "Record to update not found.")
        return res.status(404).json({ msg: "Produto não pode ser encontrado." });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async deletarProduto(req, res) {
    try {
      const { id } = req.params;
      const produtoDeletado = await ProdutoEstoqueRepository.deletar(id);
      if (produtoDeletado)
        return res.status(200).json({ msg: "Produto deletado com sucesso!" });
    } catch (error) {
      const { meta } = error;
      if (meta.cause === "Record to delete does not exist.")
        return res.status(404).json({ msg: "Este produto não existe" });

      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}