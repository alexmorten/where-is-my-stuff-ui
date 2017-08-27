import React from 'react';
import '../css/Circle.css';
class circle extends React.Component{
  render(){
    const {point,radius,className,...rest} = this.props;
    return  <circle cx={point.x} cy={point.y} r={radius} className={`circle ${className || ""}`} {...rest} />
  }
}
export default circle;
