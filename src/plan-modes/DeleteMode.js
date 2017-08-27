import React from 'react';
import PencilMode from './PencilMode';
import Circle from '../SvgComponents/Circle';
class DeleteMode extends PencilMode{

  mouseUp = (loc)=>{
    var lines = this.getLines();
    if(lines.length > 0){
      var roundedLoc = this.roundPointToGridSize(loc,this.props.gridSize);

      var deleteIndex = getClosestLineIndex(lines,roundedLoc);
      if(deleteIndex >=0){
        lines.splice(deleteIndex,1);
        this.props.changeState({lines:lines})
      }
    }

  }
  buildChildren = ()=>{
    var lines = this.getLines();
    var circles = lines.map((line)=>{
      var middle = getLineMiddle(line);

      return <Circle point={middle} radius={5} style={line.color ? {fill:line.color}: {}}/>;
    });

  return circles;
  }
  getLines = ()=>{

    var originalLines = this.props.representation.lines;
    var copiedLines = originalLines.slice().map((line)=>{
      return Object.assign({},line);
    });
    var cursor = this.state.mousePoint;
    if(cursor && copiedLines.length > 0){
      var index = getClosestLineIndex(copiedLines,cursor);
      if(index >=0){
        copiedLines[index].color = "red";
      }

    }

    return copiedLines;
  }

}
export default DeleteMode;

function getLineMiddle(line){
  var middle = {
    x: (line.p1.x+line.p2.x)/2,
    y: (line.p1.y+line.p2.y)/2
  };
  return middle;
}
function getClosestLineIndex(lines,cursor){
  var firstLine = lines[0];
  var smallestDist = dist(getLineMiddle(firstLine),cursor);
  var index = 0;

  for (var i = 1; i < lines.length; i++) {
    var distance = dist(getLineMiddle(lines[i]),cursor);
    if(distance < smallestDist){
      smallestDist = distance;
      index=i;
    }
  }
  return index;

}
function dist(p1,p2){
  return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}
