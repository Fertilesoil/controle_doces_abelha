import { ProdutoEstoqueController } from "../Controllers/ProdutoEstoqueController.mjs";
import { Router } from "express";

const router = Router();
const produtosController = new ProdutoEstoqueController();

router.get("/api/listarProdutos", produtosController.listarProdutos);
router.post("/api/criarProduto", produtosController.cadastrarProduto);
router.put("/api/atualizarProduto/:id", produtosController.atualizarProduto);
router.delete("/api/deletarProduto/:id", produtosController.deletarProduto);

export default router;