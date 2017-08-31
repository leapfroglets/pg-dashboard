import pg from 'pg';
import db from './.env';

let clients = [];
let currentDb = clients[0];
export function firstConnect(dbConfig){
  
  return new Promise((resolve , reject) => {
    let conString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
    let client = new pg.Client(conString);
    client.connect((err , client , done) => {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }
      clients.push(client);
    
      resolve({reply:'logged in successfully'});
    });
    
  })

}

export function connectClient(query ,dbConfig,database ){

  return new Promise((resolve , reject) => {
    
    let flag = 0;
    if(clients.length > 0){
      clients.forEach((client) => {      
        //Using an existing connection
        if(dbConfig.database){        
          if(client.connectionParameters.database == dbConfig.database){
            currentDb = client;
            flag=1;                      
          }
        }      
      })
      //Creating a new connection
      if(flag ==0){ 
        let conString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
        let client1 = new pg.Client(conString);
        currentDb = client1;
        client1.connect((err , client , done) => {
          if(err){
            let error = err.stack.split('\n')[0];
            return reject(error);
          }
          clients.push(client);
          currentDb = client;                       
        });
      }
      //Ending a connection
      if(database){
        if(database == currentDb.connectionParameters.database){        
          let err ='Database currently in use';
          return reject(err);
        }
        clients.forEach((client) => {
          if(client.connectionParameters.database == database){        
            client.end();
            client.connectionParameters.database=' ';
          }
        })
      }
      
      currentDb.query(query , (err , rows)=> {
        if(err ){
          return reject(err.stack.split('\n')[0]);
        }
        resolve(rows);
      });
    }
    else{
      let err='Please login first';
      reject(err);
    }
    
  })  
  
}

export function disConnect(){
  return new Promise((resolve, reject) => {
    if(clients.length == 0){
      reject('Please login first');  
    }
    else{
      clients.forEach((client)=> {
        client.end();
      })
      clients.length = 0;
      resolve({reply:'logged out '});
    }
    
  })
}