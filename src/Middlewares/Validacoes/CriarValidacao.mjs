import { validationResult } from "express-validator";

export function criarValidacao(req) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const { path: campo, msg, value } = result.errors[0];
    return { result, campo, msg, value };
  }
}

export function retornaErro(validacao, res) {
  if (validacao) {
    const { msg, campo, value } = validacao;
    return res.status(403).json({ campo_erro: campo, valor: value, msg });
  }
}