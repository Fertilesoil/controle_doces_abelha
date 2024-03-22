import { Router } from "express";
import { ProdutoVendaController } from "../Controllers/ProdutoVendaController.mjs";

const router = new Router();
const produtoVendaController = new ProdutoVendaController();

router.get("/api/listarProdutosVenda", produtoVendaController.listarProdutosVenda);

// router.get("/api/listarProdutosVenda/:id", produtoVendaController.buscarPreçoProdutoPorId);

router.post("/api/cadastrarProdutosVenda", produtoVendaController.cadastrarProdutoVenda);
router.put("/api/atualizarProdutoVenda/:id", produtoVendaController.atualizarProdutoVenda);
router.delete("/api/deletarProdutoVenda/:id", produtoVendaController.deletarProdutoVenda);

export default router;