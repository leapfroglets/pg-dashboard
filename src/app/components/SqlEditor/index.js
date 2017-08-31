import React, { Component } from 'react';
import SqlResult from './SqlResult';
import './style.css';
class SqlEditor extends Component {
  constructor() {
    super();
    this.state = {
      brokenQueries: []
    }
    this.executeQuery = this.executeQuery.bind(this);
  }
  executeQuery(query) {
    if (query !== '') {
      let queries = query.split(';')
        .filter(oneQuery => { if (oneQuery !== '\n') return oneQuery; return null; });
      this.setState({ brokenQueries: queries })
    }
  }
  render() {
    return (
      <div>
        <div className='x_panel'>
          <div>
            <textarea placeholder='Enter your SQL here' className='form-control' id='textInput'/>
          </div>
          <div className="ln_solid"></div>
          <div>
            <input className='btn btn-round btn-default' type='button' value='execute'
              onClick={() => { this.executeQuery(document.getElementById('textInput').value) }} />
          </div>
        </div>
        <div className='' id='output'>
          <div className='x_panel no-border'>
            {
              this.state.brokenQueries.map((q, i) => {
                console.log('index js' + q);
                return (
                  <div key={i}>
                    <div><h2>Result:{i + 1}</h2></div>
                    <SqlResult currDbname={this.props.currDbname} query={q.trim()} key={i + 'q2'} />
                  </div>
                )
              }
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
export default SqlEditor;