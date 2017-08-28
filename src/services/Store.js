import StorageAdaptor from './StorageAdaptor';

var API_URL = "https://where-is-my-stuff-api.herokuapp.com/";
if(process.env.NODE_ENV === "development"){
   API_URL = "http://localhost:3000/";

}

const AUTH_URL = API_URL+"auth/";


function receive(url,cb,fail,disableCache){
  if(!isAuthenticated()){
    return "login"; //meaning a need to transition to Login
  }
  if(!disableCache){
    StorageAdaptor.getResultFromCache(url,cb);
  }
  var receiveHeaders = {
    accept: 'application/json',
  };
  var completeHeaders = constructHeadersForRequest(receiveHeaders);

  fetch(API_URL+url,{
    headers:completeHeaders
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((answer)=>{
    if(!answer.error){
      if(!disableCache){
      StorageAdaptor.cacheResult(url,answer);
      }
      cb(answer);
    }else if (fail) {
      fail(answer);
    }
  });
}
function query(url,paramsObj,cb,fail,disableCache){
  if(!isAuthenticated()){
    return "login"; //meaning a need to transition to Login
  }
  if(!disableCache){
    StorageAdaptor.getResultFromCache(url,cb);
  }
  var headers = {
    accept: 'application/json',
  };
  var completeHeaders = constructHeadersForRequest(headers);
  fetch(API_URL+url+constructQueryParams(paramsObj),{
    headers:completeHeaders
  }).then(checkStatus)
    .then(parseJSON)
    .then((answer)=>{
      if(!answer.error){
        if(!disableCache){
        StorageAdaptor.cacheResult(url,answer);
        }
        cb(answer);
      }else if (fail) {
        fail(answer);
      }
    });



}
function send(url,obj,cb,fail){
  if(!isAuthenticated()){
    return "login";
  }

  var sendHeaders = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var completeHeaders=constructHeadersForRequest(sendHeaders);
  fetch(API_URL+url,{
    headers: completeHeaders,
    method:"post",
    body:JSON.stringify(obj)
  }).then(checkStatus)
  .then(parseJSON)
  .then((answer)=>{
    if(!answer.error){
      cb(answer);
    }else if (fail) {
      fail(answer);
    }
  });
}
function promiseSend(url,obj){
  if(!isAuthenticated()){
    return "login";
  }

  var sendHeaders = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var completeHeaders=constructHeadersForRequest(sendHeaders);
return fetch(API_URL+url,{
    headers: completeHeaders,
    method:"post",
    body:JSON.stringify(obj)
  }).then(checkStatus)
  .then(parseJSON);
}
function update(url,obj,cb,fail){
  if(!isAuthenticated()){
    return "login";
  }
  var sendHeaders = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var completeHeaders=constructHeadersForRequest(sendHeaders);
  fetch(API_URL+url,{
    headers: completeHeaders,
    method:"put",
    body:JSON.stringify(obj)
  }).then(checkStatus)
  .then(parseJSON)
  .then((answer)=>{
    if(!answer.error){
      cb(answer);
    }else if (fail) {
      fail(answer);
    }
  });
}
function destroy(url,cb,fail){
  if(!isAuthenticated()){
    return "login";
  }
  fetch(API_URL+url,{
    headers:constructHeadersForRequest({}),
    method:"delete"
  }).then((checkStatus))
  .then((answer)=>{
    if(!answer.error){
      cb(answer);
    }else if (fail) {
      fail(answer);
    }
  });
}


function checkStatus(response) {

  if (response.ok) {
    //  setNewAuthDetails(response.headers);
    return response;
  }else if (response.status === 401) {
    deauthenticate();
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  //throw error;

}

function deauthenticate(){
  StorageAdaptor.remove("current_user_data");
  StorageAdaptor.remove("authenticated");
  StorageAdaptor.remove("auth_details");
  //TODO: transition to login page
}
function authenticate(email,password,cb,fail){
  fetch(AUTH_URL+"sign_in?email="+email+"&password="+password,{
    method:"post",
  }).then((response)=>{
    if (!response.ok) {
      if(fail){
        fail(response);
      }
      return;
    }
    setNewAuthDetails(response.headers);
    response.json().then((responseBody)=>{

      StorageAdaptor.setObject("current_user_data",responseBody.data);
      StorageAdaptor.setItem("authenticated","true");

      if(cb){
        cb(responseBody);
      }
    });
  });
}
function registrate(details,cb,fail){
  var queryString=constructQueryParams(details);

  fetch(AUTH_URL+queryString,{
    method:"post"
  }).then((response)=>{
    if (!response.ok) {
      if(fail){fail(response)}
      return;
    }else{
      response.json().then((responseBody)=>{
        cb(responseBody);
      });
    }
  });
}

function extractAuthDetails(headers){
  var authDetails = {};
  authDetails["access-token"]=headers.get("access-token");
  authDetails["expiry"]=headers.get("expiry");
  authDetails["uid"]=headers.get("uid");
  authDetails["client"]=headers.get("client");
  authDetails["token-type"]=headers.get("token-type");

  return authDetails;
}

function setNewAuthDetails(headers){
  if(headers.get("access-token")){

    //deauthenticate();
    var authDetails = extractAuthDetails(headers);
    StorageAdaptor.setObject("auth_details",authDetails);
  }
}
function getCurrentUserDetails(){
  return StorageAdaptor.getObject("current_user_data");
}
function updateCurrentUserDetails(){
  if (!isAuthenticated()) {
    return
  }
    var currentUserData = getCurrentUserDetails();
    receive(`users/${currentUserData.id}`,(newDetails)=>{
      StorageAdaptor.setObject("current_user_data",newDetails);
    },(fail)=>{},true);


}
function isAuthenticated(){

  return StorageAdaptor.getItem("authenticated") === "true";
}
function constructHeadersForRequest(headers1){
  
  var authentication_headers=StorageAdaptor.getObject("auth_details");
  var headers = Object.assign(headers1,authentication_headers);

  return headers;
}

function parseJSON(response) {
  if(response){
    return response.json();
  }else{
    return {error:"error"};
  }

}
function constructQueryParams(params){
  var paramsArr = [];
  for (var key in params){
    paramsArr.push({
      key:key,
      value:params[key]
    });
  }
  if (paramsArr.length === 0) {
    return "";
  }
  var firstParam = paramsArr.shift();

  var queryString="?"+firstParam.key+"="+firstParam.value;
  for (var indx in paramsArr){

    queryString+="&"+paramsArr[indx].key+"="+paramsArr[indx].value;
  }

  return queryString;
}
const AuthStore = {
  authenticate,
  deauthenticate,
  receive,
  query,
  send,
  promiseSend,
  update,
  destroy,
  isAuthenticated,
  getCurrentUserDetails,
  updateCurrentUserDetails,
  constructQueryParams,
  registrate
  };
export default AuthStore;
