import React from 'react';
import '../css/Line.css';
class Line extends React.Component{
  render(){
    var p1 = this.props.p1, p2 = this.props.p2;
    return  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={`line ${this.props.className || ""}`} />
  }
}
export default Line;
