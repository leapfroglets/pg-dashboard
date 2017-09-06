import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login'
import createBrowserHistory from 'history/createBrowserHistory';

class Router extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 'browse',
      isLoggedIn: false
    };
  }

  changeState(){
    console.log('change state');
    this.setState({
      isLoggedIn:true
    })
  }

  render() {
    let history = createBrowserHistory();
    if(!this.state.isLoggedIn){
      history.push('/');
    }
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/dashboard"
            render={obj => <App obj={obj} />} 
          />
          <Route
            exact path="/"
            render={({history})=>(
              <Login changeState={()=>{this.changeState()}} history={history}/>
            )} 
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
