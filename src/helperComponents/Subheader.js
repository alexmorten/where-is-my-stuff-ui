import React from 'react';
import '../css/Subheader.css';
class Subheader extends React.Component{
render(){
  return(
    <div className="subheader">
      {this.props.children}
    </div>
  )
}
}
export default Subheader;
