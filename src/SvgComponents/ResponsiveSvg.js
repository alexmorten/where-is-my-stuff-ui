import React from 'react';

class ResponsiveSvg extends React.Component{
  mouseHandler= (e)=>{
    var loc = cursorPoint(this.svg,e)
    console.log(loc);
    if(this.props.onClick){
      this.props.onClick(loc);
    }
  }
render(){
  return(
    <svg
      viewBox={`0 0 ${this.props.width || 1000} ${this.props.height || 1000}`}
      preserveAspectRatio="xMinYMin meet"
      className={`responsive-svg ${this.props.className || "" }`}
      ref={(element)=>{this.svg = element;}}
      onClick={this.mouseHandler}


      >
      {this.props.children}
    </svg>
  )
}
}
export default ResponsiveSvg;


function cursorPoint(svg,evt){
  var pt = svg.createSVGPoint();
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
