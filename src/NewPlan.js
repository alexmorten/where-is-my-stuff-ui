import React from 'react';
import './css/NewPlan.css'
import PencilMode from './plan-modes/PencilMode';
import RectMode from './plan-modes/RectMode';
import DeleteMode from './plan-modes/DeleteMode';
import Store from './services/Store';
import ModeSelectionBar from './ModeSelectionBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
class ModeSelector extends React.Component{
  getComponentForMode(){
    var mode = this.props.mode;
    if(mode==="pencil"){
      return <PencilMode {...this.props}/>
    }
    if(mode==="rect"){
      return <RectMode {...this.props}/>
    }
    if(mode==="delete"){
      return <DeleteMode {...this.props}/>
    }
  }
  render(){

    return(
      <div>
        {this.getComponentForMode()}
      </div>
    )
  }
}


class NewPlan extends AuthComponent{
  state={
    lines:[],
    tempPoint:null,
    mousePoint:null,
    editingMode:"pencil", // ["pencil","rect","delete"]
    name:""
  }
  width = 1000;
  height = 1000;
  gridSize = 20;

  onNameChange = (e)=>{
    e.preventDefault();
    this.setState({name:e.target.value});
  }
  onSubmit = (e)=>{
    e.preventDefault();
    var lines=this.state.lines;
    var name=this.state.name;
    var plan = {
      name:name,
      representation:{
        lines:lines
      }
    };
    Store.send("plans",plan,(data)=>{
      console.log(data);
      this.setState({
        lines:[],
        name:""
      })
      this.props.history.push("/");
      this.props.history.goForward();
    })

  }
 render(){
   var actionBar=  <ModeSelectionBar onChange={(newMode)=>{this.setState({editingMode:newMode})}} mode={this.state.editingMode}/>

   return (
    <Paper className="new-plan">
      <h1 className="nice-heading">Create a new Plan</h1>
      <TextField
        floatingLabelText="Name"
        fullWidth={false}
        value={this.state.name}
        onChange={this.onNameChange}
        />
        <ModeSelector
          width={this.width}
          height={this.height}
          gridSize={this.gridSize}
          representation={{lines:this.state.lines}}
          changeState={this.setState.bind(this)}
          mode={this.state.editingMode}
          actionBar={actionBar}
        />

        <RaisedButton label="Save!" primary={true} onClick={this.onSubmit}/>
      </Paper>
    )
 }
}
export default NewPlan;
