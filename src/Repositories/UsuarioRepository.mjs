import { prisma } from "../Middlewares/InstanciaCliente.mjs";


class UsuarioRepository {
 async cadastrar(body) {
  const novoUsuario = await prisma.usuario.create({ data: body });
  return novoUsuario;
 }

 async listar() {
  const clientes = await prisma.usuario.findMany();
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
}

export default new UsuarioRepository();