

class MetricasController {
  
  async metricasDoMes() {
    const estatisticas = await prisma.venda.aggregate({
      _count: { id: true }, // Contagem total de vendas
      _sum: { total_venda: true }, // Soma total das vendas
      _avg: { total_venda: true }, // Média das vendas
      _max: { total_venda: true }, // Valor máximo de uma venda
      _min: { total_venda: true }, // Valor mínimo de uma venda
    });

    return estatisticas;
  }

  // async totalDaSemana() {
    
  // }
}

export default new MetricasController();