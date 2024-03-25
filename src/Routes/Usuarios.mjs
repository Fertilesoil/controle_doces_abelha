import UsuariosController from "../Controllers/UsuariosController.mjs";
import { Router } from "express";
import { validacaoUsuarioSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";
import { checkSchema } from "express-validator";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const routerUsuarios = Router();

routerUsuarios.get("/api/listarUsuarios",
 authMiddleware,
 UsuariosController.listarUsuarios);

routerUsuarios.post("/api/criarUsuario",
 checkSchema(validacaoUsuarioSchema),
 UsuariosController.cadastrarUsuario);

routerUsuarios.delete("/api/deletarUsuario/:id",
 authMiddleware,
 UsuariosController.deletarUsuario);

routerUsuarios.put("/api/atualizarUsuario/:id",
 authMiddleware,
 checkSchema(validacaoUsuarioSchema),
 UsuariosController.atualizarUsuario);

export default routerUsuarios;