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
    let data ={
      query:"select * FROM pg_database where datistemplate=false and datname!='postgres'",
      dbname:"postgres"
    };
    httpUtil.post(`http://localhost:4553/api/database/queries`,data).then(response => {
      this.setState({
        dbList:response.data.reply.rows,
        isLoaded:true
      });
    });
  }

  render(){
    if(this.state.isLoaded===true){
      return(
      <ul className="nav side-menu">
        {
          this.state.dbList.map(dbInfo => {
            return(
              <DatabaseItem dbname = {dbInfo.datname} key = {dbInfo.datname}
              onClick = {(dbname,table) => {this.props.onClick(dbname,table)}}/>
            )
          })
        }
      </ul>
    );
    }
    else{return null;}
  }
}

export default DatabaseList;
