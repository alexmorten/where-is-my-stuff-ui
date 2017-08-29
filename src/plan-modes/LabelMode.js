import React from 'react';
import PencilMode from './PencilMode';

class LabelForm extends React.Component{
  componentDidMount(){
    this.input.focus(); //TODO: make this work somehow

  }
  render(){
    var buttonStyle = {
      backgroundColor:"black",
      color:"white",
      border:"1px solid white",
      borderRadius:"2px",
      margin:"3px",

    }
    return(
      <foreignObject x={this.props.formX} y={this.props.formY} width={500} height={50}>
        <form onSubmit={this.props.handleSubmit} style={{float:"left",marginTop:"-20px"}}>
          <input type="text" autoFocus value={this.props.labelText} onChange={this.props.handleTextChange} ref={(element)=>{this.input=element}}/>
          <button onClick={this.props.handleSubmit} style={buttonStyle} >save</button>
          <button onClick={this.props.handleCancel} style={buttonStyle} >cancel</button>


        </form>
      </foreignObject>
    )
  }
}

class LabelMode extends PencilMode{
  state={
    formOpen:false,
    formX:null,
    formY:null,
    labelText:""
  }
  handleSubmit = (e)=>{

    e.preventDefault();
    var {formOpen,formX,formY,labelText} = this.state;

    if(formOpen && formX && formY && labelText){
      var labels = this.props.representation.labels || [];
      var newLabel = {
        origin:{
          x:formX,
          y:formY
        },
        text:labelText
      };
      this.props.changeState({labels:labels.concat([newLabel])});
      this.setState({formOpen:false,labelText:""});
    }
  }
  handleCancel = (e)=>{
    e.preventDefault();
    this.setState({labelText:"",formOpen:false})
  }
  mouseDown = (loc)=>{

  }
  mouseUp = (loc)=>{
    if(!this.state.formOpen){
      this.setState({formOpen:true,formX:loc.x,formY:loc.y});
    }
  }
  mouseMove = ()=>{

  }
  handleTextChange = (e)=>{
    e.preventDefault();
    this.setState({labelText:e.target.value});
  }
  buildChildren = ()=>{
    var {formOpen,formX,formY,labelText} = this.state;
     if(formOpen && formX && formY){
       return <LabelForm
         formX={formX}
         formY={formY}
         labelText={labelText}
         handleTextChange={this.handleTextChange}
         handleSubmit={this.handleSubmit}
         handleCancel={this.handleCancel} />
     }
  }


}
export default LabelMode;
