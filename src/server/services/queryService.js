import * as dao from '../dao/dbCall'

export function dbConnect(dbConfig){
  return dao.dbConnect(dbConfig);
}

export function queryCall(query , dbConfig){
  return dao.queryCall(query , dbConfig);
}

export function logOut(){
  return dao.logOut();
}