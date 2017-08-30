import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class TableStructure extends Component {
  constructor() {
    super();
    this.state = {
      result: []
    }
  }
  componentWillMount() {
    let data = {
      "query": `select column_name,udt_name,is_nullable,character_maximum_length
       FROM information_schema.columns WHERE table_name= '${this.props.currTable}'`,
      "dbname": this.props.currDbname
    }
    httpUtil.post(`http://localhost:4553/api/database/queries`, data).then(
      response => {
        if (response.data.reply.hasOwnProperty('rows'))
          this.setState({ result: response.data });
      }
    )
  }
  render() {
    return (
      <div className='col-md-12'>
        <div className='x_panel'>
          <div className='x_content'>
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
                {
                  this.state.result.reply === undefined ? '' :
                    this.state.result.reply.rows.map((row, i) => {
                      return (<tr key={i}>{
                        this.state.result.reply.fields.map((field, j) => {
                          return (<td key={j}>{row[field.name]}</td>)
                        })
                      }
                        <td>here</td>
                        {/* add code here */}
                      </tr>)
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default TableStructure;