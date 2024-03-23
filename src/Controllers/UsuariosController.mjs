import { prisma } from "../Middlewares/InstanciaCliente.mjs";
import { criarValidacao } from "../Middlewares/Validacoes/CriarValidacao.mjs";

class UsuariosController {

  async cadastrarUsuario(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      const { msg, campo, value } = validacao;
      return res.status(403).json({ campo_erro: campo, valor: value, msg });
    }
    
    try {
      const { body } = req;
      const novoUsuario = await prisma.usuario.create({ data: body });
      if (novoUsuario)
        return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async listarUsuarios(req, res) {
    try {
      const clientes = await prisma.usuario.findMany();
      if (clientes)
        return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };

  async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuarioDeletado = await prisma.usuario.delete({ where: { id: id } });

      if (usuarioDeletado)
        return res.status(204).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ msg: "Erro Interno no Servidor", erro: error });
    };
  };


  async atualizarUsuario(req, res) {
    const validacao = criarValidacao(req, res);
    if (validacao) {
      const { msg, campo, value } = validacao;
      return res.status(403).json({ campoErro: campo, valor: value, msg });
    }
    
    try {
      const { id } = req.params;
      const { body } = req;
      const usuarioAtualizado = await prisma.usuario.update({ where: { id: id }, data: body });
      if (usuarioAtualizado)
        return res.status(201).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}

export default new UsuariosController();