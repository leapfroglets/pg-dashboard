import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class ChangeColumn extends Component {
  constructor() {
    super();
    this.state = {
      column: [],
      textboxNameValue: null,
      textboxTypeValue: null,
      isNullableValue: null,
      textboxLengthValue: null
    };
    this.getColumn = this.getColumn.bind(this);
    this.saveColumn = this.saveColumn.bind(this);
    this.changeCheckBoxValue = this.changeCheckBoxValue.bind(this);
  }
  changeCheckBoxValue(e) {
    this.setState({ isNullableValue: e.target.value });
  }
  saveColumn() {
    let query1 = 'alter TABLE ' + this.props.currTable;
    let query2 = '';
    let query3 = '';
    if (this.state.isNullableValue !== null) {
      if (this.state.isNullableValue === 'YES')
        query2 = ` ALTER COLUMN ${this.props.column} DROP NOT NULL`;
      else if (this.state.isNullableValue === 'NO')
        query2 = ` ALTER COLUMN ${this.props.column} SET NOT NULL`;
    }
    query3 += ' alter COLUMN ' + this.props.column + ' TYPE ';
    let datatype =
      this.state.textboxTypeValue === null
        ? document.getElementById('tbDataType').value
        : this.state.textboxTypeValue;
    let length =
      this.state.textboxLengthValue === null ||
      this.state.textboxLengthValue === 0 ||
      this.state.textboxLengthValue === 'int4'
        ? ''
        : '(' + this.state.textboxLengthValue + ')';
    query3 += datatype + length;

    if (query3 !== '' && query2 !== '') query2 += ' , ';

    if (query2 === '' && query3 === '') query1 = '';
    console.log('query=' + query1 + query2 + query3);
    let data = {
      query: query1 + query2 + query3,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {})
      .then(this.props.refreshData())
    this.props.setShowChange(false);
    
  }
  getColumn(columnName) {
    let data = {
      query: `select column_name,udt_name,is_nullable,character_maximum_length
       FROM information_schema.columns WHERE table_name= '${this.props
         .currTable}' and 
       column_name='${this.props.column}'`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        if (response.data.reply.hasOwnProperty('rows'))
          this.setState({ column: response.data });
      });
  }
  componentWillMount() {
    this.getColumn(this.props.column);
  }
  render() {
    return (
      <div>
        {
          <div className="x_panel">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Is_Nullable</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {this.state.column.reply === undefined ? (
                  ''
                ) : (
                  this.state.column.reply.rows.map((row, i) => {
                    return (
                      <tr key={i}>
                        {<td>{row['column_name']}</td>}
                        {
                          <td>
                            <input
                              id="tbDataType"
                              className="form-control text-input"
                              type="text"
                              onChange={e =>
                                this.setState({
                                  textboxTypeValue: e.target.value
                                })}
                              value={
                                this.state.textboxTypeValue === null ? (
                                  row['udt_name']
                                ) : (
                                  this.state.textboxTypeValue
                                )
                              }
                            />
                          </td>
                        }
                        {
                          <td>
                            <select
                              className="form-control"
                              onChange={e => this.changeCheckBoxValue(e)}
                            >
                              <option
                                value="YES"
                                selected={
                                  row['is_nullable'] === 'YES' ? 'selected' : ''
                                }
                              >
                                YES
                              </option>
                              <option
                                value="NO"
                                selected={
                                  row['is_nullable'] === 'NO' ? 'selected' : ''
                                }
                              >
                                NO
                              </option>
                            </select>
                          </td>
                        }
                        {
                          <td>
                            <input
                              className="form-control text-input"
                              type="text"
                              onChange={e =>
                                this.setState({
                                  textboxLengthValue: e.target.value
                                })}
                              value={
                                this.state.textboxLengthValue === null ? (
                                  row['character_maximum_length']
                                ) : (
                                  this.state.textboxLengthValue
                                )
                              }
                            />
                          </td>
                        }
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <button
              className="btn btn-round btn-default"
              onClick={() => this.saveColumn()}
            >
              Save
            </button>
          </div>
        }
      </div>
    );
  }
}
export default ChangeColumn;
