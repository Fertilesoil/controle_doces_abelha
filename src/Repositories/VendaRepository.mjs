import { prisma } from "../Middlewares/InstanciaCliente.mjs";
import { v4 as uuidv4 } from 'uuid';
import ProdutoVendaRepository from "./ProdutoVendaRepository.mjs";
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
        },
      });

      if (novaVenda) {
        const { ItemVenda } = novaVenda;
        await ProdutoVendaRepository.atualizarEstoque(ItemVenda);
      }

      if (novaVenda) {
        const { total_venda } = novaVenda;
        let total_dia = await this.executarAcao(total_venda);
        let total = total_dia.total_dia + total_venda;
        return res.status(201).json({ novaVenda, total });
      }
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

  async deletarPorData(maior, menor) {
    const deletados = await prisma.venda.deleteMany({
      where: {
        createdAt: {
          gt: new Date(maior).toISOString(),
          lt: new Date(menor).toISOString(),
        }
      }
    });
    return deletados;
  }

  async buscarTotalDiario(hoje) {
    const total = await prisma.totalVendaDiaria.findFirst({
      where:
      {
        createdAt: {
          gte: new Date(hoje).toISOString()
          // lt: new Date(amanha).toISOString()
        }
      }
    });
    return total;
  }

  async atualizarTotalDiario(id, total) {
    const atualizar = prisma.totalVendaDiaria.upsert({
      where: { id: id },
      update: { total_dia: total },
      create: { id: id, total_dia: total }
    });
    return atualizar;
  }

  async executarAcao(total_venda) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const totalDia = await this.buscarTotalDiario(hoje);

    if (totalDia) {
      let { total_dia, id } = totalDia;
      total_dia += total_venda;
      const total = await this.atualizarTotalDiario(id, total_dia);
    } else if (!totalDia) {
      const id = uuidv4();
      const total = await this.atualizarTotalDiario(id, total_venda);
      return total;
    } 
    return totalDia;
  }
}

export default new VendaRepository();