import React, { Component } from 'react';
import CopyDatabase from './CopyDatabase';
import RenameDatabase from './RenameDatabase';
import DropDatabase from './DropDatabase';
class DatabaseOperations extends Component {
  render() {
    return (
      this.props.currDbname &&
      <div>
        <CopyDatabase
          currDbname={this.props.currDbname}
          refresh={() => this.props.refresh()}
        />
        <RenameDatabase
          currDbname={this.props.currDbname}
          refresh={() => this.props.refresh()}
        />
        <DropDatabase
          currDbname={this.props.currDbname}
          refresh={() => this.props.refresh()}
        />
      </div>
    );
  }
}
export default DatabaseOperations;
