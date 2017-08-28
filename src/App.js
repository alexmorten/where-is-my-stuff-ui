import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {NavLink} from 'react-router-dom';
import PlanListing from './PlanListing';
import Store from './services/Store';
class App extends Component {
  handleLogout = ()=>{
    Store.deauthenticate();
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
              <span>
                <NavLink exact={true} className="link" activeClassName="link-active" to="/">Plans</NavLink>
                <NavLink exact={true} className="link" activeClassName="link-active" to="/new-plan">NewPlan</NavLink>
              </span>

            </div>
            <div className="login-container"> {loginLink}</div>
          </div>
          <div className="App-body">
            {this.props.children}
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
