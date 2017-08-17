import { Router } from 'express';

import url from 'url';
import controller from './controllers/queryController'
let routes = Router();

routes.use('/queries', controller);

export default routes;