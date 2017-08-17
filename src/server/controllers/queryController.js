import url from 'url';
import { connectClient } from '../connection';
import { Router } from 'express';
import * as services from '../services/queryService';

let controller = Router();

//insert or create queries
controller.post('/' , (req , res , next) => {
  let query = req.body.query;
  let database = req.body.dbname;
  services.queryServiceCall(query , database)
  .then(data => res.json(data))
  .catch(err => next(err));
  
})

export default controller;