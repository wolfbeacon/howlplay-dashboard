import React, { Component } from 'react';
import logo from '../../media/logo.svg';
import StyledTitle from "../StyledTitle";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';
import {login} from "../../redux/actions/DashboardActions";

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            token: ""
        };
        console.log(this.props);
    }

    onTokenInput = (e) => {
        this.setState({
            token: e.target.value
        });

    };

    onLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.token, this.props.history);
    };

    render() {
        return (
            <form id="login-form">
              <div id="login-body">
                <img src={logo} id="login-logo" alt="logo" />
                <div>
                  <StyledTitle/>
                  <h3 id="login-subheading">Admin Login</h3>
                  <div className="login-input-section">
                      <label className="login-form-label sr-only" htmlFor="access-key-input">Access Key</label>
                      <input type="text" className="login-input" onChange={this.onTokenInput} id="access-key-input" placeholder="Access Key"/>
                      {this.props.error ? <label className="login-error">{this.props.error}</label>: null}
                  </div>
                </div>
              </div>
              <div id="login-error-container">
                  <p id="login-error-area">Something went wrong! Please try again.</p>
                  <button id="login-submit-button" onClick={(e) => this.onLogin(e)}>Login</button>
              </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({error: state.dashboard.error});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(LoginForm));
