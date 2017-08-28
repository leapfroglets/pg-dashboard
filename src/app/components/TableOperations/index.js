import React, {Component} from 'react';
import TableRename from './TableRename';
import TableCopy from './TableCopy';
import TableDrop from './TableDrop';
class TableOperations extends Component{
  render(){
    return(
      <div>
        <TableRename currDbname={this.props.currDbname} currTable={this.props.currTable} />
        <TableCopy currDbname={this.props.currDbname} currTable={this.props.currTable} />
        <TableDrop currDbname={this.props.currDbname} currTable={this.props.currTable} />
      </div>
    );
  }
}
export default TableOperations;