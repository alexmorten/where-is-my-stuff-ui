import React from 'react';

class ResponsiveSvg extends React.Component{

  mouseHandlerFactory = (func)=>{
    return (e)=>{
      var loc = cursorPoint(this.svg,e);
      console.log(loc);
      if(func){
        func(loc);
      }
    }
  }
render(){
  return(
    <svg
      viewBox={`0 0 ${this.props.width || 1000} ${this.props.height || 1000}`}
      preserveAspectRatio="xMinYMin meet"
      className={`responsive-svg ${this.props.className || "" }`}
      ref={(element)=>{this.svg = element;}}
      onMouseDown={this.mouseHandlerFactory(this.props.onMouseDown)}
      onMouseMove={this.mouseHandlerFactory(this.props.onMove)}
      onMouseUp={this.mouseHandlerFactory(this.props.onMouseUp)}
      onMouseLeave={this.mouseHandlerFactory(this.props.onMouseLeave)}
      

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
