import { Router } from "express";
import { ProdutoVendaController } from "../Controllers/ProdutoVendaController.mjs";
import { checkSchema } from "express-validator";
import { validacaoProdutoVendaSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";

const router = new Router();
const produtoVendaController = new ProdutoVendaController();

router.get("/api/listarProdutosVenda", produtoVendaController.listarProdutosVenda);

// router.get("/api/listarProdutosVenda/:id", produtoVendaController.buscarPreçoProdutoPorId);

router.post("/api/cadastrarProdutosVenda",
 checkSchema(validacaoProdutoVendaSchema),
 produtoVendaController.cadastrarProdutoVenda);
router.put("/api/atualizarProdutoVenda/:id",
 checkSchema(validacaoProdutoVendaSchema),
 produtoVendaController.atualizarProdutoVenda);
router.delete("/api/deletarProdutoVenda/:id", produtoVendaController.deletarProdutoVenda);

export default router;