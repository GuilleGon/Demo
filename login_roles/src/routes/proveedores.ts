import { Router } from 'express';

import { ProveedoresController } from './../controller/ProveedoresController';

const router = Router();

router.get('/', ProveedoresController.getAll);

router.get('/:id', ProveedoresController.getById);

router.post('/', ProveedoresController.newProveedor);

router.patch('/:id', ProveedoresController.editProveedor);

router.delete('/:id', ProveedoresController.deleteProveedor);

export default router;