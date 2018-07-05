import React, { Component } from 'react';
import LoginForm from "../components/login/LoginForm";
import {connect} from "react-redux";

class Login extends Component {
    render() {
        return (
          <header className="page" id="login">
            <LoginForm onSwithToGame={() => {}}/>
          </header>
        );
    }
}

export default connect(null, null) (Login);
