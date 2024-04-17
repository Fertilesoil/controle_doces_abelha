import { Router } from "express";
import RecheioController from "../Controllers/RecheioController.mjs";
import { checkSchema } from "express-validator";
import { validacaoRecheioSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";
import { authMiddleware } from "../Middlewares/Auth/AuthMiddleware.mjs";

const router = new Router();

router.get("/api/listarRecheios",
  authMiddleware,
  RecheioController.listarRecheios);

router.get("/api/acharRecheio/:id",
  authMiddleware,
  RecheioController.listarRecheioPorId);

router.post("/api/cadastrarRecheio",
  authMiddleware,
  checkSchema(validacaoRecheioSchema),
  RecheioController.cadastrarRecheio);

router.put("/api/atualizarRecheio/:id",
  authMiddleware,
  checkSchema(validacaoRecheioSchema),
  RecheioController.atualizarRecheio);

router.delete("/api/deletarRecheio/:id",
  authMiddleware,
  RecheioController.deletarRecheio);

export default router;