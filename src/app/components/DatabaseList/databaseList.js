import React, {Component} from 'react';
import DatabaseItem from './databaseItem';
import * as httpUtil from '../../httpUtil';
class DatabaseList extends Component{
  constructor(){
    super();
    this.state = {
      isLoaded:false,
      dbList:[]
    };
  }
  componentWillMount(){
    httpUtil.get(`http://localhost:4553/api?query=select * FROM pg_database where datistemplate=false and datname!='postgres'`,'postgres').then(response => {
      // console.log('adk',response.data);
      this.setState({
        dbList:response.data,
        isLoaded:true
      });
    });
  }

  render(){
    if(this.state.isLoaded===true){
      return(
      <div>
        {
          this.state.dbList.rows.map(dbInfo => {
            return(
              <div key ={dbInfo.datname}>
                <DatabaseItem dbname = {dbInfo.datname}/>
              </div>
            )
          })
        }
      </div>
    );
    }
    else{return null;}
  }
}

export default DatabaseList;