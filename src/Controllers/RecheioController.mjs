import { prisma } from "../Middlewares/InstanciaCliente.mjs";
import { criarValidacao } from "../Middlewares/Validacoes/CriarValidacao.mjs";

class RecheioController {

  async listarRecheios(req, res) {
    try {
      const recheios = await prisma.recheio.findMany();
      return res.status(200).send(recheios);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async listarRecheioPorId(req, res) {
    try {
      const { id } = req.params;
      const recheio = await prisma.recheio.findUnique({ where: { id: id } });
      return res.status(200).send(recheio);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async cadastrarRecheio(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      const { msg, campo, value } = validacao;
      console.log({ msg, campo, value });
      return res.status(403).json({ campo_erro: campo, valor: value, msg });
    }

    try {
      const { body } = req;
      const novoRecheio = await prisma.recheio.create({ data: body });
      return res.status(201).send(novoRecheio);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async atualizarRecheio(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      const recheioAtualizado = await prisma.recheio.update({ where: { id: id }, data: body });
      return res.status(200).send(recheioAtualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };

  async deletarRecheio(req, res) {
    const { id } = req.params;
    try {
      const recheioDeletado = await prisma.recheio.delete({ where: { id: id } });
      if (recheioDeletado)
        return res.status(200).json({ msg: "Recheio deletado com sucesso!" });
    } catch (error) {
      const { meta } = error;
      if (meta.cause === "Record to delete does not exist.")
        return res.status(404).json({ msg: "Este recheio não existe" });

      console.log(error);
      return res.status(500).send({ msg: "Houve um erro no servidor", erro: error });
    };
  };
}

export default new RecheioController();