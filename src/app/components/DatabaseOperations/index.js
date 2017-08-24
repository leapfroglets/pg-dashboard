import React, { Component } from 'react';
import CopyDatabase from './CopyDatabase';
class DatabaseOperations extends Component {
  render() {
    return (
      <div className='x_panel'>
        <CopyDatabase currDbname={this.props.currDbname} />
      </div>
    )
  }
}
export default DatabaseOperations;