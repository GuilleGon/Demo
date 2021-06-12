import { Router } from 'express';

import auth from './auth';
import user from './user';
import client from './client';
import retiro from './retiro';
import presupuesto from './presupuesto';
import precios from './precios';
import recibos from './recibos';
import proveedores from './proveedores';
import gastos from './gastos';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/clients', client);
routes.use('/retiro', retiro);
routes.use('/presupuesto', presupuesto);
routes.use('/precios', precios);
routes.use('/recibos', recibos);
routes.use('/proveedores', proveedores);
routes.use('/gastos', gastos);

export default routes;