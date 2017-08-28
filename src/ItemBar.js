import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
import LimitedText from './helperComponents/LimitedText';
import Divider from 'material-ui/Divider';
import './css/ItemBar.css';
import TextField from 'material-ui/TextField';

class Item extends React.Component{
  onClick=()=>{
    if(this.props.onClick){
      this.props.onClick(this.props.item);
    }
  }
render(){
  var {item,className,onClick,...rest} = this.props;
  return(
  <div>
        <Divider/>
  <div className={`item ${className}`} onClick={this.onClick} {...rest}>

    <h4 className="nice-heading">{item.name}</h4>
    <p> <LimitedText text={item.description} className="item-description"/></p>
  </div>
  </div>
  )
}
}

class ItemBar extends AuthComponent {
  state = {
    query:"",
  }

  onQueryChange=(e)=>{
    e.preventDefault();
    this.setState({query:e.target.value});
    this.getItems(e.target.value);
  }
  getItems(query=this.state.query){
    var url = (this.props.plan ? `plans/${this.props.plan.id}/items` : "items");
    this.query(url,{query:query},(items)=>{
      this.props.onChange(items);
    },(fail)=>{
      console.log(fail);
    })
  }
  componentDidMount(){
    this.getItems();
  }
render(){
  var items = this.props.items.map((item)=>{
    return <Item item={item} key={item.id} onClick={this.props.onItemClick} className={isSelected(this.props.selectedItems,item) ? "item-selected" : ""}/>
  });
  var noItemMessage;
  if(items.length == 0){
    noItemMessage = (
      <div>
      <Divider/>
      <h4 className="nice-heading">No Items Found</h4>
      </div>
    )
  }
  return (
    <Paper className="item-bar">
      <div className="seach-section">
        <TextField value={this.state.query} onChange={this.onQueryChange} hintText="Search"/>
      </div>
      <div className="item-bar-body">
        {items}
        {noItemMessage}
      </div>
    </Paper>
  )
}
}
export default ItemBar;

function isSelected(selectedItems,item){
  var filtered = selectedItems.filter((selItem)=>{
    return selItem.id === item.id;
  });
  return filtered.length > 0
}
