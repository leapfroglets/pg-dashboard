import React, { Component } from 'react';
import SqlResult from './SqlResult'
// import * as httpUtil from '../../httpUtil';
class SqlEditor extends Component {
  constructor() {
    super();
    this.state = {

      brokenQueries: []
    }
    this.executeQuery = this.executeQuery.bind(this);
    this.showSelection = this.showSelection.bind(this);
  }
  showSelection(e) {
    // let textComponent = document.getElementById('textInput');
    // let selectedText;
    // if (textComponent.selectionStart !== undefined) {
    //   // Standards Compliant Version

    //   let startPos = textComponent.selectionStart;
    //   let endPos = textComponent.selectionEnd;
    //   if(startPos === endPos) return;
    //   console.log(startPos, endPos, textComponent.value, textComponent.value.substring(startPos, endPos))
    //   selectedText = textComponent.value.substring(startPos, endPos);
    //   alert('on select:' + selectedText);

    // }
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
        <div className='input'>
          <div>
            <textarea rows='15' cols='70' id='textInput' onSelect={e => this.showSelection(e)} />
          </div>
          <div>
            <input type='button' value='execute'
              onClick={() => { this.executeQuery(document.getElementById('textInput').value) }} />
          </div>

        </div>
        <div className='output' id='output'>
          {
            this.state.brokenQueries.map((q, i) => {
              console.log('index js'+q);
              return (
                <div>
                  Result:{i+1}
                <SqlResult query={q.trim()} key={i} />
                </div>
                
              )
            }
            )
          }
        </div>
      </div>
    )

  }
}
export default SqlEditor;