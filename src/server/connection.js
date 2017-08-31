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
      resolve('logged in successfully');
    });
    
  })

}

export function connectClient(query ,dbConfig ){

  return new Promise((resolve , reject) => {
    if(clients.length>0){
      console.log(clients.length);
    let flag=0;
    clients.forEach((client) => {
      
      if(dbConfig.database){         
        if(client.connectionParameters.database == dbConfig.database){
          currentDb = client;
          flag=1;
          client.query(query , (err , rows)=>{
            if(err){
              return reject (err);
            }
            resolve(rows);
          });
          
        }
      }      
    })
    if(flag ==0){
    let conString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
    let client1 = new pg.Client(conString);
    currentDb = client1;
    client1.connect((err , client , done) => {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }
      clients.push(client);
                client.query(query , (err , rows)=>{
            
            if(err){
              return reject (err);
            }
            resolve(rows);
          });
      
    });
    }
    if(!dbConfig.database){
 
      currentDb.connect((err , client , done) => {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }
      clients.push(client);
          client.query(query , (err , rows)=>{
            
            if(err){
              return reject (err);
            }
            resolve(rows);
          });
      
    }); 
    }
    
    }
  else{
    let err='Please login first';
    reject(err);
  }
  })  
  
}

export function disConnect(){
  return new Promise((resolve, reject) => {
    clients.forEach((client)=> {
      client.end();
    })
    clients.length = 0;
    resolve('logged out ');
  })
}