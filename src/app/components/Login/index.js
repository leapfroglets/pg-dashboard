import React,{Component} from 'react';
import * as httpUtil from '../../httpUtil';

class Login extends Component{
  constructor(){
    super();
    this.state={
      loggedIn:false
    }
  }
  logIn(e){
    e.preventDefault();
    let userName=document.getElementById('userName').value;
    let password=document.getElementById('password').value;
    if(!userName || !password){
      alert('username and Password fields cannot be left empty');
    }
    else{
      let data={
        user:userName,
        password:password
      }
      
      httpUtil.post('http://localhost:4553/api/database/login',data)
      .then(res => {        
        this.props.changeState();      console.log(this.props.history);
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        let error = err.response.data.error.message;
        alert(error)
      });
    }
    
  }

  render(){
    return(
      <form onSubmit={(e) => {
            this.logIn(e);
      }          
      }>   
        <div className='login-form-header'>
          <img src='./images/logo-white.png'/>
          <h1>Welcome to PG-Admin</h1>
        </div>
        <div className='login-form'>
          <div className='header'>
            Sign In
          </div>
          <input type='text' id='userName' placeholder='User Name'/>
          <input type='password' id='password' placeholder='Password'/>
          <input type='submit' value='Log In' id='login' />
          
        </div>
     </form>
    )
    
  }
}

export default Login;