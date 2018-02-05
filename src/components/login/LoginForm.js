import React, { Component } from 'react';
import logo from '../../logo.svg';

class LoginForm extends Component {
    render() {
        return (
            <form id="login-form">
              <div id="login-body">
                <img src={logo} id="login-logo" alt="logo" />
                <div>
                  <h1 id="login-heading"><span id="login-heading-accent">Howl</span>Play</h1>
                  <h3 id="login-subheading">Admin Login</h3>
                  <div className="login-input-section">
                      <label className="login-form-label sr-only" htmlFor="username-input">Username</label>
                      <input type="text" className="login-input" id="username-input" placeholder="Username"/>
                  </div>
                  <div className="login-input-section">
                      <label className="login-form-label sr-only" htmlFor="password-input">Password</label>
                      <input type="password" className="login-input" id="password-input" placeholder="Password"/>
                  </div>
                </div>
              </div>
              <div id="login-error-container">
                  <p id="login-error-area">Something went wrong! Please try again.</p>
                  <button id="login-submit-button">Login</button>
              </div>
            </form>
        );
    }
}

export default LoginForm;
