import * as dao from '../dao/dbCall'

export function dbConnect(dbConfig){
  return new Promise((resolve , reject) => {
    dao.dbConnect(dbConfig)
    .then(reply => resolve(reply))
    .catch(err => {console.log(err)
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
    
    let action = query.split(' ')[0];
    if((query.split(' ')[0].toLowerCase()=='drop' || query.split(' ')[0].toLowerCase()== 'alter') && query.split(' ')[1].toLowerCase() == 'database'){
      let database = query.split(' ')[2];
      if(database[database.length-1] == ';'){
        database = database.split(';')[0];    
      }
      dao.queryCall(query , dbConfig, database )
      .then(reply=>{
        if(action == 'drop'){
          resolve({reply:`database ${action}ped`});
        }
        else if(action == 'alter'){
          resolve({reply:`database ${action}ed`});
        }
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
        
        if(action.toLowerCase() == 'select'){          
          resolve({reply});
        }
        else if(action.toLowerCase() == 'insert'){
          let ans = reply.rowCount;
          ans = `${ans} rows inserted`;
          
          resolve({
            reply:ans
          });
        }
        else if(action.toLowerCase() == 'create'){
          
          let ans = query.split(' ')[1];
          ans = `${ans} created`;          
          resolve({
            reply:ans
          });
        }
        else if(action.toLowerCase() == 'update'){
          let ans =reply.rowCount;
          ans = `${ans} rows updated`;
          resolve({reply:ans});
        }
        else if(action.toLowerCase() == 'update'){
          let ans = query.split(' ')[1];
          ans = `${ans} updated`;
          resolve({reply:ans});
        }
        else if(action.toLowerCase() == 'alter'){
          let ans = query.split(' ')[1];
          ans = `${ans} altered`;
          resolve({reply:ans});
        }
        else if(action.toLowerCase() == 'delete'){          
          let ans = reply.rowCount;
          ans = `${ans} rows deleted`;
          resolve({
            reply:ans
          })
        }
        else if(action.toLowerCase() == 'drop'){
          let ans = query.split(' ')[1];
          ans = `${ans} dropped`;
          resolve({reply:ans});
        }
        else if(action.toLowerCase() == 'truncate'){
          let ans = query.split(' ')[1];
          ans = `${ans} truncated`;
          resolve({reply:ans});
        }
    })
    .catch(err => { console.log(err)
      let errorElement = err.split(' ')[1];
      let error;
      if(errorElement == 'syntax'){console.log(errorElement);
        error={
          status:400,
          message:err
        }
      }
      else if(errorElement == 'duplicate'){console.log(errorElement);
        error={
          status:409,
          message:err
        }
      }
      else if(errorElement == 'column'){
        error={
          status:400,
          message:err
        }
      }
      errorElement = err.split(' ')[0];
      if(errorElement == 'Please'){console.log(errorElement);
        error={
          status:403,
          message:err
        }
      }
      
      errorElement = err.split(' ')[3];
      if(errorElement == 'already'){console.log(errorElement);
        error={
          status:409,
          message:err
        }
      }
      else if(errorElement == 'does'){console.log(errorElement);
        error={
          status:404,
          message:err
        }
      }
      else if(errorElement == 'use'){console.log(errorElement);
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