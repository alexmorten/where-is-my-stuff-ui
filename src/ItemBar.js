import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
import LimitedText from './helperComponents/LimitedText';
import Divider from 'material-ui/Divider';
import './css/ItemBar.css';
import TextField from 'material-ui/TextField';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton'
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
    <BasicDeleteDialogButton
      title="Delete Item"
      itemTitle={item.name}
      delete={()=>{this.props.onDelete(item)}}
      iconClassName="top-right"
      rootClassName="item-delete"/>
    <Link to={`/plans/${item.plan.id}/items/${item.id}/modify`} style={{position:"absolute",left:"0",top:"0"}}>
      <FontIcon className="material-icons item-modify" >edit</FontIcon>
    </Link>
    <h3 className="nice-heading">{item.name}</h3>
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
  handleDeleteItem=(item)=>{
    if(item){
      this.delete(`items/${item.id}`,()=>{
        this.getItems();
      },(fail)=>{
        console.log(fail);
        this.getItems();
      })
    }
  }
render(){
  var items = this.props.items.map((item)=>{
    return (
      <Item
        item={item}
        key={item.id}
        onClick={this.props.onItemClick}
        className={isSelected(this.props.selectedItems,item) ? "item-selected" : ""}
        onDelete={this.handleDeleteItem}/>)
  });
  var noItemMessage;
  if(items.length === 0){
    var itemAddMessage;
    if(this.props.plan && this.props.plan.id){
    itemAddMessage= (
     <p className="nice-heading">
        <Link to={`/plans/${this.props.plan.id}/items/new`}>
          <RaisedButton primary={true} label={`Add an Item`}/>
        </Link>
      </p> )
    }
    noItemMessage = (
      <div>
      <Divider/>
      <h2 className="nice-heading">No Items Found</h2>
      {itemAddMessage}
      </div>
    )
  }
  return (
    <Paper className="item-bar">
      <div className="seach-section">
        <TextField value={this.state.query}
          onChange={this.onQueryChange}
          hintText="Search"
          fullWidth={true}/>
        <Divider/>
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
