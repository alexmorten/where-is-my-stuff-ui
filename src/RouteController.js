import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Registrate from './Registrate';
import PlanListing from './PlanListing';
import NewPlan from './NewPlan';
class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
          <Switch>
            <Route path="/register" component={Registrate}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/new-plan" component={NewPlan}></Route>
            <Route path="/" component={PlanListing}></Route>
          </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
