import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Registrate from './Registrate';
import PlanListing from './PlanListing';
import NewPlan from './NewPlan';
import DetailedPlan from './DetailedPlan';
import NewItem from './NewItem';
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
              <Route path="/plans/new/:plan_id" component={NewItem}></Route>
            <Route path="/plans/:plan_id" component={DetailedPlan}></Route>
            <Route path="/" component={PlanListing}></Route>
          </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
