import React from 'react';
import ResponsiveSvg from './SvgComponents/ResponsiveSvg';
import Line from './SvgComponents/Line';
import './css/Plan.css';


class Plan extends React.Component{

  render(){
    var height = this.props.height || 1000;
    var width = this.props.width  || 1000;
    var gridSize = this.props.gridSize || 20;

    var gridlines = [];
    for (var x = 0; x < width; x+=gridSize) {
      gridlines.push(<Line p1={{x:x,y:0}} p2={{x:x,y:height}} key={`x:${x}`} className="gridline"/>)
    }
    for (var y = 0; y < height; y+=gridSize) {
      gridlines.push(<Line p1={{x:0,y:y}} p2={{x:width,y:y}} key={`y:${y}`} className="gridline"/>)
    }
    const lines = this.props.representation.lines || [];
    const lineItems = lines.map((line,index)=>{
      return <Line p1={line.p1} p2={line.p2} key={index}/>
    })
    return (
      <div className="plan-container">
        <ResponsiveSvg className="plan-svg" {...this.props}>
          {gridlines}
          {lineItems}
          {this.props.children}
        </ResponsiveSvg>
      </div>
    )
  }
}
export default Plan;
