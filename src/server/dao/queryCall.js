import url from 'url';
import { connectClient } from '../connection';
let client = connectClient();

export function queryCall(query , database){
  let action = query.split(' ')[0];
  action = action.toLowerCase();
  
  if(action == 'select'){
    return querySelect(query , database);
  }
  else if(action == 'insert'){
    return queryInsert(query , database);
  }   
  else if(action == 'create'){
    return queryCreate(query , database);
  }
  else if(action == 'drop' || action == 'truncate' || action == 'delete'){
    return queryRemove(query , database);
  }
  else if(action == 'update' || action == 'alter'){
    return queryUpdate(query , database);    
  }
}

//Select Queries
function querySelect(query , database){

  return new Promise((resolve , reject) => {
    if(database){
    client = connectClient(database);
    }
    else {
      client =connectClient();
    }
  client.query(query)
  .then(reply => resolve({reply}))
  .catch(err => {
    let error = err.stack.split('\n')[0];
    reject(error)
  });
  })

}

//Insert Queries
function queryInsert(query , database){
  
  return new Promise((resolve , reject) => {
    if(database){
      client = connectClient(database);
    }
    else {
      client =connectClient();
    }

    client.query(query)
    .then(result => {
      let reply =result.rowCount;
      reply = `${reply} rows inserted`;
      resolve({reply});
    })
    .catch(err => {
      let error = err.stack.split('\n')[0];
    reject(error);
    });
  })
}

//Create queries
function queryCreate(query , database){

  return new Promise((resolve , reject) => {
    if(database){
      client = connectClient(database);
    }
    else {
      client =connectClient();
    }

    client.query(query)
    .then(result => {
      let reply = query.split(' ')[1]+' '+query.split(' ')[2];
      reply = `${reply} created`;
      
      resolve({reply});
    })
    .catch(err => {
      let error = err.stack.split('\n')[0];
    reject(error);
    });
  })

}

//Drop / Truncate queries
function queryRemove(query , database){
  return new Promise((resolve , reject) => {
    if(database){
      client = connectClient(database);
    }
    else {
      client =connectClient();
    }
    client.query(query)
    .then(result => {
      let reply = query.split(' ')[1];
      let action = query.split(' ')[0];
      if(action == 'drop'){
        reply = `${reply} dropped`;
      }
      else if(action == 'truncate'){
        reply = `${reply} truncated`;
      }
      else if(action == 'delete'){
        reply = result.rowCount;
        reply = `${reply} rows deleted`;
      }
      resolve({reply});
    })
    .catch(err => {
      let error = err.stack.split('\n')[0];
    reject(error);
    });
  })
}

//Alter and Update queries
function queryUpdate(query , database){
  return new Promise((resolve , reject) => {
    if(database){
      client = connectClient(database);
    }
    else {
      client =connectClient();
    }
    client.query(query)
    .then(result => {
      let reply = query.split(' ')[1];
      let action = query.split(' ')[0];
      if(action == 'alter'){
        reply = `${reply} altered`;
      }
      else if(action == 'update'){
        reply = result.rowCount;
        reply = `${reply} rows updated`;
      }      
      resolve({reply});
    })
    .catch(err => {
      let error = err.stack.split('\n')[0];
    reject(error);
    });
  })
}