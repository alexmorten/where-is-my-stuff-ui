import React from 'react';
import NewPlan from './NewPlan';
import BackIcon from './helperComponents/BackIcon';
class ModifyPlan extends NewPlan{
  onSubmit = (e)=>{
    e.preventDefault();
    var lines=this.state.lines;
    var labels=this.state.labels;
    var name=this.state.name;
    var plan = {
      name:name,
      representation:{
        lines:lines,
        labels:labels
      }
    };
    this.update(`plans/${this.plan_id}`,plan,(data)=>{

      this.transitionTo(`plans/${this.plan_id}`);
    })

  }
  componentWillMount(){

  }
  componentDidMount(){
    this.heading = "Modify ...";
    this.plan_id = this.props.match.params.plan_id;
    this.find(`plans/${this.plan_id}`,(plan)=>{
      var name = plan.name;
      var lines = plan.representation.lines;
      var labels = plan.representation.labels;
      this.heading = `Modify "${name}"`
      this.backIcon = <BackIcon rootStyle={{float:"left"}} text={` "${plan.name}"`} to={`/plans/${plan.id}`}/>;
      this.setState({
        name:name,
        lines:lines,
        labels:labels
      });
    },(fail)=>{
      console.log(fail);
      this.transitionTo("");
    })
  }


}
export default ModifyPlan;
