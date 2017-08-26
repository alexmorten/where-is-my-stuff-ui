import React from 'react';
import '../css/Line.css';
class Line extends React.Component{
  render(){
    const {p1,p2,className,...rest} = this.props;
    return  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={`line ${className || ""}`} {...rest} />
  }
}
export default Line;
