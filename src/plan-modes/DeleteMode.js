import React from 'react';
import PencilMode from './PencilMode';
import Circle from '../SvgComponents/Circle';
class DeleteMode extends PencilMode{


  mouseUp = (loc)=>{
    var originalLines = this.props.representation.lines;
    var originalLabels = this.props.representation.labels;
    var copiedLines = originalLines.slice().map((line)=>{
      return Object.assign({},line);
    });
    var copiedLabels = originalLabels.slice().map((label)=>{
      return Object.assign({},label)
    });
    var cursor = this.state.mousePoint;
    if(cursor){
      var lineDistObj = getClosestLineIndexAndDist(copiedLines,cursor);
      var lineIndex = lineDistObj.index;
      var lineDist = lineDistObj.dist;
      var labelDistObj = getClosetstLabelIndexAndDist(copiedLabels,cursor);
      var labelIndex = labelDistObj.index;
      var labelDist = labelDistObj.dist;
      if(lineIndex >= 0 && labelIndex >= 0){ // both exist
        if(lineDist <= labelDist){ //line is closer
          copiedLines.splice(lineIndex,1);
          this.props.changeState({lines:copiedLines})
        }else{ //label is closer
          copiedLabels.splice(labelIndex,1);
          this.props.changeState({labels:copiedLabels})
        }
      }else if (lineIndex >=0) { //only lines exist
        copiedLines.splice(lineIndex,1);
        this.props.changeState({lines:copiedLines})
      }else if (labelIndex >=0){ //only labels exist
        copiedLabels.splice(labelIndex,1);
        this.props.changeState({labels:copiedLabels})
      }

    }
  }
  buildChildren = ()=>{
    var {lines,labels} = this.getRepresentaion();
    var LineCircles = lines.map((line)=>{

      var middle = getLineMiddle(line);
      return <Circle point={middle} radius={5} style={line.color ? {fill:line.color}: {}}/>;
    });
    var LabelCircles = labels.map((label)=>{
      return <Circle point={label.origin} radius={5} style={label.color ? {fill:label.color}: {}}/>;
    });
    var circles = [];
    return circles.concat(LineCircles).concat(LabelCircles);
  }

  getRepresentaion = ()=>{

    var originalLines = this.props.representation.lines || [];
    var originalLabels = this.props.representation.labels || [];
    var copiedLines = originalLines.slice().map((line)=>{
      return Object.assign({},line);
    });
    var copiedLabels = originalLabels.slice().map((label)=>{
      return Object.assign({},label)
    });
    var cursor = this.state.mousePoint;
    if(cursor){
      var lineDistObj = getClosestLineIndexAndDist(copiedLines,cursor);

      var lineIndex = lineDistObj.index;
      var lineDist = lineDistObj.dist;
      var labelDistObj = getClosetstLabelIndexAndDist(copiedLabels,cursor);
      var labelIndex = labelDistObj.index;
      var labelDist = labelDistObj.dist;

      if(lineIndex >= 0 && labelIndex >= 0){ // both exist

        if(lineDist <= labelDist){ //line is closer

          copiedLines[lineIndex].color = "red";
        }else{ //label is closer
            copiedLabels[labelIndex].color = "red";

        }
      }else if (lineIndex >=0) { //only lines exist

        copiedLines[lineIndex].color = "red";
      }else if (labelIndex >=0){ //only labels exist
        copiedLabels[labelIndex].color = "red";

      }else{

      }

    }

    return {lines:copiedLines,labels:copiedLabels};
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
function getClosestLineIndexAndDist(lines,cursor){
  if(lines.length === 0){
    return {index:-1,dist:undefined};
  }
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

  return {index:index,dist:smallestDist};

}
function getClosetstLabelIndexAndDist(labels,cursor){
  if(labels.length === 0){
    return {index:-1,dist:undefined};
  }
  var firstLabel = labels[0];
  var smallestDist = dist(firstLabel.origin,cursor);
  var index = 0;

  for (var i = 1; i < labels.length; i++) {
    var distance = dist(labels[i].origin,cursor);
    if(distance < smallestDist){
      smallestDist = distance;
      index=i;
    }
  }

  return {index:index,dist:smallestDist};


}
function dist(p1,p2){
  return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}
