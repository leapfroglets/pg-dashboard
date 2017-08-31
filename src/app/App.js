import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/DatabaseList';
import NavBar from './components/NavBar';
import * as httpUtil from './httpUtil'

class App extends Component {
  constructor(){
    super();
    this.state = {
      currDbname:null,
      currTable:null
    };
  }

  handleClick(dbName, table){
    // console.log(dbName,table);
    this.setState({
      currDbname:dbName,
      currTable:table
    })
  }

  componentWillMount(){
    let data = {
      user: "postgres",
      password: "nirmala"
    };
    httpUtil.post(`http://localhost:4553/api/database/login`, data);
  }
  render() {
    return (
      <div className="App">
        <div className = "left_container clearfix">
          <SidePanel onClick={(dbname,table) => {this.handleClick(dbname,table)}}/>
        </div>
        <div className = "right_container clearfix"><NavBar currDbname={this.state.currDbname} currTable={this.state.currTable}/></div>
      </div>
    );
  }
}

export default App;
