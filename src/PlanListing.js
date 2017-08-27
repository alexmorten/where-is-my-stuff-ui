import React from 'react';
import Plan from './Plan';
import Store from './services/Store';
import './css/SinglePlan.css';
import NewPlan from './NewPlan';

class SinglePlan extends React.Component{
  render(){
    return (
    <div className="single-plan">
      <h4>{this.props.plan.name}</h4>
      <Plan representation={this.props.plan.representation}/>
    </div>)
  }
}




class PlanListing extends React.Component{
  state={
    plans:[]
  }
  getPlans = ()=>{
    Store.receive("plans",(plans)=>{

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
        {plans}
        
      </div>
    )
  }
}
export default PlanListing;
