import { prisma } from "../Middlewares/InstanciaCliente.mjs";

class VendaRepository {
  async cadastrar(total_venda, itens, res) {
    await prisma.$transaction(async (prisma) => {

      const novaVenda = await prisma.venda.create({
        data: {
          total_venda,
          ItemVenda: {
            create: await Promise.all(itens.map(async item => ({
              produto_venda_id: item.produto_venda_id,
              quantidade: item.quantidade,
              total_item: item.total_item
            })))
          }
        },
        include: {
          ItemVenda: true
        }
      });
      return res.status(201).json(novaVenda);
    })
  }

  async listar() {
    const vendas = await prisma.venda.findMany({
      include: {
        id: true,
        total_venda: true,
        createdAt: true,
      }, include: {
        ItemVenda: false,
      }
    });
    return vendas;
  }

  async filtrarData(maior, menor) {
    const data = await prisma.venda.findMany({
      where: {
        createdAt: {
          gt: new Date(maior).toISOString(),
          lt: new Date(menor).toISOString(),
        },
      },
    },
    );
    return data;
  }

  async deletar(id) {
    const deletados = await prisma.venda.delete({ where: { id: id } });
    return deletados;
  }
}

export default new VendaRepository();