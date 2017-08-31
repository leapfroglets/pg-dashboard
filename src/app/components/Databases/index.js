import React, { Component } from "react";
import * as httpUtil from "../../httpUtil";
import CreateDatabase from "../CreateDatabase";

class Databases extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      dbList: []
    };
  }
  componentWillMount() {
    let data = {
      query:
        "select * FROM pg_database where datistemplate=false and datname!='postgres'",
      dbname: "postgres"
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          dbList: response.data.reply.rows,
          isLoaded: true
        });
      });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Databases</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dbList.map(db => {
              return (
                <tr key={db.datname}>
                  <td>{db.datname}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <CreateDatabase />
      </div>
    );
  }
}

export default Databases;
