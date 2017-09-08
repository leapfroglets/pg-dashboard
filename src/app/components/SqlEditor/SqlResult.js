import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class SqlResult extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      error: '',
      update: ''
    };
    this.getQuery = this.getQuery.bind(this);
  }
  componentWillMount() {
    this.getQuery(this.props.query);
  }
  componentWillReceiveProps(nextProps) {
    this.getQuery(nextProps.query);
  }
  getQuery(query) {
    if (query) {
      let data = { query: query, dbname: this.props.currDbname };
      httpUtil
        .post(`http://localhost:4553/api/database/queries`, data)
        .then(response => {
          if (response.data.reply.hasOwnProperty('rows'))
            this.setState({ result: response.data, error: '', update: '' });
          else
            this.setState({
              result: [],
              error: '',
              update: response.data.reply
            });
        })
        .then(() => this.props.refresh())
        .catch(err => {
          if (err.response) {
            this.setState({
              result: [],
              update: '',
              error:
                'error in operation.' +
                err.response.data.error.message.toString()
            });
          }
        });
    }
  }
  render() {
    return (
      <div className="x_content">
        {this.state.error}
        {this.state.update}
        {this.state.result !== undefined && (
          <table className="table table-striped">
            <thead>
              <tr>
                {this.state.result.reply === undefined ? (
                  ''
                ) : (
                  this.state.result.reply.fields.map((field, i) => {
                    return <th key={i}>{field.name}</th>;
                  })
                )}
              </tr>
            </thead>
            <tbody>
              {this.state.result.reply === undefined ? (
                ''
              ) : (
                this.state.result.reply.rows.map((row, i) => {
                  return (
                    <tr key={i}>
                      {this.state.result.reply.fields.map((field, j) => {
                        return <th key={j}>{row[field.name]}</th>;
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default SqlResult;
