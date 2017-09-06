import React, { Component } from 'react';
import SqlResult from './SqlResult';
import './style.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
class SqlEditor extends Component {
  constructor() {
    super();
    this.state = {
      brokenQueries: []
    };
    this.options = { lineNumbers: true, mode: 'text/x-pgsql' };
    this.executeQuery = this.executeQuery.bind(this);
  }
  componentDidMount() {
    if (this.props.currDbname !== null) {
      let map = { 'Ctrl-Enter': () => this.executeQuery() };
      this.refs.editor.getCodeMirror().addKeyMap(map);
    }
  }
  executeQuery() {
    let query = '';
    if (this.refs.editor.getCodeMirror().getSelection() === '')
      query = this.refs.editor.getCodeMirror().getValue();
    else query = this.refs.editor.getCodeMirror().getSelection();

    if (query !== '') {
      let queries = query
        .trim()
        .split(';')
        .filter(oneQuery => {
          if (oneQuery !== '\n') return oneQuery;
          return null;
        });
      this.setState({ brokenQueries: queries });
    }
  }
  render() {
    return (
      this.props.currDbname !== null && (
        <div>
          <div className="x_panel">
            <div>
              <CodeMirror value="" options={this.options} ref="editor" />
              <div>(Press [Ctrl]+Enter to Execute )</div>
            </div>
            <div className="ln_solid" />
            <div>
              <input
                className="btn btn-round btn-default"
                type="button"
                value="execute"
                onClick={() => {
                  this.executeQuery();
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
      )
    );
  }
}
export default SqlEditor;
