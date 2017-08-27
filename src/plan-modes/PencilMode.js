import React from 'react';
import Plan from '../Plan';
import Line from '../SvgComponents/Line';
class PencilMode extends React.Component{ //Basis for future Modes, edit carefully!
  state={
    tempPoint:null,
    mousePoint:null,
  }
  mouseDown = (loc)=>{
    var roundedLoc = this.roundPointToGridSize(loc,this.props.gridSize);
    this.setState({ tempPoint:{x:roundedLoc.x,y:roundedLoc.y } })
  }
  mouseUp = (loc)=>{
    var lines = this.props.representation.lines;
    if(this.state.tempPoint){
      var roundedLoc = this.roundPointToGridSize(loc,this.props.gridSize);
      if (!this.isSamePoint(roundedLoc,this.state.tempPoint)) {
        this.setState({tempPoint:null});
        this.props.changeState({lines:lines.concat([{p1:this.state.tempPoint,p2:roundedLoc}])})
      }else{
        this.setState({tempPoint:null});
      }
    }

  }
  mouseMove = (loc)=>{

    var roundedLoc = this.roundPointToGridSize(loc,this.props.gridSize);
      this.setState({mousePoint:{x:roundedLoc.x,y:roundedLoc.y}});
  }
  mouseLeave = (loc)=>{
    this.setState({tempPoint:null});
  }
  buildChildren = ()=>{
    var mouseLine;
     if(this.state.tempPoint){
       mouseLine = <Line p1={this.state.tempPoint} p2={this.state.mousePoint} key={"mouse"} className="mouse-line"/>;
     }
     return mouseLine
  }
  render(){

    return(
      <Plan representation={{lines:(this.getLines ? this.getLines() : this.props.representation.lines)}}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMove={this.mouseMove}
        onMouseLeave={this.mouseLeave}
        width={this.props.width} height={this.props.height} gridSize={this.props.gridSize}
        actionBar={this.props.actionBar}
        >
          {this.buildChildren()}
        </Plan>
    )
  }
  //helper funcs
  roundToGridSize(num){
    return Math.round(num/this.props.gridSize)*this.props.gridSize;
  }
  roundPointToGridSize(point){
    var newPoint = {
      x:this.roundToGridSize(point.x,this.props.gridSize),
      y:this.roundToGridSize(point.y,this.props.gridSize)
    };
    return newPoint;
  }
  isSamePoint(p1,p2){
    return (p1.x === p2.x && p1.y === p2.y);
  }
}
export default PencilMode;
