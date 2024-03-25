import { Router } from "express";
import VendaController from "../Controllers/VendaController.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.get("/api/listarVendas",
 authMiddleware,
 VendaController.listarVendas);

router.get("/api/listarPorData",
 authMiddleware,
 VendaController.vendaPorData);

router.post("/api/cadastrarVenda",
 authMiddleware,
 VendaController.cadastrarVenda);

router.delete("/api/deletarVenda/:id",
 authMiddleware,
 VendaController.deletarVenda);

export default router;