import url from 'url';
import * as conn from '../connection';
let client;

export function dbConnect(dbConfig){
  
  return conn.firstConnect(dbConfig);
  
}

export function queryCall(query , dbConfig , database){
 
  return conn.connectClient(query , dbConfig , database);
  
}

export function logOut(user){
 
  return conn.disConnect(user);
}