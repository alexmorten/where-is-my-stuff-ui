import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

import PlanListing from './PlanListing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-body">
          <PlanListing/>
    
        </div>
      </div>
    );
  }
}

export default App;
