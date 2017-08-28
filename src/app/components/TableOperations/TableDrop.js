import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class TableDrop extends Component {
  constructor() {
    super();
    this.state = {
      textBoxValue: '',
      update: '',
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
          <div className='x_title'>Drop Data/ Table</div>
          <div>         
            {this.state.reply}
            {this.state.error}
          </div>          
          />
        </div>
      </div>
    );
  }
}
export default TableDrop;