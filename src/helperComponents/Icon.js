import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import '../css/Icon.css';
class Icon extends React.Component{
  onClick = (e)=>{
    e.preventDefault();
    if(this.props.onClick){
      this.props.onClick(this.props.name);
    }
  }
render(){
  var {icon,className,onClick,...rest} = this.props;
    return (<FontIcon onClick={this.onClick} className={`material-icons icon ${className || ""}`} {...rest}>{icon}</FontIcon>);
}
}
export default Icon;
