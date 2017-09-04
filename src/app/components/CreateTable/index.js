import React, { Component } from 'react';
import AddColumns from './addColumns';

class CreateTable extends Component {
  constructor(){
    super();
    this.state = {
      tableNameValue:'',
      columnNoValue:'',
      go:false
    };
  }

  handleChildUnmount(){
    this.setState({
      tableNameValue:'',
      columnNoValue:'',
      go:false
    })
  }

  addColumns(){
    this.setState({
      go:true
    })
  }
  
  render() {
    return (
      <div>
        <div className="col-md-4">
          <div className="x_panel">
            <div className="x_title">Insert Table</div>
            <div>
              <input
                type="text"
                className="form-control"
                id="tableName"
                placeholder="New Table"
                value={this.state.tableNameValue}
                onChange={e => this.setState({ tableNameValue: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                id="columnNo"
                placeholder="no. of columns"
                value={this.state.columnNoValue}
                onChange={e => this.setState({ columnNoValue: e.target.value })}
              />
              {this.state.reply}
              {this.state.error}
            </div>
            <div className="ln_solid" />
            <input
              type="button"
              className="btn btn-round btn-default"
              value="Create"
              onClick={() => this.addColumns()}
            />
          </div>
        </div>
        {this.state.go ? <AddColumns dbname={this.props.dbname} tableName={this.state.tableNameValue} columns={this.state.columnNoValue} unmount={() => { this.handleChildUnmount()}}/> : null}   
      </div>
    );
  }
}

export default CreateTable;
