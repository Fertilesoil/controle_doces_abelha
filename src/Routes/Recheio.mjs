import { Router } from "express";
import { RecheioController } from "../Controllers/RecheioController.mjs";

const router = new Router();
const recheioController = new RecheioController();

router.get("/api/listarRecheios", recheioController.listarRecheios);
router.get("/api/acharRecheio/:id", recheioController.listarRecheioPorId);
router.post("/api/cadastrarRecheio", recheioController.cadastrarRecheio);
router.put("/api/atualizarRecheio/:id", recheioController.atualizarRecheio);
router.delete("/api/deletarRecheio/:id", recheioController.deletarRecheio);

export default router;