import { Router } from "express";
import usuariosRouter from "./Usuarios.mjs";
import produtosRouter from "./Produtos.mjs"

const router = Router();

router.use(usuariosRouter);
router.use(produtosRouter);

export default router;