import { connectClient } from '../connection';
let client = connectClient();

export function queryCreate(query , database){
  return new Promise ((resolve , reject) => {
    if(database){
     client = connectClient(database);
    }
    else{
      client = connectClient();
    }
    let action = query.split(' ')[0];
    let element = query.split(' ')[1];
    
    let reply;
    client.query(query)
    .then(elements => {
      if(action == 'create' ){
        reply = `${element} ${action}d`;       
        resolve({reply});
        
      }
      else if(action == 'insert'){
        reply = elements.rowCount;
        reply = `${reply} rows added`;
        resolve(reply);
      }

    })
    .catch(err => {      
      reject(err.stack.split('\n')[0]);
    });
  })
}