import React, { Component } from 'react';
class NavBreadCrumb extends Component {
  render() {
    return (
      <div>
        <ol className='breadcrumb'>
          <li>{window.location.href.split('/')[2]}</li>
          {this.props.currDbname!=null && <li>{this.props.currDbname}</li>}
          {this.props.currTable!=null && <li>{this.props.currTable}</li>}
        </ol>
      </div>
    )

  }
}
export default NavBreadCrumb;