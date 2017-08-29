import * as dao from '../dao/dbCall'

export function dbConnect(dbConfig){
  return new Promise((resolve , reject) => {
    dao.dbConnect(dbConfig)
    .then(reply => resolve(reply))
    .catch(err => {
      let error={
          status:401,
          message:err
        }
      reject(error);
    })
    ;
  })
  
}

export function queryCall(query , dbConfig){
  return new Promise((resolve , reject) => {
    query = query.toLowerCase();
    let action = query.split(' ')[0];
    if((query.split(' ')[0]=='drop' || query.split(' ')[0]== 'alter') && query.split(' ')[1] == 'database'){
      dao.queryCall(query , dbConfig, query.split(' ')[2] )
      .then(reply=>{
        resolve({reply:`database ${action}ed`});
      })
      .catch(err=> {
        let error={
          status:409,
          message:err
        }
        reject(error)});
    }
    else{
      dao.queryCall(query , dbConfig)
    .then(reply => {
        
        if(action == 'select'){          
          resolve({reply});
        }
        else if(action == 'insert'){
          let ans = reply.rowCount;
          ans = `${ans} rows inserted`;
          
          resolve({
            reply:ans
          });
        }
        else if(action == 'create'){
          
          let ans = query.split(' ')[1];
          ans = `${ans} created`;          
          resolve({
            reply:ans
          });
        }
        else if(action == 'update'){
          let ans =reply.rowCount;
          ans = `${ans} rows updated`;
          resolve({reply:ans});
        }
        else if(action == 'update'){
          let ans = query.split(' ')[1];
          ans = `${ans} updated`;
          resolve({reply:ans});
        }
        else if(action == 'alter'){
          let ans = query.split(' ')[1];
          ans = `${ans} altered`;
          resolve({reply:ans});
        }
        else if(action == 'delete'){          
          let ans = reply.rowCount;
          ans = `${ans} rows deleted`;
          resolve({
            reply:ans
          })
        }
        else if(action == 'drop'){
          let ans = query.split(' ')[1];
          ans = `${ans} dropped`;
          resolve({reply:ans});
        }
        else if(action == 'truncate'){
          let ans = query.split(' ')[1];
          ans = `${ans} truncated`;
          resolve({reply:ans});
        }
    })
    .catch(err => { 
      let errorElement = err.split(' ')[1];
      let error;
      if(errorElement == 'syntax'){
        error={
          status:400,
          message:err
        }
      }
      errorElement = err.split(' ')[0];
      if(errorElement == 'Please'){
        error={
          status:403,
          message:err
        }
      }
      errorElement = err.split(' ')[3];
      if(errorElement == 'already'){
        error={
          status:409,
          message:err
        }
      }
      else if(errorElement == 'does'){
        error={
          status:404,
          message:err
        }
      }
      else if(errorElement == 'use'){
        error={
          status:409,
          message:err
        }
      }
      reject(error);
    });
    }
    
  })
   
}

export function logOut(){
  return new Promise((resolve , reject) => {
    dao.logOut() 
    .then(reply => resolve(reply))
    .catch(err => {
      let error={
          status:403,
          message:err
        }
      reject(error);
    });    
  })
}