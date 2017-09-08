import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';

class AddColumns extends Component {
  constructor() {
    super();
    this.state = {
      tableName: '',
      values: [],
      error: '',
      reply: ''
    };
    this.tempObjs = [];
  }

  componentWillMount() {
    this.resetValues();
  }

  resetValues() {
    this.tempObjs = [];
    for (let i = 0; i < parseInt(this.props.columns); i++) {
      this.tempObjs.push({
        columnName: '',
        dataType: 'int',
        length: '',
        primaryKey: 'false',
        nullValue: 'null'
      });
    }
    this.setState({
      tableName: this.props.tableName,
      values: this.tempObjs
    });
  }

  setValues(e, i, field) {
    this.tempObjs[i][field] = e.target.value;
    this.setState({
      values: this.tempObjs
    });
  }

  createTable() {
    let concatValues = '';
    let flag = 0;
    let primaryKeyString = '';
    this.state.values.map(value => {
      let nullString = '';
      let lengthString = '';
      if (value['nullValue'] === 'not null') {
        nullString = ' not null';
      }
      if (value['dataType'] === 'varchar') {
        lengthString = `(${value['length']})`;
      }
      concatValues =
        concatValues +
        `${value['columnName']} ${value[
          'dataType'
        ]}${lengthString}${nullString},`;
      if (value['primaryKey'] === 'true') {
        primaryKeyString = primaryKeyString + `${value['columnName']},`;
        flag = 1;
      }
    });
    if (flag) {
      concatValues =
        concatValues +
        `primary key(${primaryKeyString.slice(
          0,
          primaryKeyString.length - 1
        )})`;
    } else {
      concatValues = concatValues.slice(0, concatValues.length - 1);
    }
    let data = {
      query: `create table ${this.state.tableName}(${concatValues})`,
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          reply: response.data.reply,
          error: ''
        });
        this.resetValues();
        this.props.refresh();
        this.props.refreshStructure();
        this.props.unmount();
      })
      .catch(err => {
        this.setState({
          reply: '',
          error: err.response.data.error.message
        });
      });
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Data Type</th>
            <th>Length</th>
            <th>Primary Key</th>
            <th>Null</th>
          </tr>
        </thead>
        <tbody>
          {this.tempObjs.map((obj, i) => {
            return (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.values[i]['columnName']}
                    onChange={e => {
                      this.setValues(e, i, 'columnName');
                    }}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    defaultValue="int"
                    onChange={e => {
                      this.setValues(e, i, 'dataType');
                    }}
                  >
                    <option value="int">INT</option>
                    <option value="varchar">VARCHAR</option>
                    <option value="text">TEXT</option>
                    <option value="timestamp">TIMESTAMP</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.values[i]['length']}
                    onChange={e => {
                      this.setValues(e, i, 'length');
                    }}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    defaultValue="false"
                    onChange={e => {
                      this.setValues(e, i, 'primaryKey');
                    }}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-control"
                    defaultValue=""
                    onChange={e => {
                      this.setValues(e, i, 'nullValue');
                    }}
                  >
                    <option value="">NULL</option>
                    <option value="not null">NOT NULL</option>
                  </select>
                </td>
              </tr>
            );
          })}
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td>
              <input
                type="button"
                className="btn btn-round btn-default"
                value="Go"
                onClick={() => {
                  this.createTable();
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AddColumns;
