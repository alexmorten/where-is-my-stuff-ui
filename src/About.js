import React from 'react';
import './css/About.css';
import Paper from 'material-ui/Paper';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';
class About extends React.Component{
render(){
  return (
    <div>
      <Subheader>
        <BackIcon rootStyle={{float:"left"}} text="Plans"/>
      </Subheader>
      <Paper className="about">
        <h1 className="nice-heading">What is this website about?</h1>
        <p className="nice-heading" >
          I’m sick of spending way too much time looking for stuff. <br/><br/>
          Either it’s something,
          that I rarely or never need,
          so I can’t know out of habit where it is
          or it has been relocated by someone else than me (mothers or significant others are very good at this).
        </p>

          <h2 className="nice-heading">This website is supposed to be a solution</h2>
          <p>
            You can create <b>plans</b> of your basement, drawer, kitchen, whole home ect.
            and add <b>items</b> to particular positions on your plans,
             so you can find the items easier in the future.
             <br/>
            You can also share the url of your plans with people you trust,
            so they can add or modify items and their locations on it!
          </p>




        <h2 className="nice-heading">Want to look at my code?</h2>
        <p className="nice-heading">
          <a href="https://github.com/alexmorten/where-is-my-stuff-ui" style={{color:"blue"}} >The UI</a> <br/>
          <a href="https://github.com/alexmorten/where-is-my-stuff-api" style={{color:"blue"}} >The API</a>
        </p>

      </Paper>
    </div>
  )
}
}
export default About;
