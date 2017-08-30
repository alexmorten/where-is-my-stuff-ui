import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

class BackIcon extends React.Component{
  render(){
    var iconStyle={
      color:"white",
      fontSize:40,
      lineHeight:"20px",
      top:"8px",
      position:"relative"
    }
    var textStyle = Object.assign({},iconStyle);
    textStyle = Object.assign(textStyle,{
      fontSize:25,
      top:-3,
      right:7
    })
    return (
      <span className={this.props.rootClassName || ""} style={this.props.rootStyle}>
        <Link to={this.props.to || "/"}>
          <FontIcon
             className={`material-icons back-icon ${this.props.iconClassName}`}
              style={iconStyle}>
              navigate_before
            </FontIcon>
          <span style={textStyle}>{this.props.text}</span>
        </Link>
      </span>
    )
  }
}
export default BackIcon;
