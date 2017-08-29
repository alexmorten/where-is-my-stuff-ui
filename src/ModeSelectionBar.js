import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Icon from './helperComponents/Icon';
import './css/ModeSelectionBar.css';
class ModeSelectionBar extends React.Component{
  onIconClick = (name)=>{
    var mode = this.props.mode;
    if(name !== mode){
      this.props.onChange(name)
    }
  }
  render(){
    var mode = this.props.mode;
    return (
      <div className="mode-selection-bar">
        <Icon name="pencil" onClick={this.onIconClick} icon="edit" className={mode === "pencil" ? "active": ""}/>
        <Icon name="rect" onClick={this.onIconClick} icon="crop_square" className={mode === "rect" ? "active": ""}/>
        <Icon name="label" onClick={this.onIconClick} icon="title" className={mode === "label" ? "active": ""}/>
        <Icon name="delete" onClick={this.onIconClick} icon="delete" className={mode === "delete" ? "active": ""}/>
      </div>
    )
  }
}
export default ModeSelectionBar;
