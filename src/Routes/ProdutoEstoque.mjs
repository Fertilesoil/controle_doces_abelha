import { checkSchema } from "express-validator";
import { ProdutoEstoqueController } from "../Controllers/ProdutoEstoqueController.mjs";
import { Router } from "express";
import { validacaoProdutoEstoqueSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";

const router = Router();
const produtosController = new ProdutoEstoqueController();

router.get("/api/listarProdutos", produtosController.listarProdutos);
router.post("/api/criarProduto",
 checkSchema(validacaoProdutoEstoqueSchema),
 produtosController.cadastrarProduto);
router.put("/api/atualizarProduto/:id",
 checkSchema(validacaoProdutoEstoqueSchema),
 produtosController.atualizarProduto);
router.delete("/api/deletarProduto/:id", produtosController.deletarProduto);

export default router;