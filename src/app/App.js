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
      currTable: null, 
    };
  }

  handleClick(dbName, table) {
    this.setState({
      currDbname: dbName,
      currTable: table
    });
  }

  render() {
    return (
      <div className="App">
        <div className="col-md-2 left-container">
          <SidePanel
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            ref="side"
            history={this.props.obj.history}
          />
        </div>
        <div className="col-md-10 right-container">
          <NavBreadCrumb
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.obj.match}
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            changeState={(value)=>{this.props.changeState(value)}}
            history={this.props.obj.history}
            setActiveDbTb={(db,tb) => {this.refs.side.setActiveDbTb(db,tb)}}
          />
          <NavBar
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.obj.match}
            refresh={() => this.refs.side.refreshSidePanel()}
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            history={this.props.obj.history}
            setActiveDbTb={(db,tb) => {this.refs.side.setActiveDbTb(db,tb)}}
          />
        </div>
      </div>
    );
  }
}

export default App;
