import React, {Component} from 'react';
import {BrowserRouter, Router, Route, Link, Switch} from 'react-router-dom';
import SqlEditor from '../SqlEditor';
import Browse from '../Browse';
import Insert from '../Insert';
import Operations from '../Operations';

const NavRouter = () =>{
    return(
      <BrowserRouter>
        <div>
          <ul className = "nav nav-tabs bar_tabs">
            <li className ="active"><Link to = "/sqlEditor">Sql Editor</Link></li>
            <li><Link to = "/browse">Browse</Link></li>
            <li><Link to = "/insert">Insert</Link></li>
            <li><Link to = "/operations">Operations</Link></li>
          </ul>
          <Switch>
            <Route path = "/sqlEditor" component = {SqlEditor}/>
            <Route path = "/browse" component = {Browse}/>
            <Route path = "/insert" component = {Insert}/>
            <Route path = "/operations" component = {Operations}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }


export default NavRouter;