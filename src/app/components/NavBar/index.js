import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import SqlEditor from '../SqlEditor';
import Browse from '../Browse';
import Insert from '../Insert';
import DatabaseOperations from '../DatabaseOperations';
import TableOperations from '../TableOperations';
import Databases from '../Databases';
import TableStructure from '../TableStructure';
import DatabaseStructure from '../DatabaseStructure';
class NavBar extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs bar_tabs">
          {!this.props.currTable && !this.props.currDbname ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/databases`}
              >
                Databases
              </NavLink>
            </li>
          ) : null}
          {this.props.currTable ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/browse`}
              >
                Browse
              </NavLink>
            </li>
          ) : null}
          {this.props.currTable ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/tablestructure`}
              >
                Table Structure
              </NavLink>
            </li>
          ) : null}
          {this.props.currDbname && this.props.currTable === null ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/databasestructure`}
              >
                Database Structure
              </NavLink>
            </li>
          ) : null}
          {this.props.currTable || this.props.currDbname ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/sqleditor`}
              >
                SQL Editor
              </NavLink>
            </li>
          ) : null}
          {this.props.currTable ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/insert`}
              >
                Insert
              </NavLink>
            </li>
          ) : null}
          {this.props.currTable ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/tableoperations`}
              >
                Table Operations
              </NavLink>
            </li>
          ) : null}
          {this.props.currDbname && this.props.currTable === null ? (
            <li>
              <NavLink
                activeClassName="activeNav"
                to={`${this.props.match.url}/databaseoperations`}
              >
                Database Operations
              </NavLink>
            </li>
          ) : null}
        </ul>
        <Route
          path={`${this.props.match.url}/browse`}
          render={() => (
            <Browse
              dbname={this.props.currDbname}
              table={this.props.currTable}
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/tablestructure`}
          render={() => (
            <TableStructure
              currDbname={this.props.currDbname}
              currTable={this.props.currTable}
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/databasestructure`}
          render={() => (
            <DatabaseStructure
              dbname={this.props.currDbname}
              refresh={() => this.props.refresh()}
              onClick={(dbname, table) => {
                this.props.onClick(dbname, table);
              }}
              match={this.props.match}
              history={this.props.history}
              setActiveDbTb={(db,tb) => {this.props.setActiveDbTb(db,tb)}}s
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/sqleditor`}
          component={() => (
            <SqlEditor
              currDbname={this.props.currDbname}
              currTable={this.props.currTable}
              refresh={() => this.props.refresh()}
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/insert`}
          render={() => (
            <Insert
              dbname={this.props.currDbname}
              table={this.props.currTable}
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/databaseoperations`}
          component={() => (
            <DatabaseOperations
              currDbname={this.props.currDbname}
              refresh={() => this.props.refresh()}
            />
          )}
        />
        <Route
          path={`${this.props.match.url}/tableoperations`}
          component={() => (
            <TableOperations
              currDbname={this.props.currDbname}
              currTable={this.props.currTable}
              refresh={() => this.props.refresh()}
            />
          )}
        />
         <Route
          path={`${this.props.match.url}/databases`}
          render={() => (
            <Databases
              refresh={() => this.props.refresh()}
              onClick={(dbname, table) => {
                this.props.onClick(dbname, table);
              }}
              history={this.props.history}
              match={this.props.match}
              setActiveDbTb={(db,tb) => {this.props.setActiveDbTb(db,tb)}}
            />
          )}
        />

      </div>
    );
  }
}

export default NavBar;
