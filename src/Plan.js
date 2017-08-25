import React from 'react';
import ResponsiveSvg from './SvgComponents/ResponsiveSvg';
import Line from './SvgComponents/Line';
import './css/Plan.css'
class Plan extends React.Component{
  state={
    lines:[],
    tempPoint:null,
    mousePoint:null,
    mousePressed:false
  }
  width = 1000;
  height = 1000;
  gridSize = 20;
  mouseDown = (loc)=>{
    var roundedLoc = roundPointToGridSize(loc,this.gridSize);
    this.setState({ tempPoint:{x:roundedLoc.x,y:roundedLoc.y } })
  }
  mouseUp = (loc)=>{
    var roundedLoc = roundPointToGridSize(loc,this.gridSize);
    if (!isSamePoint(roundedLoc,this.state.tempPoint)) {
      this.setState({tempPoint:null,lines:this.state.lines.concat([{p1:this.state.tempPoint,p2:roundedLoc}])});
    }else{
      this.setState({tempPoint:null});
    }
  }
  mouseMove = (loc)=>{
    var roundedLoc = roundPointToGridSize(loc,this.gridSize);
      this.setState({mousePoint:{x:roundedLoc.x,y:roundedLoc.y}});
  }
  mouseLeave = (loc)=>{
    this.setState({tempPoint:null});
  }
 render(){
   var gridlines = [];
   for (var x = 0; x < this.width; x+=this.gridSize) {
     gridlines.push(<Line p1={{x:x,y:0}} p2={{x:x,y:this.height}} key={`x:${x}`} className="gridline"/>)
   }
   for (var y = 0; y < this.height; y+=this.gridSize) {
     gridlines.push(<Line p1={{x:0,y:y}} p2={{x:this.width,y:y}} key={`y:${y}`} className="gridline"/>)
   }
   var lines = this.state.lines.map((line,i)=>{
     return <Line p1={line.p1} p2={line.p2} key={i}/>
   })
   if(this.state.tempPoint){
     lines.push(<Line p1={this.state.tempPoint} p2={this.state.mousePoint} key={"mouse"} className="mouse-line"/>);
   }
   return (
     <div className="plan-container">
       <ResponsiveSvg
         className="plan-svg"
         onMouseDown={this.mouseDown}
         onMouseUp={this.mouseUp}
         onMove={this.mouseMove}
         onMouseLeave={this.mouseLeave}
         width={this.width} height={this.height}>
         {gridlines}
         {lines}
       </ResponsiveSvg>
     </div>
    )
 }
}
export default Plan;


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
