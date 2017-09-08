import React, { Component } from 'react';
import TableRename from './TableRename';
import TableCopy from './TableCopy';
import TableDrop from './TableDrop';
class TableOperations extends Component {
  render() {
    return (
      this.props.currTable!==null &&
      <div>
        <TableRename
          currDbname={this.props.currDbname}
          currTable={this.props.currTable}
          refresh={() => this.props.refresh()}
        />
        <TableCopy
          currDbname={this.props.currDbname}
          currTable={this.props.currTable}
          refresh={() => this.props.refresh()}
        />
        <TableDrop
          currDbname={this.props.currDbname}
          currTable={this.props.currTable}
          refresh={() => this.props.refresh()}
        />
      </div>
    );
  }
}
export default TableOperations;
