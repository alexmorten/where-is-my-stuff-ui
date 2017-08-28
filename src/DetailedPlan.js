import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
import Loading from './helperComponents/Loading';
import Plan from './Plan';
import './css/DetailedPlan.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Circle from './SvgComponents/Circle';
import ItemBar from './ItemBar';
class DetailedPlan extends AuthComponent{
  state={
    plan:null,
    items:[],
    selectedItems:[],
    loading:true
  }
  getPlan=()=>{
    var id = this.props.match.params.plan_id;

    this.find(`plans/${id}`,(plan)=>{
      this.setState({plan:plan,loading:false});
    },(fail)=>{
      console.log(fail);
      this.props.history.push("/");
      this.props.history.goForward();
    })
  }
  componentDidMount(){
    this.getPlan();
  }
  onItemChange = (items)=>{
    var selectedItemsCopy = this.state.selectedItems.slice();
    var indexesToRemove=[];
    for (var i = 0; i < selectedItemsCopy.length; i++) {
      if (!isItemInItemArr(selectedItemsCopy[i],items)) {
        indexesToRemove.push(i);
      }
    }
    for (var i = 0; i < indexesToRemove.length; i++) {
      selectedItemsCopy.splice(indexesToRemove[i],1);
    }
    this.setState({items:items,selectedItems:selectedItemsCopy});
  }
  onItemClick = (item)=>{
    var selectedItems = this.state.selectedItems;
    if(isItemInItemArr(item,selectedItems)){
      var itemIndex = selectedItems.indexOf(item);
      var selectedItemsCopy = selectedItems.slice();
      selectedItemsCopy.splice(itemIndex,1);
      this.setState({selectedItems:selectedItemsCopy});
    }else{
      this.setState({selectedItems:selectedItems.concat([item])})
    }
  }

  render(){
    if (this.state.loading) {
      return <Loading />
    }
    var plan = this.state.plan;
    var selectedCirlces = this.state.items.filter((item)=>isItemInItemArr(item,this.state.selectedItems)).map((item)=>{
      return <Circle point={{x:item.representation.x,y:item.representation.y}} radius={10} style={{stroke:'black',strokeWidth:2} }/>
    });
    var otherCircles  = this.state.items.filter((item)=>!isItemInItemArr(item,this.state.selectedItems)).map((item)=>{

      return <Circle point={{x:item.representation.x,y:item.representation.y}} radius={ 5}/>
    })
    return (
      <div className="detailed-plan-container">
        <ItemBar
           onChange={this.onItemChange}
           items={this.state.items}
           plan={plan}
           selectedItems={this.state.selectedItems}
           onItemClick={this.onItemClick}
           getItems={this.getItems}
         />
        <Paper className="detailed-plan">
          <h2 className="nice-heading">{plan.name}</h2>
          <Plan representation={plan.representation}>
            {otherCircles}
            {selectedCirlces}
          </Plan>

        <Link to={`/plans/new/${plan.id}`}>  <RaisedButton primary={true} label={`Add an Item to "${plan.name}"`}/> </Link>
        </Paper>
      </div>
    )
  }
}
export default DetailedPlan;

function isItemInItemArr(item,itemArr){
  var filtered = itemArr.filter((arrItem)=>{
    return arrItem.id === item.id;
  });
  return filtered.length > 0
}
