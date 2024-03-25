import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UsuarioRepository from "../Repositories/UsuarioRepository.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

class LoginController {
 async login(req, res) {
  try {
   const { email, senha } = req.body;
   const usuario = await UsuarioRepository.acharUsuarioPorEmail(email);

   if (!usuario)
    throw new Error("Email ou senha inválidos");

   const verificarSenha = await bcrypt.compare(senha, usuario.senha);

   if (!verificarSenha)
    throw new Error("Email ou senha inválidos");

   const token = jwt.sign({ id: usuario.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
   });

   const { senha: _, createdAt, ...usuarioLogin } = usuario;

   return res.status(200).json({
    user: usuarioLogin,
    token: "Bearer " + token,
   });
  } catch (error) {
   return res.status(404).json(error.message);
  };
 };

 async checarToken(req, res, next) {
  console.log(req.usuario);
  return res.json(req.usuario);
 };
}

export default new LoginController();