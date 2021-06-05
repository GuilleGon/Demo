import { Router } from "express";
import { RecibosController } from "../controller/RecibosController";

const router = Router();

router.get('/', RecibosController.getAll);

router.get('/:id', RecibosController.getById);

router.post('/', RecibosController.newRecibos);

router.patch('/:id', RecibosController.editRecibos);

router.delete('/:id', RecibosController.deleteRecibos);

export default router;