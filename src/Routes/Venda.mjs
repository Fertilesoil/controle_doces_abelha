import { Router } from "express";
import VendaController from "../Controllers/VendaController.mjs";

const router = new Router();

router.get("/api/listarVendas", VendaController.listarVendas);
router.get("/api/listarPorData", VendaController.vendaPorData);
router.post("/api/cadastrarVenda", VendaController.cadastrarVenda);
router.delete("/api/deletarVenda/:id", VendaController.deletarVenda);

export default router;