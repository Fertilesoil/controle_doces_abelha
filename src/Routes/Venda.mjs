﻿import { Router } from "express";
import VendaController from "../Controllers/VendaController.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.get("/api/vendas",
  authMiddleware,
  VendaController.listarVendas);

router.get("/api/vendas",
  authMiddleware,
  VendaController.vendaPorData);

router.post("/api/vendas",
  authMiddleware,
  VendaController.cadastrarVenda);

router.delete("/api/vendas/:id",
  authMiddleware,
  VendaController.deletarVenda);

export default router;