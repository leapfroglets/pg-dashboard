import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
import './style.css';
class NavBreadCrumb extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    httpUtil.get(`http://localhost:4553/api/database/logout`);
  }
  redirect(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <span>
        <ol className="breadcrumb">
          <li
            className="point border"
            onClick={() => {
              this.logOut();
              this.redirect(`/`);
            }}
          >
            <i className="fa fa-sign-out" />Logout
          </li>
          <li
            className="point size"
            onClick={() => {
              this.props.onClick(null, null);
              this.redirect(`${this.props.match.url}/databases`);
            }}
          >
            {window.location.href.split('/')[2]}
          </li>
          {this.props.currDbname != null && (
            <li
              className="point size"
              onClick={() => {
                this.props.onClick(this.props.currDbname, null);
                this.redirect(`${this.props.match.url}/databasestructure`);
              }}
            >
              {this.props.currDbname}
            </li>
          )}
          {this.props.currTable != null && (
            <li className="size">{this.props.currTable}</li>
          )}
        </ol>
      </span>
    );
  }
}
export default NavBreadCrumb;
