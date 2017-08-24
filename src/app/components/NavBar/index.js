import React, {Component} from 'react';
import NavRouter from './router';

class NavBar extends Component{
  render(){
    return(
      <NavRouter currDbname ={this.props.currDbname} currTable={this.props.currTable}/>
    );
  }
}

export default NavBar;