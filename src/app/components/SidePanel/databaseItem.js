import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';

class DatabaseItem extends Component {
  constructor() {
    super();
    this.state = {
      tabList: [],
      plusIsNext: true,
      isLoaded: false
    };
    this.refreshDataItem = this.refreshDataItem.bind(this);
  }
  refreshDataItem() {
    let data = {
      query:
        "select * FROM information_schema.tables WHERE table_schema='public'",
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          tabList: response.data.reply.rows,
          isLoaded: true
        });
      });
  }
  componentWillMount() {
    let data = {
      query:
        "select * FROM information_schema.tables WHERE table_schema='public'",
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        console.log("tables",response.data);
        this.setState({
          tabList: response.data.reply.rows,
          isLoaded: true
        });
      });
  }
  showTables() {
    let element = document.getElementById(this.props.dbname);
    if (this.state.plusIsNext) {
      element.style.display = 'block';
      this.setState({
        plusIsNext: false
      });
    } else {
      element.style.display = 'none';
      this.setState({
        plusIsNext: true
      });
    }
  }
  redirect(path) {
    this.props.history.push(path);
  }
  render() {
    if (this.state.isLoaded === true) {
      let sign = this.state.plusIsNext ? '+' : '-';
      return (
        <li key={this.props.dbname}>
          <button
            onClick={() => {
              this.showTables();
            }}
          >
            {sign}
          </button>
          <a
            onClick={() => {
              this.props.onClick(this.props.dbname, null);
              this.redirect('/sqleditor');
            }}
          >
            <i className="fa fa-home" />
            {this.props.dbname}
          </a>
          <ul id={this.props.dbname} className="nav child_menu">
            {this.state.tabList.map(table => {
              return (
                <li key={table.table_name}>
                  <a
                    onClick={() => {
                      this.props.onClick(this.props.dbname, table.table_name);
                      this.redirect('/browse');
                    }}
                  >
                    {table.table_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      );
    } else {
      return null;
    }
  }
}

export default DatabaseItem;
