import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class SqlResult extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      error: '',
      update: ''
    }
    this.getQuery=this.getQuery.bind(this);
  }
  componentWillMount() {
    console.log('componentWillMount()' + this.props.query)
    this.getQuery(this.props.query);
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps()' + nextProps.query)
    this.getQuery(nextProps.query);
    
  }
  getQuery(query){
    if (query) {
      
            let data = { "query":query, "dbname": "testdb" }
            httpUtil.post(`http://localhost:4553/api/queries`, data).then(
              response => {
      
                if (response.data.reply.hasOwnProperty('rows'))
                  this.setState({ result: response.data, error: '', update: '' });
                else
                  this.setState({ result: [], error: '', update: response.data.reply });
              }
            )
              .catch(err => {
                console.log('err her', err);
                if (err.response){
                  // if(typeof(err.response.data.error.message)==='errorObject')
                    this.setState({ result: [], update: '', error:'operation error'+typeof(err.response.data.error.message ) });
                  // else
                  //   this.setState({ result: [], update: '', error:err.response.data.error.message  });
                }

                  
      
              })
          }
  }
  render() {
    return (
      <div>
        {this.state.error}
        {this.state.update}
        {
          this.state.result !== undefined
          &&
          <table>
            <tbody>
              <tr>
                {
                  this.state.result.reply === undefined ? '' :
                    this.state.result.reply.fields.map((field, i) => {
                      return (<th key={i}>{field.name}</th>)
                    })
                }
              </tr>
              {
                this.state.result.reply === undefined ? '' :
                  this.state.result.reply.rows.map((row, i) => {
                    return (<tr key={i}>{
                      this.state.result.reply.fields.map((field, j) => {
                        return (<th key={j}>{row[field.name]}</th>)
                      })
                    }</tr>)
                  })
              }
            </tbody>
          </table>
        }
      </div>
    )

  }
}
export default SqlResult;