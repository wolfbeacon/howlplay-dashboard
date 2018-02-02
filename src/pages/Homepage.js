import React, { Component } from 'react';
import LoginForm from '../components/login/LoginForm';

class Homepage extends Component {

  render() {
    const inputs = [
      {
        name: "Username",
        type: "text"
      },
      {
        name: "Password",
        type: "password"
      }
    ];

    return (
      <header className="App">
        <LoginForm title="HowlPlay Login" button="Login" input={inputs}/>
      </header>
    );
  }
}

export default Homepage;
