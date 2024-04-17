import { criarValidacao, retornaErro } from "../Middlewares/Validacoes/CriarValidacao.mjs";
import RecheioRepository from "../Repositories/RecheioRepository.mjs";

class RecheioController {

  async listarRecheios(req, res) {
    try {
      const recheios = await RecheioRepository.listar();
      if (recheios)
        return res.status(200).send(recheios);
    } catch (error) {
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async listarRecheioPorId(req, res) {
    try {
      const { id } = req.params;
      const recheio = await RecheioRepository.listarPorId(id);
      if (recheio)
        return res.status(200).send(recheio);
    } catch (error) {
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async cadastrarRecheio(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { nome } = req.body;
      const recheioCadastrado = await RecheioRepository.cadastrar(nome);
      if (recheioCadastrado)
        return res.status(201).send(recheioCadastrado);
    } catch (error) {
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async atualizarRecheio(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { body } = req;
      const { id } = req.params;
      const atualizado = await RecheioRepository.atualizar(body, id);
      if (atualizado)
        return res.status(200).send(atualizado);
    } catch (error) {
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async deletarRecheio(req, res) {
    try {
      const { id } = req.params;
      const deletado = await RecheioRepository.deletar(id);
      if (deletado)
        return res.status(200).json({ msg: "Recheio deletado com sucesso!" });
    } catch (error) {
      const { meta } = error;
      if (meta.cause === "Record to delete does not exist.")
        return res.status(404).json({ msg: "Este recheio não existe" });

      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };
}

export default new RecheioController();