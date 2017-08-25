import React from 'react';
import ResponsiveSvg from './SvgComponents/ResponsiveSvg';
import Line from './SvgComponents/Line';
import './css/Plan.css'
class Plan extends React.Component{
  state={points:[
  

  ]}
  onClick = (loc)=>{
    this.setState({points:this.state.points.concat([{x:loc.x,y:loc.y}])})
  }
 render(){
   var lines = this.state.points.map((point,index)=>{
     return <Line p1={point} p2={getNextElement(this.state.points,index)} key={index}/>;
   });

   return (
     <div className="plan-container">
       <ResponsiveSvg className="plan-svg" onClick={this.onClick}>
         {lines}
       </ResponsiveSvg>
     </div>
    )
 }
}
export default Plan;

function getNextElement(arr, index){
  var nextIndex = (index+1) % arr.length
  return arr[nextIndex];
}
