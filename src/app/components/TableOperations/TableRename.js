import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class TableRename extends Component {
  constructor() {
    super();
    this.state = {
      textBoxValue: '',
      reply: '',
      error: ''
    };
  }
  renameTable() {
    if (this.state.textBoxValue !== '') {
      console.log(`alter table ${this.props.currTable} rename to ${this.state.textBoxValue}`);
      let data = {
        query: `alter table ${this.props.currTable} rename to ${this.state.textBoxValue}`,
        "dbname": this.props.currDbname
      };
      httpUtil.post(`http://localhost:4553/api/database/queries`, data)
        .then(response => {
          this.setState({ textBoxValue: '', reply: response.data.reply, error: '' })
        })
        .catch(err => {
          this.setState({ reply: '', error: err.response.data.error.message })
        });
    }

  }
  render() {
    return (
      <div className='col-md-4'>
        <div className='x_panel'>
          <div className='x_title'>Rename {this.props.currTable} to</div>
          <div>
            <input type='text' className='form-control' placeholder='New Table Name'
              value={this.state.textBoxValue}
              onChange={(e) => this.setState({ textBoxValue: e.target.value })}
            />
            {this.state.reply}
            {this.state.error}
          </div>
          <div className='ln_solid'></div>
          <input type='button' className='btn btn-round btn-default'
            value='Rename' onClick={() => this.renameTable()}
          />
        </div>
      </div>
    );
  }
}
export default TableRename;