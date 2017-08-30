import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import SqlEditor from '../SqlEditor';
import Browse from '../Browse';
import Insert from '../Insert';
import Operations from '../Operations';
import Databases from '../Databases';

class NavBar extends Component{
  render(){
    return(
        <div>
        <ul className = "nav nav-tabs bar_tabs">
          {(!this.props.currTable && !this.props.currDbname) ? <li><NavLink activeClassName = "activeNav" to ={`${this.props.match.url}databases`}>Databases</NavLink></li>: null}
          {(this.props.currTable) ? <li><NavLink activeClassName = "activeNav" to ={`${this.props.match.url}browse`}>Browse</NavLink></li>: null}
          {(this.props.currTable || this.props.currDbname) ? <li><NavLink activeClassName = "activeNav" to ={`${this.props.match.url}sqleditor`}>SQL Editor</NavLink></li>: null}
          {(this.props.currTable) ? <li><NavLink activeClassName = "activeNav" to ={`${this.props.match.url}insert`}>Insert</NavLink></li>: null}
          {(this.props.currTable || this.props.currDbname) ? <li><NavLink activeClassName = "activeNav" to ={`${this.props.match.url}operations`}>Operations</NavLink></li>: null}
        </ul> 
        <Route path = {`${this.props.match.url}browse`}
          render={() => (<Browse dbname={this.props.currDbname} table={this.props.currTable}/>)}/>
        <Route path = {`${this.props.match.url}sqleditor`} component = {SqlEditor}/>
        <Route path = {`${this.props.match.url}insert`} render={() => (<Insert dbname={this.props.currDbname} table={this.props.currTable}/>)}/>
        <Route path = {`${this.props.match.url}operations`} component = {Operations}/>  
        <Route path = {`${this.props.match.url}databases`} component = {Databases}/> 
        </div>
        
    );
  }
}

export default NavBar;