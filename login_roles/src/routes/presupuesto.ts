import { Router } from "express";
import { PresupuestoController } from "../controller/PresupuestoController";


const router = Router();

router.get('/', PresupuestoController.getAll);

router.get('/:id', PresupuestoController.getById);

router.post('/', PresupuestoController.newPresupuesto);

router.patch('/:id', PresupuestoController.editPresupuesto);

router.delete('/:id', PresupuestoController.deletePresupuesto);

export default router;