import React ,{ Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class BasicDeleteDialogButton extends Component {
  state = {
    dialogOpen:false
  }
  openDeleteDialog = (e)=>{
    e.preventDefault();
    this.setState({dialogOpen:true});
    }
  handleDialogClose = (e)=>{
    e.preventDefault();
    this.setState({dialogOpen:false});
  }
  handleDialogSubmit = (e)=>{
    e.preventDefault();
    this.setState({dialogOpen:false});
    this.props.delete();
  }
  render(){
    var actions=[
      <FlatButton
          label="Cancel"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleDialogClose}
        />,
        <FlatButton
          label="Delete"
          backgroundColor={"#f65656"}
          hoverColor={"#db0909"}
          onClick={this.handleDialogSubmit}
          />,
    ]
    return (
      <div>
      <a className={this.props.iconClassName} onClick={this.openDeleteDialog}><FontIcon className={`material-icons ${this.props.rootClassName}`}>delete_forever</FontIcon></a>
      <Dialog
        title={this.props.title}
        open={this.state.dialogOpen}
        modal={false}
        actions={actions}
        >
        You are about to delete "{this.props.itemTitle}". Are you sure?
      </Dialog>
      </div>
    );
  }
}
export default BasicDeleteDialogButton;
