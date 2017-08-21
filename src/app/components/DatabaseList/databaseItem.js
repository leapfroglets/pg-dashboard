import React, {Component} from 'react';
import * as httpUtil from '../../httpUtil';

class DatabaseItem extends Component{
  constructor(){
    super();
    this.state = {
      tabList : [],
      plusIsNext : true,
      isLoaded: false
    };
  }

  flagOn(){
    this.setState({
      plusIsNext:!this.state.plusIsNext
    });
  }
  componentWillMount(){
    console.log("TABLES");
    let data ={
      query:"select * FROM information_schema.tables WHERE table_schema='public'",
      dbname:this.props.dbname
    };
    httpUtil.post(`http://localhost:4553/api/queries`,data).then(response => {
      console.log("items",response.data.reply.rows);
      this.setState({
        tabList:response.data.reply.rows,
        isLoaded:true
      })
    });
  }
  showTables(){
    let element = document.getElementById(this.props.dbname);
    if(this.state.plusIsNext){
      element.style.display = "block";
      this.setState({
          plusIsNext:false
        })
    }
    else{
      element.style.display = "none";
      this.setState({
          plusIsNext:true
        })
      console.log(this.state.tabList);
    }
    //this.flagOn();
  }
  render(){
    if(this.state.isLoaded === true){
      let sign = this.state.plusIsNext ? '+':'-';
      return(
        <li key ={this.props.dbname} >
          <button onClick ={() => {this.showTables()}}>{sign}</button> 
          <a><i className="fa fa-home"></i>{this.props.dbname}</a>
          <ul id = {this.props.dbname} className="nav child_menu">
            {this.state.tabList.map(table => {
              return(
                <li key = {table.table_name}><a href="index.html">{table.table_name}</a></li>
              );
            })}
          </ul>
        </li>
    );
    }
    else{return null;}
    
  }
}

export default DatabaseItem;
