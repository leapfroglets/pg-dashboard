import React, { Component } from 'react';
import CopyDatabase from './CopyDatabase';
import RenameDatabase from './RenameDatabase';
import DropDatabase from './DropDatabase';
class DatabaseOperations extends Component {
  render() {
    return (
      <div>
        <CopyDatabase currDbname={this.props.currDbname} />
        <RenameDatabase currDbname={this.props.currDbname} />
        <DropDatabase currDbname={this.props.currDbname} />
      </div>

    )
  }
}
export default DatabaseOperations;