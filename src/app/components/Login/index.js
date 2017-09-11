import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }
  logIn(e) {
    e.preventDefault();
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let hostName = document.getElementById('host').value;
    let portNo = document.getElementById('port').value;
    if (!userName || !password || !hostName || !portNo) {
      this.setState({ error: 'Fields are empty' });
    } else {
      let data = {
        user: userName,
        password: password,
        host: hostName,
        port: portNo
      };

      httpUtil
        .post('http://localhost:4553/api/database/login', data)
        .then(res => {
          this.props.changeState(true);
          console.log(this.props.history);
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          this.setState({ error: err.response.data.error.message });
        });
    }
  }

  render() {
    return (
      <div className="login">
        <div className="img-div">
          <img src="/images/ele.jpg" className="image" />
          <div className="login-div">
            <form
              onSubmit={e => {
                this.logIn(e);
              }}
            >
              <div>
                <h2>Welcome</h2>
              </div>
              <div>{this.state.error}</div>
              <input type="text" id="userName" placeholder="User" />
              <input type="password" id="password" placeholder="Password" />
              <input type="host" id="host" placeholder="Host" />
              <input type="port" id="port" placeholder="Port" />
              <input
                type="submit"
                id="login-btn"
                className="btn btn-round btn-default"
                value="Log In"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
