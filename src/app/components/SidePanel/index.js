import React, { Component } from 'react';
import DatabaseList from './databaseList';
import './style.css';
import { NavLink } from 'react-router-dom';

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      dbList:[]
    }
    this.refreshSidePanel = this.refreshSidePanel.bind(this);
  }
  refreshSidePanel() {
    this.refs.child1.refreshDatabaseList();
  }

  setDblist(dbList){
    this.setState({
      dbList:dbList
    })
  }

  collapseAll(dbList){
    dbList.map(db => {
      let ele = document.getElementById(db.datname+"_tblist");
      ele.style.display="none";
      this.refs.child1.resetSign();
    })
  }

  render() {
    return (
      <div className="">
        <NavLink to="/dashboard/databases">
          <div
            className="app-title-wrapper"
            style={{ border: 0 }}
            onClick={() => {
              this.props.onClick(null, null);
              this.collapseAll(this.state.dbList); 
            }}
          >
            
            <img src="/images/logo-white.png" alt="logo" className="logo" />
            <span className="pg-title">PG Dashboard</span>
            
          </div>
        </NavLink>
        <div className="side-panel">
          <DatabaseList
            ref="child1"
            onClick={(dbname, table) => {
              this.props.onClick(dbname, table);
            }}
            setActiveDb={(db_id,listOfDb,tb_id,listOfTb) => {this.props.setActiveDb(db_id,listOfDb,tb_id,listOfTb)}}
            history={this.props.history}
            setDblist={(dbList) => {this.setDblist(dbList)}}
          />
        </div>
      </div>
    );
  }
}

export default SidePanel;
