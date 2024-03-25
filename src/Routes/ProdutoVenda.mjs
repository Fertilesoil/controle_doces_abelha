import { Router } from "express";
import ProdutoVendaController from "../Controllers/ProdutoVendaController.mjs";
import { checkSchema } from "express-validator";
import { validacaoProdutoVendaSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.get("/api/listarProdutosVenda", ProdutoVendaController.listarProdutosVenda);



router.post("/api/cadastrarProdutosVenda",
 authMiddleware,
 checkSchema(validacaoProdutoVendaSchema),
 ProdutoVendaController.cadastrarProdutoVenda);

router.put("/api/atualizarProdutoVenda/:id",
 authMiddleware,
 checkSchema(validacaoProdutoVendaSchema),
 ProdutoVendaController.atualizarProdutoVenda);

router.delete("/api/deletarProdutoVenda/:id",
 authMiddleware,
 ProdutoVendaController.deletarProdutoVenda);

export default router;