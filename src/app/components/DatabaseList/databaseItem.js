import React, {Component} from 'react';
import * as httpUtil from '../../httpUtil';

class DatabaseItem extends Component{
  constructor(){
    super();
    this.state = {
      tabList : [],
      plusIsNext : true
    };
  }

  showTables(){
    if(this.state.plusIsNext){
      console.log('yuhuhuhuhu');
      httpUtil.get(`http://localhost:4553/api?query=select * FROM information_schema.tables WHERE table_schema='public'`,this.props.dbname).then(response => {
        console.log('adk',response.data.rows);
        this.setState({
          tabList:response.data.rows,
          plusIsNext:false
        })
      });
    }
    else{
      console.log('yadayadayaaa');
      let arr = [];
      this.setState({
          tabList:[],
          plusIsNext:true
        })
      console.log('adk',this.state.tabList);
    }
  }
  render(){
    let sign = this.state.plusIsNext ? '+':'-';
    return(
      <div key ={this.props.dbname} >
        <button onClick ={() => {this.showTables()}}>{sign}</button><a>{this.props.dbname}</a>
        {this.state.tabList.map(table => {
          return(
            <div key = {table.table_name}>{table.table_name}</div>
          );
        })}
      </div>
    );
  }
}

export default DatabaseItem;

