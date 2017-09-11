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
      isLoggedIn: localStorage.getItem("isLoggedIn")
    };
  }

  changeState(value){
    this.setState({
      isLoggedIn:value
    });
    localStorage.setItem("isLoggedIn", value);
  }
  componentWillMount(){
    let history = createBrowserHistory();
    if(this.state.isLoggedIn=='false'){
      history.push('/');
    }
  }
  render() {

    return (
      <BrowserRouter>
        <div>
          <Route
            path="/dashboard"
            render={obj => <App obj={obj} changeState={(value)=>{this.changeState(value)}} />} 
          />
          <Route
            exact path="/"
            render={({history})=>(
              <Login changeState={(value)=>{this.changeState(value)}} history={history}/>
            )} 
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
