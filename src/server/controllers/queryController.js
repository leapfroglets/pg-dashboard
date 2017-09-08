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
  host:' '
}
function reset(){
  dbConfig.database = ' ';
  dbConfig.user = ' ';
  dbConfig.password = ' ';
  dbConfig.port = ' ';
}
//insert or create queries
controller.post('/login' , (req , res , next) => {
  
  dbConfig.database = req.body.dbname || 'postgres';
  dbConfig.user = req.body.user;
  dbConfig.password = req.body.password;
  dbConfig.port = req.body.port || 5432;
  dbConfig.host = req.body.host || '127.0.0.1';

  services.dbConnect(dbConfig)
  .then (msg => {
    reset();
    res.json(msg)
  })
  .catch(err => {
    reset();
    next(err)
  });
  
})

controller.post('/queries' , (req , res , next) => {
  dbConfig.database = req.body.dbname || dbConfig.database;
  dbConfig.user = req.body.user || dbConfig.user;
  let query = req.body.query;
  query = query.replace(/\s+/g, ' ').trim();
  services.queryCall(query , dbConfig)
  .then(reply =>{
    reset(); 
    res.json(reply);
  })
  .catch(err =>{
    reset();
    next(err);
  });
})

controller.post('/logout' , (req, res , next)=> {
  let userName = req.body.user;
  services.logOut(userName)
  .then(reply => res.json(reply))
  .catch(err => {console.log(err);next(err)});
});
export default controller;