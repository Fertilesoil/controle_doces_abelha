import { criarValidacao, retornaErro } from "../Middlewares/Validacoes/CriarValidacao.mjs";
import ProdutoVendaRepository from "../Repositories/ProdutoVendaRepository.mjs";

export class ProdutoVendaController {
  async listarProdutosVenda(req, res) {
    try {
      const lista = await ProdutoVendaRepository.listar();
      if (lista)
        return res.status(200).send(lista);
    } catch (error) {
      return res.status(500).send({ msg: "Erro", error: error });
    }
  }

  async cadastrarProdutoVenda(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { body } = req;
      const novoProduto = await ProdutoVendaRepository.cadastrar(body);
      if (novoProduto)
        return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async atualizarProdutoVenda(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { id } = req.params;
      const { body } = req;
      const produtoAtualizado = await ProdutoVendaRepository.atualizar(id, body);
      if (produtoAtualizado)
        return res.status(200).send(produtoAtualizado);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async deletarProdutoVenda(req, res) {
    try {
      const { id } = req.params;
      const produtoDeletado = await ProdutoVendaRepository.deletar(id);
      if (produtoDeletado)
        return res.status(200).send({ msg: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}