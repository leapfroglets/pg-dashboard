import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class RenameDatabase extends Component {
  constructor() {
    super();
    this.state = {
      textBoxValue: '',
      reply: '',
      error: ''
    };
    this.renameDatabase = this.renameDatabase.bind(this);
  }
  renameDatabase() {
    if (this.state.textBoxValue !== '') {
      let data = {
        query: `alter database ${this.props.currDbname} rename to ${this.state
          .textBoxValue};`,
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
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="x_panel">
          <div className="x_title">Rename {this.props.currDbname} to</div>
          <div>
            <input
              type="text"
              className="form-control"
              id="dbName"
              placeholder="New Database"
              value={this.state.textBoxValue}
              onChange={e => this.setState({ textBoxValue: e.target.value })}
            />
            {this.state.reply}
            {this.state.error}
          </div>
          <div className="ln_solid" />
          <input
            type="button"
            className="btn btn-round btn-default"
            value="Rename"
            onClick={() => this.renameDatabase()}
          />
        </div>
      </div>
    );
  }
}
export default RenameDatabase;
