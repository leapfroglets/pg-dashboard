import React, { Component } from "react";
import * as httpUtil from "../../httpUtil";
import ChangeColumn from "./ChangeColumn";
import "./style.css";
class TableStructure extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      reply: null,
      showChange: false,
      columnName: ""
    };
    this.dropColumn = this.dropColumn.bind(this);
    this.getResult = this.getResult.bind(this);
    this.setShowChange = this.setShowChange.bind(this);
  }
  dropColumn(columnName) {
    console.log(
      `alter table ${this.props.currTable} drop column ${columnName}`
    );
    let data = {
      query: `alter table ${this.props.currTable} drop column ${columnName}`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({ reply: response.data.reply });
      })
      .then(this.getResult());
  }
  setShowChange(value) {
    this.setState({ showChange: value });
  }
  changeColumn(column) {
    this.setState({ showChange: true, columnName: column });
  }
  getResult() {
    let data = {
      query: `select column_name,udt_name,is_nullable,character_maximum_length
       FROM information_schema.columns WHERE table_name= '${this.props
         .currTable}'`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        if (response.data.reply.hasOwnProperty("rows"))
          this.setState({ result: response.data });
      });
  }
  componentWillMount() {
    this.getResult();
  }
  render() {
    return (
      <div className="col-md-12">
        <div className="x_panel">
          <div className="reply">{this.state.reply}</div>
          <div>
            <h2>Table Structure</h2>
          </div>
          <div className="x_content">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Is_Nullable</th>
                  <th>Length</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.result.reply === undefined ? (
                  ""
                ) : (
                  this.state.result.reply.rows.map((row, i) => {
                    return (
                      <tr key={i}>
                        {this.state.result.reply.fields.map((field, j) => {
                          return <td key={j}>{row[field.name]}</td>;
                        })}
                        <td>
                          <button
                            className="btn btn-round btn-sm btn-default"
                            onClick={() => this.dropColumn(row["column_name"])}
                          >
                            Drop
                          </button>
                          <button
                            className="btn btn-round btn-sm btn-default"
                            onClick={() =>
                              this.changeColumn(row["column_name"])}
                          >
                            Change
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.showChange && (
          <ChangeColumn
            column={this.state.columnName}
            setShowChange={v => this.setShowChange(v)}
            currDbname={this.props.currDbname}
            currTable={this.props.currTable}
          />
        )}
      </div>
    );
  }
}
export default TableStructure;
