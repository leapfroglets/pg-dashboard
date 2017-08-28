import url from 'url';
import { connectClient } from '../connection';
import { firstConnect } from '../connection';
import { Router } from 'express';
import * as services from '../services/queryService';

let controller = Router();
let dbConfig={
  user:' ',
  password: ' ',
  database:' ',
  port:' ',
  host:'127.0.0.1'
}
//insert or create queries
controller.post('/login' , (req , res , next) => {
  
  dbConfig.database = req.body.dbname || 'postgres';
  dbConfig.user = req.body.user;
  dbConfig.password = req.body.password;
  dbConfig.port = req.body.port || 5432;

  services.dbConnect(dbConfig)
  .then (msg => res.json(msg))
  .catch(err => {
    dbConfig.database = ' ';
    dbConfig.user = ' ';
    dbConfig.password = ' ';
    dbConfig.port = ' ';
    next(err)
  });
  
})

controller.post('/queries' , (req , res , next) => {
  dbConfig.database = req.body.dbname || dbConfig.database;
  let query = req.body.query;
  query = query.replace(/\s+/g, ' ').trim();
  services.queryCall(query , dbConfig)
  .then(reply => res.json(reply))
  .catch(err => next(err));
})

controller.get('/logout' , (req, res , next)=> {
  services.logOut()
  .then(reply => res.json(reply))
  .catch(err => next(err));
});
export default controller;