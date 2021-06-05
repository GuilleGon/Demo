import { Router } from 'express';
import { RepositoryNotFoundError } from 'typeorm';
import AuthController  from '../controller/AuthController';
import {checkJwt} from './../middleware/jwt';

const router = Router();

//login
router.post('/login', AuthController.login);

//change password
router.post('/changePassword', [checkJwt], AuthController.changePassword);

export default router;