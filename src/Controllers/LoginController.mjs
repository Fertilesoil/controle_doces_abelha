import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UsuarioRepository from "../Repositories/UsuarioRepository.mjs";

class LoginController {

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await UsuarioRepository.acharUsuarioPorEmail(email);

      if (!usuario)
        return res.status(401).json({ msg: "Email ou senha inválidos" });

      const verificarSenha = await bcrypt.compare(senha, usuario.senha);

      if (!verificarSenha)
        return res.status(401).json({ msg: "Email ou senha inválidos" });

      const { senha: _, createdAt, ...usuarioLogin } = usuario;

      const tokenAcesso = jwt.sign({ id: usuarioLogin.id, nome: usuarioLogin.primeiro_nome, sobrenome: usuarioLogin.sobrenome, email: usuarioLogin.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 100 * 1000 });

      const tokenRefresh = jwt.sign(
        { nome_usuario: usuarioLogin.primeiro_nome, email: usuarioLogin.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '3d' }
      );

      res.cookie('access_token', tokenAcesso, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 2 * 60 * 1000
      });

      res.cookie('refresh_token', tokenRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3 * 24 * 60 * 60 * 1000
      });

      return res.json({ tokenAcesso });
    } catch (error) {
      return res.status(404).json(error.message);
    };
  };

  async checarToken(req, res, next) {
    return res.json(req.usuario);
  };

  async refresh(req, res) {
    const { cookies } = req;
    const { token } = req.body;

    try {

      if (!cookies.refresh_token && !token)
        return res.status(401).json({ msg: "Não autorizado: faça login novamente" });

      const refreshToken = cookies.refresh_token;

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(401).json({ msg: "Token não pode ser renovado, faça login novamente!" });

          const usuario = await UsuarioRepository.acharUsuarioPorEmail(result.email);

          if (!usuario)
            return res.json({ msg: "Email ou senha inválidos" });

          const { senha: _, createdAt, ...usuarioLogin } = usuario;

          const tokenAcesso = jwt.sign(
            { id: usuarioLogin.id, nome: usuarioLogin.primeiro_nome, sobrenome: usuarioLogin.sobrenome, email: usuarioLogin.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
          );

          res.cookie("access_token", tokenAcesso, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 2000
          });

          req.usuario = usuarioLogin;

          return res.json({ tokenAcesso });
        }
      );

    } catch (error) {
      return res.json({ erro: error });
    }
  }

  async logout(req, res) {
    const { cookies } = req;

    try {
      if (!cookies.refresh_token)
        return res.status(204);

      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      });

      return res.json({ msg: "Deslogado com sucesso" });
    } catch (error) {
      return res.status(400).json({ msg: "Ocorreu um erro durante o processo" });
    }

  }
}

export default new LoginController();