import React, { Component } from "react";
import DatabaseList from "./databaseList";
import "./style.css";
import { NavLink } from "react-router-dom";

class SidePanel extends Component {
  constructor(){
    super();
    this.refreshSidePanel=this.refreshSidePanel.bind(this);
  }
  refreshSidePanel(){
    console.log( 'refreshSidePanel');
    this.refs.child1.refreshDatabaseList();
  }
  render() {
    return (
      <div className="left_col scroll-view">
        <div
          className="navbar nav_title"
          style={{ border: 0 }}
          onClick={() => {
            this.props.onClick(null, null);
          }}
        >
          <NavLink to="/databases">
            <img src="images/logo2.png" alt="logo" className="logo" />
            <span className="pg-title">PG admin</span>
          </NavLink>
        </div>

        <div className="clearfix" />

        <br />

        <div
          id="sidebar-menu"
          className="main_menu_side hidden-print main_menu"
        >
          <div className="menu_section">
            <h3>Databases</h3>
            <DatabaseList ref='child1'
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
