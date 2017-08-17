import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class SqlEditor extends Component {
  constructor() {
    super();
    this.state = {
      selectedQuery: '',
      query: '',
      result: [],
      error: '',
      update: ''
    }
    this.executeQuery = this.executeQuery.bind(this);
    this.showSelection = this.showSelection.bind(this);
  }
  showSelection(e) {
    let textComponent = document.getElementById('textInput');
    let selectedText;
    if (textComponent.selectionStart !== undefined) {
      // Standards Compliant Version
      
      let startPos = textComponent.selectionStart;
      let endPos = textComponent.selectionEnd;
      if(startPos === endPos) return;
      console.log(startPos, endPos, textComponent.value, textComponent.value.substring(startPos, endPos))
      selectedText = textComponent.value.substring(startPos, endPos);
      alert('on select:' + selectedText);
      
    }
  }
  executeQuery(query) {
    
    if (query) {
      // console.log(query);
      let data = { "query": query, "dbname": "testdb" }
      httpUtil.post(`http://localhost:4553/api/queries`, data).then(
        response => {
          console.log(response.data);
          if (response.data.reply.hasOwnProperty('rows'))
            this.setState({ result: response.data, error: '', update: '' });
          else
            this.setState({ result: [], error: '', update: response.data.reply });
        }
      )
        .catch(err => {
          console.log('err her', err);
          if (err.response)
            this.setState({ result: [], update: '', error: err.response.data.error.message });

        })
    }

  }
  render() {
    return (
      <div>
        <div className='input'>
          <div>
            <textarea rows='15' cols='70' id='textInput' onSelect={e => this.showSelection(e)}/>
          </div>
          <div>
            <input type='button' value='execute'
              onClick={() => { this.executeQuery(document.getElementById('textInput').value) }} />
          </div>

        </div>
        <div className='output' id='output'>
          {this.state.update}
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
        </div>
        <div className='error'>{this.state.error}</div>
      </div>
    )

  }
}
export default SqlEditor;