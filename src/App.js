import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {NavLink,withRouter} from 'react-router-dom';
import Store from './services/Store';

class App extends Component {
  handleLogout = ()=>{
    Store.deauthenticate();
    this.props.history.push("/login");
    this.props.history.goForward();
    this.forceUpdate();
    }

  render() {
    var loginLink=(
        <NavLink className="link" activeClassName="link-active login" to="/login">Login</NavLink>
    );
    if(Store.isAuthenticated()){
      loginLink=(
      <a className="link" onClick={this.handleLogout}>Logout</a>
      )
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">

            <div className="navbar">
              <img src={logo} className="App-logo" alt="logo" />
              {/* <span className="nice-heading white">Where is my stuff?</span> */}
              <NavLink className="link" activeClassName="link-active search" to="/search">Where is my stuff?</NavLink>
            </div>
            <div className="login-container"> {loginLink}</div>
          </div>
          <div className="App-body">
            {this.props.children}
          </div>
          <div className="App-footer">
            <NavLink className="link" activeClassName="link-active" to="/about">About</NavLink>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
