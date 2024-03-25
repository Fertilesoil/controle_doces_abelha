import { checkSchema } from "express-validator";
import { Router } from "express";
import { validacaoProdutoEstoqueSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";
import ProdutoEstoqueController from "../Controllers/ProdutoEstoqueController.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = Router();

router.get("/api/listarProdutos",
 authMiddleware,
 ProdutoEstoqueController.listarProdutos);

router.post("/api/criarProduto",
 checkSchema(validacaoProdutoEstoqueSchema),
 authMiddleware,
 ProdutoEstoqueController.cadastrarProduto);

router.put("/api/atualizarProduto/:id",
 authMiddleware,
 checkSchema(validacaoProdutoEstoqueSchema),
 ProdutoEstoqueController.atualizarProduto);

router.delete("/api/deletarProduto/:id",
 authMiddleware,
 ProdutoEstoqueController.deletarProduto);

export default router;