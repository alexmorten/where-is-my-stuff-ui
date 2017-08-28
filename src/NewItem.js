import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
import Plan from './Plan';
import './css/NewItem.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Circle from './SvgComponents/Circle';
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
      this.props.history.push("/");
      this.props.history.goForward();
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
      console.log(answer);
      console.log(this.props);
      this.props.history.push(`/plans/${plan_id}`);
      this.props.history.goForward();
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
      plan = <Plan
        representation={this.state.plan.representation}
        onMouseDown={this.handleMouse}

        onMouseUp={this.handleMouse}>
        {locCircle}
        </Plan>
    }
    return (
      <Paper className="new-item">
        <h1 className="nice-heading">Create a new Item</h1>
        <TextField name="name" value={this.state.name} floatingLabelText="Item Name" onChange={this.onChange}/>
        <br/>
        <TextField name="description" value={this.state.description} floatingLabelText="Item description" onChange={this.onChange} multiLine={true} style={{textAlign:"left"}}/>
        <br/>
        <h4 className="nice-heading">Where did you put it?</h4>
        {plan}
        <RaisedButton primary={true} label="Save" disabled={this.shouldButtonBeDisabled()} onClick={this.onSubmit}/>
      </Paper>
    )
  }
}
export default NewItem;
