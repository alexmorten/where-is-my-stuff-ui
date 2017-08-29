import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

class BackIcon extends React.Component{
  render(){
    return (
      <span className={this.props.rootClassName || ""} style={this.props.rootStyle}>
        <Link to={this.props.to || "/"}>
          <FontIcon className={`material-icons back-icon ${this.props.iconClassName}`} style={{color:"white",fontSize:40,lineHeight:"20px",top:"8px"}}>navigate_before</FontIcon>
        </Link>
      </span>
    )
  }
}
export default BackIcon;
