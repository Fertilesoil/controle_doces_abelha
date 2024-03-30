import { prisma } from "../Middlewares/InstanciaCliente.mjs";


class RecheioRepository {
  async cadastrar(body) {
    const novoRecheio = await prisma.recheio.create({ data: body });
    return novoRecheio;
  }

  async listar() {
    const recheios = await prisma.recheio.findMany();
    return recheios;
  }

  async listarPorId(id) {
    const recheio = await prisma.recheio.findUnique({ where: { id: id } });
    return recheio;
  }

  async atualizar(body, id) {
    const recheioAtualizado = await prisma.recheio.update({ where: { id: id }, data: body });
    return recheioAtualizado;
  }

  async deletar(id) {
    const recheioDeletado = await prisma.recheio.delete({ where: { id: id } });
    return recheioDeletado;
  }
}

export default new RecheioRepository();