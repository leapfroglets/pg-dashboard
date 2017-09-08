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
    //console.log(dbConfig);
    let pos;
    for(let i=0;i<index;i++){console.log(clients[i][0].connectionParameters.user, dbConfig.user)
      if(clients[i][0].connectionParameters.user == dbConfig.user){console.log('match user')
        pos = i+1;
      }
    }
    if(!pos){console.log(clients.length , pos);
      let err='Please login first';
      return reject(err);
    }
    if(database == dbConfig.database){
      let err='Database currently in use';
      return reject(err);
    }
    let connections = clients[pos-1];
    
    
    let flag=0;
    connections.forEach((connection)=>{
      if(connection.connectionParameters.database == dbConfig.database){
        flag = 1;console.log('match database')
        currentDb = connection;
      }
    })
    if(flag == 0){
      let conString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
      let client = new pg.Client(conString);
      client.connect((err , client , done) => {
        if(err){
          return reject(err.stack.split('\n')[0]);
        }
        connections.push(client);
        currentDb = client;
        clients[pos-1]=connections;
      });
    }
    currentDb.query(query,(err , rows)=> {
      if(err){
        return reject(err.stack.split('\n')[0]);
      }
      resolve(rows);
    })
    clients[pos]=connections;
  })  
  
}

export function disConnect(user){
  return new Promise((resolve, reject) => {
    let pos, connections;
    if(index<=0){
    return  reject('Please login first');  
    }
    for(let i=0;i<index;i++){ //     console.log(clients[i][0].connectionParameters.user, )
      if(clients[i][0].connectionParameters.user == user){
         pos =i+1;console.log(clients[i][0].connectionParameters.user,'match')
      }
    }
    if(pos){
      connections = clients[pos-1];
    }

    
      connections.forEach((connection)=> {
        connection.end();
      })
      connections.length = 0;
      clients[pos-1] = connections;
      resolve({reply:'logged out '});
    
  })
}