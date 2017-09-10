import React , {Component} from 'react';
import Store from './services/Store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Link,withRouter} from 'react-router-dom';
import queryString from 'query-string';
import StorageAdaptor from './services/StorageAdaptor';
import './css/Login.css';
import Paper from 'material-ui/Paper';
class Login extends Component{
  state={
    loading:false,
    email:"",
    password:"",
    failed:false,
    errors:{}
  }
  onEmailChange = (e)=>{
    e.preventDefault();
    this.setState({
      email:e.target.value
    });
  }
  onPasswordChange = (e)=>{
    e.preventDefault();
    this.setState({
      password:e.target.value
    });
  }
  shouldButtonBeDisabled = ()=>{
    if(this.state.email && this.state.password){
      return false;
    }else{
      return true;
    }
  }
  handleSubmit = (e)=>{
    console.log("submited");
    e.preventDefault();
    if(this.state.email && this.state.password){
      this.setState({loading:true});
      Store.authenticate(this.state.email,this.state.password,(responseBody)=>{
        this.setState({loading:false});
        this.props.history.push("/");
        this.props.history.goForward();
      },(failResponse)=>{
        console.log(failResponse);
        this.setState({loading:false});
        failResponse.json().then((failBody)=>{
          console.log(failBody);
          this.setState({
            failed:true,
            errors:failBody.errors
          });

        });
      });
    }
  }
  componentDidMount(){
    var params = queryString.parse(window.location.search)

    if (params["token"] && params["uid"] && params["client_id"] && params["expiry"]) {

      var auth_details = {};
      auth_details["access-token"]=params["token"];
      auth_details["uid"]=params["uid"];
      auth_details["client"]=params["client_id"];
      auth_details["expiry"]=params["expiry"];
      auth_details["token-type"]="Bearer";
      StorageAdaptor.setObject("auth_details",auth_details);
      StorageAdaptor.setItem("authenticated","true");

      this.props.history.push("/");
      this.props.history.goForward();
    }
  }
  render(){
  //  console.log(this.props);
    const style={
      container: {
      position: 'relative',
      },
    refresh: {
      display: 'inline-block',
      position: 'absolute',
      },
    };
    var loadingIndicator=(<div></div>);
    if(this.state.loading){
      loadingIndicator = (<RefreshIndicator
        size={40}
        top={-10}
        left={250}
        status="loading"
         style={style.refresh}
      />);
    }
    var errors = (<div></div>);
    if(this.state.failed){
      errors = this.state.errors.map((error)=>{
      return (  <span key={error} className="error">{error}</span>);
      });
    }

    return(
      <Paper className="login-form-container">
        <form className="login-form" style={style.container} >
          <h2 className="nice-heading">Login</h2>
          <TextField  floatingLabelText="Email" type="email" value={this.state.email} onChange={this.onEmailChange}/>
          <br/>
          <TextField floatingLabelText="Password" type="password" value={this.state.password} onChange={this.onPasswordChange}/>
          <br/>
          <RaisedButton label="Login" disabled={this.shouldButtonBeDisabled()} onClick={this.handleSubmit} primary/>
          <br/>
          {errors}
          <br/>
          <span className="register-message"> <Link to="/register">You dont have an account yet?</Link> </span>
          {loadingIndicator}

        </form>
      </Paper>
    );
  }
}
export default withRouter(Login);
