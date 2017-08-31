import React, { Component } from "react";
import * as httpUtil from "../../httpUtil";

class Insert extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
      textBoxValue: {},
      reply: "",
      error: ""
    };
    this.obj = {};
  }
  componentWillMount() {
    let data = {
      query: `select column_name,udt_name,character_maximum_length from information_schema.columns where table_name='${this
        .props.table}'`,
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          fields: response.data.reply.rows
        });
      });
  }
  insertData() {
    let columns = "";
    let values = "";
    let value = "";
    let regex = /^[0-9]*$/;
    let emptyObject = {};
    this.state.fields.map(field => {
      columns = columns + field.column_name + ",";
      value = this.state.textBoxValue[field.column_name]
        ? this.state.textBoxValue[field.column_name]
        : "null";
      values =
        value.match(regex) || value === "null"
          ? values + value + ","
          : values + `'` + value + `'` + ",";
      emptyObject[field.column_name] = "";
    });
    columns = columns.slice(0, columns.length - 1);
    values = values.slice(0, values.length - 1);
    let data = {
      query: `insert into ${this.props.table}(${columns}) values(${values})`,
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          textBoxValue: emptyObject,
          reply: response.data.reply,
          error: ""
        });
      })
      .catch(err => {
        this.setState({ reply: "", error: err.response.data.error.message });
      });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Column</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fields.map(field => {
              return (
                <tr key={field.column_name}>
                  <td>{field.column_name}</td>
                  <td>
                    {field.udt_name}({field.character_maximum_length})
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Value"
                      value={
                        this.state.textBoxValue[field.column_name] ? (
                          this.state.textBoxValue[field.column_name]
                        ) : (
                          ""
                        )
                      }
                      onChange={e => {
                        this.obj[field.column_name] = e.target.value;
                        this.setState({ textBoxValue: this.obj });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td />
              <td />
              <td>
                <input
                  type="button"
                  className="btn btn-round btn-default"
                  value="go"
                  onClick={() => {
                    this.insertData();
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.reply}
        {this.state.error}
      </div>
    );
  }
}

export default Insert;
