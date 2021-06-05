import { Router } from 'express';

import {ClientController} from './../controller/ClientController';

const router = Router();

router.get('/', ClientController.getAll);

router.get('/:id', ClientController.getById);

router.post('/', ClientController.newClient);

router.patch('/:id', ClientController.editClient);

router.delete('/:id', ClientController.deleteClient);

export default router;