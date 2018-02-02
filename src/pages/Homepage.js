import React, { Component } from 'react';
import LoginForm from '../components/login/LoginForm';

class Homepage extends Component {

  render() {
    const inputs = [{
      name: "Username",
      type: "text"
    },
    {
      name: "Password",
      type: "password"
    }];

    return (
      <header className="page" id="login">
        <h1>HowlPlay Admin</h1>
        <LoginForm title="Login" button="Login" input={inputs}/>
      </header>
    );
  }
}

export default Homepage;
