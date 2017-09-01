import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class TableDrop extends Component {
  constructor() {
    super();
    this.state = {
      truncatereply: '',
      truncateerror: '',
      dropreply: '',
      droperror: ''
    };
    this.truncateTable = this.truncateTable.bind(this);
    this.dropTable = this.dropTable.bind(this);
  }
  truncateTable() {
    let data = {
      query: `truncate table ${this.props.currTable}`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          textBoxValue: '',
          truncatereply: response.data.reply,
          truncateerror: '',
          dropreply: '',
          droperror: ''
        });
      })
      .catch(err => {
        this.setState({
          truncatereply: '',
          truncateerror: err.response.data.error.message,
          dropreply: '',
          droperror: ''
        });
      });
  }
  dropTable() {
    let data = {
      query: `drop table ${this.props.currTable}`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          textBoxValue: '',
          truncatereply: '',
          truncateerror: '',
          dropreply: response.data.reply,
          droperror: ''
        });
      })
      .then(() => this.props.refresh())
      .catch(err => {
        this.setState({
          truncatereply: '',
          truncateerror: '',
          dropreply: '',
          droperror: err.response.data.error.message
        });
      });
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="x_panel">
          <div className="x_title">Drop Data/ Table {this.props.currTable}</div>
          <div>
            <input
              type="button"
              className="btn btn-round btn-default"
              value="Drop data (Truncate)"
              onClick={() => this.truncateTable()}
            />
            {this.state.truncatereply}
            {this.state.truncateerror}
            <div className="ln_solid" />
            <input
              type="button"
              className="btn btn-round btn-default"
              value="Drop Table"
              onClick={() => this.dropTable()}
            />
            {this.state.dropreply}
            {this.state.droperror}
          </div>
        </div>
      </div>
    );
  }
}
export default TableDrop;
