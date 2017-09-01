import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class DropDatabase extends Component {
  constructor() {
    super();
    this.state = {
      textBoxValue: '',
      reply: '',
      error: ''
    };
    this.dropDatabase = this.dropDatabase.bind(this);
  }
  dropDatabase() {
    let data = {
      query: `drop database ${this.props.currDbname}`,
      dbname: 'postgres'
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          textBoxValue: '',
          reply: response.data.reply,
          error: ''
        });
      })
      .then(() => this.props.refresh())
      .catch(err => {
        this.setState({ reply: '', error: err.response.data.error.message });
      });
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="x_panel">
          <div className="x_title">Drop {this.props.currDbname} to</div>
          <div>
            {this.state.reply}
            {this.state.error}
          </div>
          <input
            type="button"
            className="btn btn-round btn-default"
            value="Drop database"
            onClick={() => this.dropDatabase()}
          />
        </div>
      </div>
    );
  }
}
export default DropDatabase;
