import React, {Component} from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';
import SqlEditor from './components/SqlEditor';
import Browse from './components/Browse';
import Insert from './components/Insert';
import Operations from './components/Operations';
import App from './App';

class Router extends Component{
  constructor(){
    super();
    this.state={
      isActive:"browse"
    };
  }

  render(){
      return(
        <BrowserRouter>
          <div>
              <Route path = '/' component={App}/>
          </div>
        </BrowserRouter>
      );
  }
   
}

export default Router;
