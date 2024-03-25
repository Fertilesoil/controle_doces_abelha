import { Router } from "express";
import usuariosRouter from "./Usuarios.mjs";
import produtosEstoqueRouter from "./ProdutoEstoque.mjs"
import produtosVendaRouter from "./ProdutoVenda.mjs";
import recheiosRouter from "./Recheio.mjs";
import vendasRouter from "./Venda.mjs";
import loginRouter from "./Login.mjs";

const router = Router();

router.use(usuariosRouter);
router.use(produtosEstoqueRouter);
router.use(produtosVendaRouter);
router.use(recheiosRouter);
router.use(vendasRouter);
router.use(loginRouter);

export default router;