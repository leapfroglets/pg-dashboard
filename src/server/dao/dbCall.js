import url from 'url';
import * as conn from '../connection';
let client;

export function dbConnect(dbConfig){
  return new Promise((resolve , reject) => {
     conn.firstConnect(dbConfig)
     .then(reply => resolve(reply))
     .catch(err => reject(err));
  })
  
}

export function queryCall(query , dbConfig , database){
  return new Promise((resolve , reject) => {
    query = query.toLowerCase();
    conn.connectClient(query , dbConfig, database)
      .then(reply =>{
        resolve(reply);
     })
     .catch(err => {reject(err)});
  })
  
}

export function logOut(){
  return new Promise((resolve , reject) => {
    conn.disConnect()
    .then(reply => resolve(reply))
    .catch(err => reject(err));
  })
}