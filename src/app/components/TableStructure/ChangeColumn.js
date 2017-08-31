import React, { Component } from "react";
import * as httpUtil from "../../httpUtil";
class ChangeColumn extends Component {
  constructor() {
    super();
    this.state = {
      column: [],
      textboxValue: null
    };
    this.getColumn = this.getColumn.bind(this);
    this.saveColumn = this.saveColumn.bind(this);
  }

  saveColumn() {
    this.props.setShowChange(false);
  }
  getColumn(columnName) {
    this.setState({ showChange: true });
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
        if (response.data.reply.hasOwnProperty("rows"))
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
                  ""
                ) : (
                  this.state.column.reply.rows.map((row, i) => {
                    return (
                      <tr key={i}>
                        {
                          <td>
                            <input
                              className="form-control text-input"
                              type="text"
                              onChange={e =>
                                this.setState({ textboxValue: e.target.value })}
                              value={
                                this.state.textboxValue === null ? (
                                  row["column_name"]
                                ) : (
                                  this.state.textboxValue
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
