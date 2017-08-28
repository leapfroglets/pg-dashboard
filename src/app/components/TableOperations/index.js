import React, {Component} from 'react';
import TableRename from './TableRename';
class TableOperations extends Component{
  render(){
    return(
      <div>
        {this.props.currDbname}   {this.props.currTable}
        <TableRename currDbname={this.props.currDbname} currTable={this.props.currTable}/>
      </div>
    );
  }
}
export default TableOperations;