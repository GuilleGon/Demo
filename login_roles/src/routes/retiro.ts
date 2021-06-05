import { Router } from 'express';

import {RetiroController} from './../controller/RetiroController';

const router = Router();

router.get('/', RetiroController.getAll);

router.get('/:id', RetiroController.getById);

router.post('/', RetiroController.newRetiro);

router.patch('/:id', RetiroController.editRetiro);

router.delete('/:id', RetiroController.deleteRetiro);

export default router;