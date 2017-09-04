import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
class NavBreadCrumb extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
  }
  redirect(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        {this.props.currDbname} {this.props.currTable}
        <ol className="breadcrumb">
          <li
            className="point size"
            onClick={() => {
              this.props.onClick(null, null);
              this.redirect('/databases');
            }}
          >
            {window.location.href.split('/')[2]}
          </li>
          {this.props.currDbname != null && (
            <li
              className="point size"
              onClick={() => {
                this.props.onClick(this.props.currDbname, null);
                this.redirect('/databasestructure');
              }}
            >
              {this.props.currDbname}
            </li>
          )}
          {this.props.currTable != null && (
            <li className="size">{this.props.currTable}</li>
          )}
        </ol>
      </div>
    );
  }
}
export default NavBreadCrumb;
