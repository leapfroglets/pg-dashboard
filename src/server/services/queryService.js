import { queryCall } from '../dao/queryCall';
import { queryCreate } from '../dao/queryCreate';

export function queryServiceCall(query , database){
  
  return queryCall(query , database);
}
