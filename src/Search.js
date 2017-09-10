import React from 'react';
import ItemBar from './ItemBar';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';
import AuthComponent from './helperComponents/AuthComponent';
class Search extends AuthComponent{
  state={
    items:[]
  }
  onItemChange=(items)=>{
    this.setState({items:items});
  }
  onItemClick = (item)=>{
    this.transitionTo(`plans/${item.plan.id}`);
  }
  render(){
    return (
      <div>
        <Subheader>
          <BackIcon rootStyle={{float:"left"}} text="Plans"/>
        </Subheader>
      <ItemBar
       onChange={this.onItemChange}
       items={this.state.items}
       selectedItems={[]}
       onItemClick={this.onItemClick}
       showPlan={true}/>
       </div>
    )
  }
}
export default Search;
