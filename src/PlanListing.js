import React from 'react';
import Plan from './Plan';
import Paper from 'material-ui/Paper';
import './css/PlanListing.css';
import AuthComponent from './helperComponents/AuthComponent';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from './helperComponents/Subheader';
class SinglePlan extends React.Component{
  render(){
    var plan = this.props.plan;
    return (

        <Paper className="single-plan">
          <Link to={`/plans/${plan.id}`}>
            <h2 className="nice-heading">{plan.name}</h2>

            <Plan representation={plan.representation}/>
            <span className="subtitle">{plan.item_amount} items</span>
            </Link>
        </Paper>

  )
  }
}




class PlanListing extends AuthComponent{
  state={
    plans:[]
  }
  getPlans = ()=>{
    this.find("plans",(plans)=>{

        this.setState({plans:plans});
    },
    (fail)=>{console.log(fail);})
  }
  componentDidMount(){
    this.getPlans();
  }
  render(){
    var plans= this.state.plans.map((plan)=>{
      return <SinglePlan plan={plan} key={plan.id} />
    });
    return(
      <div>
        <Subheader>
          <Link to="/plans/new" >
            <RaisedButton label="Add a Plan" primary={true} style={{float:"right"}}/>
          </Link>
        </Subheader>
        <div className="plan-listing">

          {plans}

        </div>
      </div>
    )
  }
}
export default PlanListing;
