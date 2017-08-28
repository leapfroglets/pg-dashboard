import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/SidePanel';
import NavBar from './navBar';
import * as httpUtil from './httpUtil';

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
    console.log("will mount");
  }
  
  render() {
    console.log(this.state.currDbname,"  ",this.state.currTable);
    return (
      <div className="App">
        <div className = "col-md-3 left-container">
          <SidePanel onClick={(dbname,table) => {this.handleClick(dbname,table)}} history={this.props.history}/>
        </div>
             <div className = "col-md-9 right-container"><NavBar currDbname={this.state.currDbname} currTable={this.state.currTable} match={this.props.match}/></div>     
      </div>
    );
  }
}

export default App;
