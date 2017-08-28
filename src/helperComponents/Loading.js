import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Loading extends Component{
  render(){
    return(
      <div>
        <RefreshIndicator status="loading" size={40} top={0} left={0} style={{position:"relative"}}/>
      </div>
    );
  }
}
export default Loading;
