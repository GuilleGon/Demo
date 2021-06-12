import { Router } from 'express';

import { GastosController } from './../controller/GastosController';

const router = Router();

router.get('/', GastosController.getAll);

router.get('/:id', GastosController.getById);

router.post('/', GastosController.newGasto);

router.patch('/:id', GastosController.editGasto);

router.delete('/:id', GastosController.deleteGasto);

export default router;