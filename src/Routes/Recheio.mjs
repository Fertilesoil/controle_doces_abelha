import { Router } from "express";
import RecheioController from "../Controllers/RecheioController.mjs";
import { checkSchema } from "express-validator";
import { validacaoRecheioSchema } from "../Middlewares/Validacoes/ValidationSchemas.mjs";

const router = new Router();

router.get("/api/listarRecheios", RecheioController.listarRecheios);
router.get("/api/acharRecheio/:id", RecheioController.listarRecheioPorId);
router.post("/api/cadastrarRecheio",
 checkSchema(validacaoRecheioSchema),
 RecheioController.cadastrarRecheio);
router.put("/api/atualizarRecheio/:id",
 checkSchema(validacaoRecheioSchema),
 RecheioController.atualizarRecheio);
router.delete("/api/deletarRecheio/:id", RecheioController.deletarRecheio);

export default router;