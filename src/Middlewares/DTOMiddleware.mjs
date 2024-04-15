import { Usuario } from "../DTOs/UsuarioDTO.mjs";

export function dto(req, res, next) {
  const usuarioRequisicao = { ...Usuario }

  req.usuario = usuarioRequisicao;
  next();
};