import pg from 'pg';
import db from './.env';

export function connectClient(database){

  let user=db.user;
  let password=db.pass;
  let port=db.port;
  let host=db.host;
  let dbname=database || db.dbname;

  const connectionString=`postgres://${user}:${password}@${host}:${port}/${dbname}`;

  const client=new pg.Client(connectionString);

  client.connect();
return client;
}

