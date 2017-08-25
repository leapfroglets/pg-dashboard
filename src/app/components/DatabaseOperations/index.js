import React, { Component } from 'react';
import CopyDatabase from './CopyDatabase';
class DatabaseOperations extends Component {
  render() {
    return (
      <div>
        <CopyDatabase currDbname={this.props.currDbname} />
        <CopyDatabase currDbname={this.props.currDbname} />
        <CopyDatabase currDbname={this.props.currDbname} />
      </div>

    )
  }
}
export default DatabaseOperations;