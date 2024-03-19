import { prisma } from "../Middlewares/InstanciaCliente.mjs";

export class UsuariosController {

  async cadastrarUsuario(req, res) {
    const { body } = req;

    try {
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
    const { id } = req.params;
    const { body } = req;

    try {
      const usuarioAtualizado = await prisma.usuario.update({ where: { id: id }, data: body });
      if (usuarioAtualizado)
        return res.status(201).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}