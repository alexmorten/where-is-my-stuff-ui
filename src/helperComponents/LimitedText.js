import React from 'react'

class LimitedText extends React.Component {
  state={
    open:false
  }
  handleOpen = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    this.setState({open:true})
  }
  handleClose = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    this.setState({open:false})
  }
  render(){
    var {text,charLimit=100,...rest} = this.props;

    if(text.length < charLimit ){
      return   <span {...rest}>{text}</span>
    }

    var wordArr = text.split(" ");
    var newText = "";

    for (var i = 0; i < wordArr.length; i++) {
      if(newText.length + wordArr[i].length + 1 <= charLimit){
        newText += " " +  wordArr[i] ;
      }
    }
    var showMore;
    var textItem;
    if(!this.state.open){
      showMore =  <span style={{color:"#5581ec",cursor:"pointer"}} onClick={this.handleOpen}> ... </span>
      textItem = <span>{text.slice(0,newText.length)}</span>
    }
    var showLess;
    if(this.state.open){
      showLess = <span style={{color:"#5581ec",cursor:"pointer"}} onClick={this.handleClose}> show less <br/></span>
      textItem = <span>{text}</span>
    }
    return(
      <span>
        <span {...rest}>
          {showLess}
          {textItem}
          {showMore}
        </span>
      </span>
    )
  }
}
export default LimitedText;
