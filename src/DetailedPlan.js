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
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';

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
    for (var j = 0; j < indexesToRemove.length; j++) {
      selectedItemsCopy.splice(indexesToRemove[j],1);
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
  handleDelete=()=>{
    var plan = this.state.plan;
    this.delete(`plans/${plan.id}`,()=>{
      this.props.history.push("/");
      this.props.history.goForward();
    },(fail)=>{console.log(fail);})
  }
  render(){
    if (this.state.loading) {
      return <Loading />
    }
    var plan = this.state.plan;
    var selectedCirlces = this.state.items.filter((item)=>isItemInItemArr(item,this.state.selectedItems)).map((item)=>{
      return <Circle
        point={{x:item.representation.x,y:item.representation.y}}
        radius={12}
        style={{stroke:'black',strokeWidth:2}}
        onClick={()=>{this.onItemClick(item)}}
        className="interactable"/>
    });
    var otherCircles  = this.state.items.filter((item)=>!isItemInItemArr(item,this.state.selectedItems)).map((item)=>{

      return <Circle
         point={{x:item.representation.x,y:item.representation.y}}
        radius={ 7}
        onClick={()=>{this.onItemClick(item)}}
        className="interactable"/>
    })
    return (
      <div>
        <Subheader>
          <BackIcon rootStyle={{float:"left"}}/>
          <Link to={`/plans/new/${plan.id}`}>  <RaisedButton primary={true} label={`Add an Item`} style={{float:"right"}}/> </Link>
        </Subheader>
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
            <BasicDeleteDialogButton title="Delete Plan" itemTitle={plan.name} delete={this.handleDelete} iconClassName="top-right"/>
            <h2 className="nice-heading">{plan.name}</h2>
            <Plan representation={plan.representation}>
              {otherCircles}
              {selectedCirlces}
            </Plan>


          </Paper>
        </div>
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
