import { Router } from "express";
import { PreciosController } from "../controller/PreciosController";



const router = Router();

router.get('/', PreciosController.getAll);

router.get('/:id', PreciosController.getById);

router.post('/', PreciosController.newPrecio);

router.patch('/:id', PreciosController.editPrecio);

router.delete('/:id', PreciosController.deletePrecio);

export default router;