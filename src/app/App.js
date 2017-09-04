import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/SidePanel';
import NavBar from './components/NavBar';
import NavBreadCrumb from './components/NavBreadCrumb';
import * as httpUtil from './httpUtil';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currDbname: null,
      currTable: null
    };
  }

  handleClick(dbName, table) {
    this.setState({
      currDbname: dbName,
      currTable: table
    });
  }

  componentWillMount() {
    let data = {
      user: 'postgres',
      password: '12345678'
    };
    httpUtil.post(`http://localhost:4553/api/database/login`, data);
  }

  render() {
    return (
      <div className="App">
        <div className="col-md-3 left-container">
          <SidePanel
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            ref="side"
            history={this.props.obj.history}
          />
        </div>
        <div className="col-md-9 right-container">
          <NavBreadCrumb
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            history={this.props.obj.history}
          />
          <NavBar
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.obj.match}
            refresh={() => this.refs.side.refreshSidePanel()}
          />
        </div>
      </div>
    );
  }
}

export default App;
