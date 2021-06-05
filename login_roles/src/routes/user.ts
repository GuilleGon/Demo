import { Router } from 'express';
import { UserController } from './../controller/UserController';
import { checkJwt } from './../middleware/jwt';
import { checkRole } from './../middleware/role';

const router = Router();

//get all users
router.get('/', UserController.getAll);

//get one user
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

//creat new user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

//edit user
router.patch('/:id', [checkJwt], checkRole(['admin']), UserController.editUser);

//delete user
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;