import { Router } from 'express';

import url from 'url';
import controller from './controllers/queryController'
let routes = Router();

routes.use('/database', controller);

export default routes;