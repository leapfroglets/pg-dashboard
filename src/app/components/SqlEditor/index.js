import React, { Component } from 'react';
import SqlResult from './SqlResult';
import './style.css';
class SqlEditor extends Component {
  constructor() {
    super();
    this.state = {
      brokenQueries: [],
      
    };
    this.selectQuery='';
    this.executeQuery = this.executeQuery.bind(this);
    this.keyLog = this.keyLog.bind(this);
    this.showSelection = this.showSelection.bind(this);
  }
  showSelection(e) {
    let textComponent = document.getElementById('textInput');
    let selectedText;
    if (textComponent.selectionStart !== undefined) {
      // Standards Compliant Version
      let startPos = textComponent.selectionStart;
      let endPos = textComponent.selectionEnd;
      if (startPos === endPos) return;
      console.log(
        startPos,
        endPos,
        textComponent.value,
        textComponent.value.substring(startPos, endPos)
      );
      selectedText = textComponent.value.substring(startPos, endPos);
      this.selectQuery=selectedText;
    }
  }
  keyLog(e) {
    if (e.ctrlKey && e.keyCode === 13){
      this.executeQuery(document.getElementById('textInput').value);
      alert(1)
    }
    if (e.altKey && e.keyCode === 13){
      this.executeQuery(this.selectQuery);
      this.selectQuery='';
      alert(2)
    }
      
  }
  executeQuery(query) {
    if (query !== '') {
      let queries = query.split(';').filter(oneQuery => {
        if (oneQuery !== '\n') return oneQuery;
        return null;
      });
      this.setState({ brokenQueries: queries });
    }
  }
  render() {
    return (
      <div>
        <div className="x_panel">
          <div>
            <textarea
              placeholder="Enter your SQL here"
              className="form-control"
              id="textInput"
              onKeyDown={e => this.keyLog(e)}
              onSelect={e => this.showSelection(e)}
            />
            <div>(Press [Ctrl]+Enter to Execute All)</div>
            <div>(Press [Alt]+Enter to Execute Selected)</div>
          </div>
          <div className="ln_solid" />
          <div>
            <input
              className="btn btn-round btn-default"
              type="button"
              value="execute"
              onClick={() => {
                this.executeQuery(document.getElementById('textInput').value);
              }}
            />
          </div>
        </div>
        <div className="" id="output">
          <div className="x_panel no-border">
            {this.state.brokenQueries.map((q, i) => {
              return (
                <div key={i}>
                  <div>
                    <h2>Result of {q}</h2>
                  </div>
                  <SqlResult
                    currDbname={this.props.currDbname}
                    query={q.trim()}
                    key={i + 'q2'}
                    refresh={() => this.props.refresh()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default SqlEditor;
