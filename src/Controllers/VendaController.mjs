﻿import VendaRepository from "../Repositories/VendaRepository.mjs";

export class VendaController {

  async listarVendas(req, res) {
    try {
      const lista = await VendaRepository.listar();
      if (lista)
        return res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as vendas", error });
    };
  };

  async vendaPorData(req, res) {
    try {
      const { maior, menor } = req.body;

      const data = await VendaRepository.filtrarData(maior, menor);
      if (data)
        return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as vendas", error });
    };
  };

  async deletarVenda(req, res) {
    try {
      const { id } = req.params;
      const deletado = await VendaRepository.deletar(id);
      if (deletado)
        return res.status(200).send({ msg: "Deu bom, tudo apagado", deletado });
    } catch (error) {
      console.log(error);
      res.status(500).json({ erro: "Erro ao deletar a venda", error });
    }
  }

  async cadastrarVenda(req, res) {
    try {
      const { total_venda, itens } = req.body;
      const cadastroVenda = await VendaRepository.cadastrar(total_venda, itens, res);
      if (cadastroVenda)
        return;
    } catch (error) {
      console.table(error);
      return res.status(500).json({ error: "Erro ao registrar a venda. Você deve registrar um valor numérico válido", error });
    };
  };
}

export default new VendaController();