import React, { Component } from 'react';
import DatabaseList from './databaseList';
import './style.css';
import { NavLink } from 'react-router-dom';

class SidePanel extends Component {
  constructor() {
    super();
    this.refreshSidePanel = this.refreshSidePanel.bind(this);
  }
  refreshSidePanel() {
    this.refs.child1.refreshDatabaseList();
  }
  render() {
    return (
      <div className="">
        <div
          className="app-title-wrapper"
          style={{ border: 0 }}
          onClick={() => {
            this.props.onClick(null, null);
          }}
        >
          <NavLink to="/dashboard/databases">
            <img src="/images/logo-white.png" alt="logo" className="logo" />
            <span className="pg-title">PG Dashboard</span>
          </NavLink>
        </div>
        <div className="side-panel">
          <h3 className="text-primary-color">Databases</h3>
          <DatabaseList
            ref="child1"
            onClick={(dbname, table) => {
              this.props.onClick(dbname, table);
            }}
            setActiveDb={(db_id,listOfDb,tb_id,listOfTb) => {this.props.setActiveDb(db_id,listOfDb,tb_id,listOfTb)}}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

export default SidePanel;
