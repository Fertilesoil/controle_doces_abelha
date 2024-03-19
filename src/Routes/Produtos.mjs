import { ProdutosController } from "../Controllers/ProdutosController.mjs";
import { Router } from "express";

const router = Router();
const produtosController = new ProdutosController();

router.get("/api/listarProdutos", produtosController.listarProdutos);
router.post("/api/criarProduto", produtosController.cadastrarProduto);
router.put("/api/atualizarProduto/:id", produtosController.atualizarProduto);
router.delete("/api/deletarProduto/:id", produtosController.deletarProduto);

export default router;