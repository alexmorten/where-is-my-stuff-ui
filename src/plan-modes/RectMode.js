import React from 'react';
import PencilMode from './PencilMode';
import Line from '../SvgComponents/Line';
class RectMode extends PencilMode{
  mouseUp = (loc)=>{
    var lines = this.props.representation.lines || [];
    if(this.state.tempPoint){
      var roundedLoc = this.roundPointToGridSize(loc,this.props.gridSize);
      if (!this.isSamePoint(roundedLoc,this.state.tempPoint)) {
        this.setState({tempPoint:null});
        this.props.changeState({lines:lines.concat(getLinesForRect({p1:this.state.tempPoint,p2:roundedLoc}))})

      }else{
        this.setState({tempPoint:null});
      }
    }
  }
  buildChildren = ()=>{
    var mouseRectLines=[];
    var mouseRectLineItems=[];
     if(this.state.tempPoint){
      mouseRectLines = getLinesForRect({p1:this.state.tempPoint,p2:this.state.mousePoint});
      mouseRectLineItems = mouseRectLines.map((line,index)=>{
        return <Line p1={line.p1} p2={line.p2} key={`mouse ${index}`} className="mouse-line"/>
      })
     }
     return <g> {mouseRectLineItems} </g>
  }


}
export default RectMode;

function getLinesForRect(rect){ //rect = {p1:...p2:...}
  var lines = [];
  lines.push({ p1:rect.p1, p2:{x:rect.p2.x,y:rect.p1.y} });
  lines.push({ p1:rect.p1, p2:{x:rect.p1.x,y:rect.p2.y} });
  lines.push({ p1:rect.p2, p2:{x:rect.p1.x,y:rect.p2.y} });
  lines.push({ p1:rect.p2, p2:{x:rect.p2.x,y:rect.p1.y} });
  return lines;
}
