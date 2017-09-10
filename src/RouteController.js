import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Register from './Register';
import PlanListing from './PlanListing';
import NewPlan from './NewPlan';
import DetailedPlan from './DetailedPlan';
import NewItem from './NewItem';
import ModifyPlan from './ModifyPlan';
import ModifyItem from './ModifyItem';
import Search from './Search';
import About from './About';
class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/plans/new" component={NewPlan}></Route>
            <Route path="/plans/:plan_id/items/new" component={NewItem}></Route>
            <Route path="/plans/:plan_id/items/:item_id/modify" component={ModifyItem}></Route>
            <Route path="/plans/:plan_id/modify" component={ModifyPlan}></Route>
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
