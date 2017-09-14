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
    let action = query.split(' ')[0];
    if((query.split(' ')[0].toLowerCase()=='drop' || query.split(' ')[0].toLowerCase()== 'alter') && query.split(' ')[1].toLowerCase() == 'database'){
      let database = query.split(' ')[2];
      if(database[database.length-1] == ';'){
        database = database.split(';')[0];    
      }
      dao.queryCall(query , dbConfig, database )
      .then(reply=>{
        resolve({reply:`database ${action}ed`});
      })
      .catch(err=> {
        let error = returnError(err);
        reject(error)});
    }
    else{
      dao.queryCall(query , dbConfig)
    .then(res => {
      let reply = returnReply(action , res, query);
      resolve({reply});
        
    })
    .catch(err => { 
      let error = returnError(err);
      reject(error);
    });
    }
    
  })
   
}

function returnReply(action ,reply, query){
  let ans;
  switch(action.toLowerCase())
  {
    case ('select'):
    return reply;
    break;
    
    case ('insert'):
    ans = reply.rowCount;
    ans = `${ans} rows inserted`;          
    return ans;
    break;

    case ('create'):
    ans = query.split(' ')[1];
    ans = `${ans} created`;          
    return ans;
    break;

    case ('alter'):
    ans = query.split(' ')[1];
    ans = `${ans} altered`;
    return ans;
    break;

    case ('update'):
    ans =reply.rowCount;
    ans = `${ans} rows updated`;
    return ans;
    break;

    case ('drop'):
    ans = query.split(' ')[1];
    ans = `${ans} dropped`;
    return ans;
    break;

    case ('delete'):
    ans = reply.rowCount;
    ans = `${ans} rows deleted`;
    return ans;
    break;

    case ('truncate'):
    ans = query.split(' ')[1];
    ans = `${ans} truncated`;
    return ans;
    break;
    
  }
}

function returnError(err){
  let errorElement = err.split(' ')[1];
  let error = err;
  if(errorElement == 'syntax'){
    error={
      status:400,
      message:err
    }
  }
  else if(errorElement == 'duplicate'){
    error={
      status:409,
      message:err
    }
  }
  else if(errorElement == 'column'){
    error={
      status:409,
      message:err
    }
  }
  else if(errorElement == 'database'){//For unauthorized users
    error={
      status:401,
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
  else if(errorElement == 'Please'){
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
  return(error);
}

export function logOut(user){
  return new Promise((resolve , reject) => {
    dao.logOut(user) 
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