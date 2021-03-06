import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
import Plan from './Plan';
import './css/NewItem.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Circle from './SvgComponents/Circle';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';

class NewItem extends AuthComponent{
  state={
    plan:null,
    name:"",
    description:"",
    x:null,
    y:null,
  }
  getPlan(){
    this.find(`plans/${this.plan_id}`,(plan)=>{
      this.setState({plan:plan})
    },(fail)=>{
      console.log(fail);
      this.transitionTo("");
    })
  }
  componentDidMount(){
    this.plan_id = this.props.match.params.plan_id;
    this.getPlan();
  }
  handleMouse = (loc)=>{
    this.setState({x:loc.x,y:loc.y});
  }
  onChange=(e)=>{
    var obj={};
    obj[e.target.name]=e.target.value;
    this.setState(obj);
  }
  shouldButtonBeDisabled(){
    return !(this.state.name && this.state.x && this.state.y)
  }
  onSubmit = (e)=>{
    e.preventDefault();
    var name = this.state.name;
    var description = this.state.description;
    var x = this.state.x;
    var y = this.state.y;
    var plan_id = this.plan_id;
    var item = {
      name:name,
      description:description,
      plan_id:plan_id,
      representation:{
        x:x,
        y:y
      }
    }
    this.post("items",item,(answer)=>{
      this.transitionTo(`plans/${plan_id}`);
    },(fail)=>{
      console.log(fail);
    })
  }
  render(){
    var plan;
    if(this.state.plan){
      var x = this.state.x, y = this.state.y;
      var locCircle;
      if(x && y){
        locCircle = <Circle point={{x:x,y:y}} radius={10}/>
      }
      plan = (<div>
        <h4 className="nice-heading">{`Where did you put it in "${this.state.plan.name}"?`}</h4>
        <Plan
        representation={this.state.plan.representation}
        onMouseDown={this.handleMouse}
        onMouseUp={this.handleMouse}>
        {locCircle}
        </Plan>
      </div>)
    }
    return (
      <div>
        <Subheader>
          <BackIcon rootStyle={{float:"left"}} to={this.state.plan ? `/plans/${this.state.plan.id}` : "/"} text={this.state.plan ? `"${this.state.plan.name}"` : ""}/>
          <RaisedButton primary={true} label="Save" disabled={this.shouldButtonBeDisabled()} onClick={this.onSubmit} style={{float:"right"}}/>
        </Subheader>
        <Paper className="new-item">
          <h1 className="nice-heading">{this.heading || "Create a new Item"}</h1>
          <TextField name="name" value={this.state.name} floatingLabelText="Item Name" onChange={this.onChange}/>
          <br/>
          <TextField name="description" value={this.state.description} floatingLabelText="Item description (optional)" onChange={this.onChange} multiLine={true} style={{textAlign:"left"}}/>
          <br/>

          {plan}
          <RaisedButton primary={true} label="Save" disabled={this.shouldButtonBeDisabled()} onClick={this.onSubmit}/>
        </Paper>
      </div>

    )
  }
}
export default NewItem;
