import React, { Component } from "react";
import SqlEditor from "./components/SqlEditor";
import SidePanel from "./components/SidePanel";
import NavBar from "./components/NavBar";
import * as httpUtil from "./httpUtil";
import NavBreadCrumb from './components/NavBreadCrumb';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currDbname: null,
      currTable: null
    };
  }

  handleClick(dbName, table) {
    // console.log(dbName,table);
    this.setState({
      currDbname: dbName,
      currTable: table
    });
  }

  componentWillMount() {
    let data = {
      user: "postgres",
      password: "pdnejoh"
    };
    httpUtil.post(`http://localhost:4553/api/database/login`, data);
  }

  render() {console.log(this.props)
    return (
      <div className="App">
        <div className="col-md-3 left-container">
          <SidePanel
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            history={this.props.history}
          />
        </div>
        <div className="col-md-9 right-container">
          <NavBreadCrumb 
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
          />
          <NavBar
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.match}
          />
        </div>
      </div>
    );
  }
}

export default App;
