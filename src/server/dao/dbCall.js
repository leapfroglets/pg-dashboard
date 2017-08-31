import url from 'url';
import * as conn from '../connection';
let client;

export function dbConnect(dbConfig){
  return new Promise((resolve , reject) => {
     conn.firstConnect(dbConfig)
     .then(reply => resolve(reply))
     .catch(err => reject(err));
  })
  
}

export function queryCall(query , dbConfig){
  return new Promise((resolve , reject) => {
    conn.connectClient(query , dbConfig)
      .then(reply =>{
        let action = query.split(' ')[0];
        if(action == 'select'){          
          resolve({reply});
        }
        else if(action == 'insert'){
          let ans = reply.rowCount;
          ans = `${ans} rows inserted`;
          console.log(ans);
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
     })
     .catch(err => reject(err.stack.split('\n')[0]));
  })
  
}

export function logOut(){
  return new Promise((resolve , reject) => {
    conn.disConnect()
    .then(reply => resolve(reply));
  })
}