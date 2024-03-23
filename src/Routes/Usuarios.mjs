import UsuariosController from "../Controllers/UsuariosController.mjs";
import { Router } from "express";
import { validacaoUsuarioSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";
import { checkSchema } from "express-validator";

const routerUsuarios = Router();

routerUsuarios.get("/api/listarUsuarios", UsuariosController.listarUsuarios);
routerUsuarios.post("/api/criarUsuario",
 checkSchema(validacaoUsuarioSchema),
 UsuariosController.cadastrarUsuario);
routerUsuarios.delete("/api/deletarUsuario/:id", UsuariosController.deletarUsuario);
routerUsuarios.put("/api/atualizarUsuario/:id", UsuariosController.atualizarUsuario);

export default routerUsuarios;