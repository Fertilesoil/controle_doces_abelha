import UsuarioRepository from "../../Repositories/UsuarioRepository.mjs";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw new Error("Não autorizado");

    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const usuario = await UsuarioRepository.acharUsuarioPorId(id);

    if (!usuario)
      throw new Error("Não autorizado");

    const { senha: _, createdAt, ...usuarioLogado } = usuario;

    req.usuario = usuarioLogado;

    next();
  } catch (error) {
    return res.status(401).json(error.message);
  };
};