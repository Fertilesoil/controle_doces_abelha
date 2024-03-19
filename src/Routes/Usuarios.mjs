import { UsuariosController } from "../Controllers/UsuariosController.mjs";
import { Router } from "express";

const router = Router();
const usuariosController = new UsuariosController();

router.get("/api/listarUsuarios", usuariosController.listarUsuarios);
router.post("/api/criarUsuario", usuariosController.cadastrarUsuario);
router.delete("/api/deletarUsuario/:id", usuariosController.deletarUsuario);
router.put("/api/atualizarUsuario/:id", usuariosController.atualizarUsuario);

export default router;