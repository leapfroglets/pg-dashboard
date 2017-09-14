import React, { Component } from 'react';
import CreateTable from '../CreateTable';

class Operations extends Component {
  render() {
    return (
      <div>
        <CreateTable dbname={this.props.dbname} />
      </div>
    );
  }
}

export default Operations;
