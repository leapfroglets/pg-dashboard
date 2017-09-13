import pg from 'pg';
import db from './.env';

let clients = [];
let currentDb;
let index=0;
export function firstConnect(dbConfig){
  
  return new Promise((resolve , reject) => {    
    if(index>0){
      for(let i=0;i<index;i++){
        
        if(clients[i][0].connectionParameters.user == dbConfig.user){
          return resolve({reply:'logged in successfully'});    
        }
      }
    }
    let conString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
    let client = new pg.Client(conString);
    client.connect((err , client , done) => {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }    
      clients[index]=[];
      clients[index++][0]=client;            
      currentDb = client;      
      resolve({reply:'logged in successfully'});
    });    
  })
}

export function connectClient(query ,dbConfig,database ){

  return new Promise((resolve , reject) => {
    
    let pos,rows;
    for(let i=0;i<index;i++){
      if(clients[i][0].connectionParameters.user == dbConfig.user){
        pos = i+1;
      }
    }
    if(!pos){
      let err='Please login first';
      return reject(err);
    }
    if(database == dbConfig.database){
      let err='Database currently in use';
      return reject(err);
    }
    let connections = clients[pos-1];    
    let flag=0;
    connections.forEach((connection,i)=>{
      if(connection.connectionParameters.database == dbConfig.database){
        flag = 1;
        rows = runQuery(connection,query)
        .then(rows => resolve(rows))
        .catch(err => reject(err)); 
      }
      else if(connection.connectionParameters.database == database){
        connection.end();
        connections.splice(i,1);
        clients[pos-1]=connections;
      }
    })
    if(flag == 0){
      let conString = `postgres://${dbConfig.user}:${connections[0].connectionParameters.password}@${connections[0].connectionParameters.host}:${connections[0].connectionParameters.port}/${dbConfig.database}`;
      let client = new pg.Client(conString);
      client.connect((err , client , done) => {
        if(err){
          return reject(err.stack.split('\n')[0]);
        }
        connections.push(client);       
        clients[pos-1]=connections;
        rows = runQuery(client,query)
        .then(rows => resolve(rows))
        .catch(err => reject(err));
      });
    }   
    
  })  
  
}
function runQuery(client,query){
  return new Promise((resolve , reject)=>{
    
    client.query(query,(err , rows)=> {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }
      resolve(rows);
    })
  })
  
}
export function disConnect(user){
  return new Promise((resolve, reject) => {
    let pos, connections;
    if(clients.length == 0){
      return  reject('Please login first');  
    }
    for(let i=0;i<clients.length;i++){ 
      if(clients[i][0].connectionParameters.user == user){
         pos =i+1;
      }
    }
    if(pos){
      connections = clients[pos-1];
      connections.forEach((connection)=> {
        connection.end();
      })
      connections.length = 0;
      clients[pos-1] = connections;
      clients.splice((pos-1),1);
      --index;
      resolve({reply:'logged out '});    
    }    
    else{
      return  reject('Please login first');  
    }
    
  })
}