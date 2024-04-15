import { prisma } from "../Middlewares/InstanciaCliente.mjs";


class UsuarioRepository {
  async cadastrar(primeiro_nome, sobrenome, email, senhaHash) {
    const novoUsuario = await prisma.usuario.create({
      data: {
        primeiro_nome,
        sobrenome,
        email,
        senha: senhaHash
      }
    });
    return novoUsuario;
  }

  async listar() {
    const clientes = await prisma.usuario.findMany({
      select: {
        id: true,
        primeiro_nome: true,
        sobrenome: true,
        email: true,
        senha: true,
        createdAt: true
      }
    });
    return clientes;
  }

  async deletar(id) {
    const usuarioDeletado = await prisma.usuario.delete({ where: { id: id } });
    return usuarioDeletado;
  }

  async atualizar(id, body) {
    const usuarioAtualizado = await prisma.usuario.update({ where: { id: id }, data: body });
    return usuarioAtualizado;
  }

  async acharUsuarioPorEmail(email) {
    const usuario = await prisma.usuario.findFirst({ where: { email: email } });
    return usuario;
  }

  async acharUsuarioPorId(id) {
    const usuario = await prisma.usuario.findFirst({ where: { id: id } });
    return usuario;
  }
}

export default new UsuarioRepository();