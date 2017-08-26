import React from 'react';
import ResponsiveSvg from './SvgComponents/ResponsiveSvg';
import Line from './SvgComponents/Line';
import './css/Plan.css'
import PencilMode from './plan-modes/PencilMode';
import RectMode from './plan-modes/RectMode';
import Store from './services/Store';

class ModeSelector extends React.Component{
  render(){

    return(
      <div>
        <h4>{this.props.mode}</h4>
        <RectMode {...this.props}/>
      </div>
    )
  }
}


class NewPlan extends React.Component{
  state={
    lines:[],
    tempPoint:null,
    mousePoint:null,

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
      if(this.props.refresh){
        this.props.refresh();
      }
    })

  }
 render(){


   return (
    <div className="new-plan">
      <input type="text" placeholder="name" className="input new-plan-name" value={this.state.name} onChange={this.onNameChange}/>

        <ModeSelector
          width={this.width}
          height={this.height}
          gridSize={this.gridSize}
          representation={{lines:this.state.lines}}
          changeState={this.setState.bind(this)}
        />
        <button onClick={this.onSubmit}>Save!</button>
      </div>
    )
 }
}
export default NewPlan;
