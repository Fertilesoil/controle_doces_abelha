import { criarValidacao, retornaErro } from "../Middlewares/Validacoes/CriarValidacao.mjs";
import UsuarioRepository from "../Repositories/UsuarioRepository.mjs";
import bcrypt from "bcrypt";

class UsuariosController {

  async cadastrarUsuario(req, res) {
    const validacao = criarValidacao(req);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { primeiro_nome, sobrenome, email, senha } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await UsuarioRepository.cadastrar(primeiro_nome, sobrenome, email, senhaHash);
      if (usuario) {
        const { senha: _, ...usuarioCriado } = usuario;
        return res.status(201).json(usuarioCriado);
      }
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", erro: error });
    };

    return res.status(403).json({ campo_erro: campo, valor: value, msg });
  };

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioRepository.listar();
      if (usuarios) {
        return res.status(200).json(usuarios);
      }
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };

    return res.status(403).json({ campo_erro: campo, valor: value, msg });
  };

  async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuarioDeletado = await UsuarioRepository.deletar(id);

      if (usuarioDeletado)
        return res.status(204).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ msg: "Erro Interno no Servidor", erro: error });
    };
  };

  async atualizarUsuario(req, res) {
    const validacao = criarValidacao(req, res);
    if (validacao) {
      retornaErro(validacao, res);
      return;
    }

    try {
      const { id } = req.params;
      const { body } = req;

      const usuarioAtualizado = await UsuarioRepository.atualizar(id, body);

      if (usuarioAtualizado)
        return res.status(201).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ msg: "Erro Interno no Servidor", error: error });
    };
  };
}

export default new UsuariosController();