import { Router } from "express";
import { VendaController } from "../Controllers/VendaController.mjs";

const router = new Router();
const vendaController = new VendaController();

router.get("/api/listarVendas", vendaController.listarVendas);
router.get("/api/listarPorData", vendaController.vendaPorData);
router.post("/api/cadastrarVenda", vendaController.cadastrarVenda);
router.delete("/api/deletarVenda/:id", vendaController.deletarVenda);

export default router;