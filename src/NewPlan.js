import React from 'react';
import ResponsiveSvg from './SvgComponents/ResponsiveSvg';
import Line from './SvgComponents/Line';
import './css/Plan.css'
import Plan from './Plan';
import Store from './services/Store';


class NewPlan extends React.Component{
  state={
    lines:[],
    tempPoint:null,
    mousePoint:null,
    mousePressed:false,
    name:""
  }
  width = 1000;
  height = 1000;
  gridSize = 20;
  mouseDown = (loc)=>{
    var roundedLoc = roundPointToGridSize(loc,this.gridSize);
    this.setState({ tempPoint:{x:roundedLoc.x,y:roundedLoc.y } })
  }
  mouseUp = (loc)=>{
    if(this.state.tempPoint){
      var roundedLoc = roundPointToGridSize(loc,this.gridSize);
      if (!isSamePoint(roundedLoc,this.state.tempPoint)) {
        this.setState({tempPoint:null,lines:this.state.lines.concat([{p1:this.state.tempPoint,p2:roundedLoc}])});
      }else{
        this.setState({tempPoint:null});
      }
    }

  }
  mouseMove = (loc)=>{

    var roundedLoc = roundPointToGridSize(loc,this.gridSize);
      this.setState({mousePoint:{x:roundedLoc.x,y:roundedLoc.y}});
  }
  mouseLeave = (loc)=>{
    this.setState({tempPoint:null});
  }
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
    })

  }
 render(){

  var mouseLine;
   if(this.state.tempPoint){
     mouseLine = <Line p1={this.state.tempPoint} p2={this.state.mousePoint} key={"mouse"} className="mouse-line"/>;
   }
   return (
    <div className="new-plan">
      <input type="text" placeholder="name" className="input new-plan-name" value={this.state.name} onChange={this.onNameChange}/>
      <Plan representation={{lines:this.state.lines}}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMove={this.mouseMove}
        onMouseLeave={this.mouseLeave}
        width={this.width} height={this.height} gridSize={this.gridSize}
        >
          {mouseLine}
        </Plan>
        <button onClick={this.onSubmit}>Save!</button>
      </div>
    )
 }
}
export default NewPlan;


function roundToGridSize(num,gridSize){
  return Math.round(num/gridSize)*gridSize;
}
function roundPointToGridSize(point,gridSize){
  var newPoint = {
    x:roundToGridSize(point.x,gridSize),
    y:roundToGridSize(point.y,gridSize)
  };
  return newPoint;
}
function isSamePoint(p1,p2){
  return (p1.x === p2.x && p1.y === p2.y);
}
