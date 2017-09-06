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
    console.log("here")
    return (
      <div className="">
        <div
          className=""
          style={{ border: 0 }}
          onClick={() => {
            this.props.onClick(null, null);
          }}
        >
          <NavLink to="/dashboard/databases">
            <img src="/images/logo2.png" alt="logo" className="logo" />
            <span className="pg-title">PG Dashboard</span>
          </NavLink>
        </div>

        {/* <div className="clearfix" /> */}

        {/* <br /> */}

        <div
          id=""
          className=""
        >
          <div className="">
            <h3>Databases</h3>
            <DatabaseList
              ref="child1"
              onClick={(dbname, table) => {
                this.props.onClick(dbname, table);
              }}
              history={this.props.history}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SidePanel;
