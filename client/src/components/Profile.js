import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Profile extends Component {

  componentDidMount() {
    this.props.getUser(this.props.match.params._id);
    console.log(this.props.getUser(this.props.match.params._id));
  }

  render() {
    console.log(this.props.profile);


    return (
      <div>
        <div class="center-align">

          <div
            className="btn-floating btn-large red"
            style={{margin:'15px 10px'}}
          >
            <i className="material-icons">person</i>
          </div>

          <h4>
            {this.props.profile.name}
          </h4>

          <h5>
            Surveys: {this.props.profile.surveys}
          </h5>

        </div>
      </div>
    );
  }



}

function mapStateToProps(state){
  return { profile: state.profile };
}

export default connect(mapStateToProps, actions)(Profile);

//export default connect(mapStateToProps, { fetchSurveys})(SurveyList);
