
import NewItem from './NewItem';

class ModifyItem extends NewItem{
  onSubmit = (e)=>{
    e.preventDefault();
    var name = this.state.name;
    var description = this.state.description;
    var x = this.state.x;
    var y = this.state.y;
    var plan_id = this.plan_id;
    var item = {
      name:name,
      description:description,
      plan_id:plan_id,
      representation:{
        x:x,
        y:y
      }
    }
    this.update(`items/${this.item_id}`,item,(answer)=>{
      this.transitionTo(`plans/${plan_id}`);
    },(fail)=>{
      this.transitionTo(`plans/${plan_id}`);
    })
  }
  componentDidMount(){
    this.heading = "Modify ...";
    this.plan_id = this.props.match.params.plan_id;
    this.getPlan();
    this.item_id = this.props.match.params.item_id;
    this.find(`items/${this.item_id}`,(item)=>{
      var name = item.name || "";
      this.heading = `Modify "${name}"`;
      var description = item.description || "";
      var x = item.representation.x;
      var y = item.representation.y;
      this.setState({
        name:name,
        description:description,
        x:x,
        y:y,
      })
    },(fail)=>{
      console.log(fail);
      this.transitionTo("");
    })
  }
}
export default ModifyItem;
