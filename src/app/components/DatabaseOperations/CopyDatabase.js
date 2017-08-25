import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class CopyDatabase extends Component {
  constructor() {
    super();
    this.state = {
      textBoxValue: '',
      reply: '',
      error: ''
    };
    this.copyDatabase = this.copyDatabase.bind(this);
  }
  copyDatabase() {
    if (this.state.textBoxValue !== '') {
      console.log(`create database ${this.state.textBoxValue} WITH TEMPLATE ${this.props.currDbname};`);
      let data = {
        query: `create database ${this.state.textBoxValue} with template ${this.props.currDbname};`,
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
          <div className='x_title'>Copy {this.props.currDbname} to</div>
          <div>
            <input type='text' className='form-control' id='dbName' placeholder='New Database'
              value={this.state.textBoxValue}
              onChange={(e) => this.setState({ textBoxValue: e.target.value })}
            />
            {this.state.reply}
            {this.state.error}
          </div>
          <div className='ln_solid'></div>
          <input type='button' className='btn btn-round btn-default'
            value='Copy' onClick={() => this.copyDatabase()}
          />
        </div>
      </div>

    )
  }
}
export default CopyDatabase;