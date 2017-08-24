import React, {Component} from 'react';
import {BrowserRouter, Router, Route, Link, Switch} from 'react-router-dom';
import SqlEditor from '../SqlEditor';
import Browse from '../Browse';
import Insert from '../Insert';
import Operations from '../Operations';

class NavRouter extends Component{
  constructor(){
    super();
    this.state={
      isActive:"browse"
    };
  }

  changeTab(tab){
    this.setState({
      isActive:tab
    })
  }
  render(){
    if(this.props.currTable!==null){
      return(
        <BrowserRouter>
          <div>
            <ul className = "nav nav-tabs bar_tabs">
              <li className ={(this.state.isActive==="browse") ? "active":""} onClick = {() => {this.changeTab("browse")}}><Link to = "/browse">Browse</Link></li>
              <li className ={(this.state.isActive==="sqlEditor") ? "active":""}onClick = {() => {this.changeTab("sqlEditor")}}><Link to = "/sqlEditor">Sql Editor</Link></li>
              <li className ={(this.state.isActive==="insert") ? "active":""}onClick = {() => {this.changeTab("insert")}}><Link to = "/insert">Insert</Link></li>
              <li className ={(this.state.isActive==="operations") ? "active":""}onClick = {() => {this.changeTab("operations")}}><Link to = "/operations">Operations</Link></li>
            </ul>
           
              <Route exact path = "/" 
                exact render={() => (<Browse dbname={this.props.currDbname} table={this.props.currTable}/>)}
              />
              <Route path = "/browse" 
                exact render={() => (<Browse dbname={this.props.currDbname} table={this.props.currTable}/>)}
              />
              <Route path = "/sqlEditor"
                exact render={() => (<SqlEditor dbname={this.props.currDbname} table={this.props.currTable}/>)}
              />
              <Route path = "/insert"
                exact render={() => (<Insert dbname={this.props.currDbname} table={this.props.currTable}/>)}
              />
              <Route path = "/operations"
                exact render={() => (<Operations dbname={this.props.currDbname} table={this.props.currTable}/>)}
              />
           
          </div>
        </BrowserRouter>
      );
    }
    else{
      return(
        <BrowserRouter>
          <div>
            <ul className = "nav nav-tabs bar_tabs">
              <li className ={(this.state.isActive==="sqlEditor") ? "active":""}onClick = {() => {this.changeTab("sqlEditor")}}><Link to = "/sqlEditor">Sql Editor</Link></li>
              <li className ={(this.state.isActive==="insert") ? "active":""}onClick = {() => {this.changeTab("insert")}}><Link to = "/insert">Insert</Link></li>
              <li className ={(this.state.isActive==="operations") ? "active":""}onClick = {() => {this.changeTab("operations")}}><Link to = "/operations">Operations</Link></li>
            </ul>

              <Route path = "/sqlEditor" component = {SqlEditor}/>
              <Route path = "/insert" component = {Insert}/>
              <Route path = "/operations" component = {Operations}/>

          </div>
        </BrowserRouter>
      );
    }
  }
   
}


export default NavRouter;