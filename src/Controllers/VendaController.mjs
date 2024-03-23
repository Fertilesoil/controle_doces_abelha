import { prisma } from "../Middlewares/InstanciaCliente.mjs";

export class VendaController {

 async listarVendas(req, res) {
  try {
   const vendas = await prisma.venda.findMany({
    include: {
     id: true,
     total_venda: true,
     createdAt: true,
    },
    include: {
     ItemVenda: true,
    },
   });
   return res.status(200).json(vendas);
  } catch (error) {
   console.log(error);
   res.status(500).json({ error: "Erro ao buscar as vendas" });
  };
 };

 async vendaPorData(req, res) {
  try {
   const { maior, menor } = req.body;
   const data = await prisma.venda.findMany({
    where: {
     createdAt: {
      gt: new Date(maior).toISOString(),
      lt: new Date(menor).toISOString(),
     },
    },
   },
   );
   return res.status(200).json(data);
  } catch (error) {
   console.log(error);
   res.status(500).json({ error: "Erro ao buscar as vendas" });
  };
 };

 async deletarVenda(req, res) {
  const { id } = req.params;
  try {
   const deletados = await prisma.venda.delete({ where: { id: id } });
   return res.status(200).send({ msg: "Deu bom, tudo apagado" });
  } catch (error) {
   console.log(error);
   res.status(500).json({ error: "Erro ao deletar a venda" });
  }
 }

 async cadastrarVenda(req, res) {
  try {
   const { total_venda, itens } = req.body;
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

    res.json(novaVenda);
   })
  } catch (error) {
   console.error("Erro ao registrar a venda:", error);
   res.status(500).json({ error: "Erro ao registrar a venda. Você deve registrar um valor numérico válido" });
  };
 };
}

export default new VendaController();