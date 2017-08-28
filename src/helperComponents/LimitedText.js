import React from 'react'

class LimitedText extends React.Component {
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

    return(
      <span {...rest}>{text.slice(0,newText.length)} ...</span>
    )
  }
}
export default LimitedText;
