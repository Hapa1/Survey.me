import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tutorial from './tutorial';

class Landing extends Component {
  renderContent (){
    console.log(this.props);
    switch(this.props.auth){
      case null:
        return;
      case false:
        return(
          <div class="card-panel teal lighten-3">
            <div>
              <h5 class="white-text text-lighten-2">Start sending surveys by logging in!</h5>
            </div>
          <a class="waves-effect waves-light btn" href="/auth/google">Login With Google</a>
          </div>
        )
      default:
        return(
          <div class="card-panel teal lighten-3">
            <div>
              <h6 class="white-text text-lighten-2">Create a survey to send out to recipients!</h6>
            </div>
          <a class="waves-effect waves-light btn" href="/surveys/new">New Survey</a>
          </div>
        )
    }
  }

  render() {
    return (
      <div>
        <div class="center">
          <h5>
          </h5>
          {this.renderContent()}
        </div>
      <Tutorial />
      </div>
    )

  }
}

function mapStateToProps(state){
  return {auth: state.auth};
}

export default connect(mapStateToProps)(Landing);
