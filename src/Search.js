import React from 'react';
import ItemBar from './ItemBar';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';
class Search extends React.Component{
  state={
    items:[]
  }
  onItemChange=(items)=>{
    this.setState({items:items});
  }
  onItemClick = (item)=>{
    this.props.history.push(`plans/${item.plan.id}`);
    this.props.history.goForward();
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
