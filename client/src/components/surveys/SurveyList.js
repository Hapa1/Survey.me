import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys.length == 0) {
      console.log("case1");
        return(
          <div class="teal-text text-lighten-1" align="center" style={{margin: '25px 25px'}}>
          Nothing to see here! Create a survey to get started.
          </div>
        )
      }
    else {
      return (this.props.surveys.reverse().map(survey => {
        return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        );
      })
      )
    }



  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderSurveys()}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys})(SurveyList);
