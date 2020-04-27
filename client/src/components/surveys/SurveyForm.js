import _ from 'lodash'; //lodash library, map
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'
import { Link } from 'react-router-dom';
import formFields from './formFields';



 class SurveyForm extends Component {
  renderFields(){
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
      );
    });
    //({ label, name }) instead of label = {field.name}

    //no () onsurveysubmit so it doesnt instantly run
  }
  render() {
    return (

      <div>
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
                  //({destructuring})
    errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {

    if (!values[name]){
      errors[name] = 'You must provide a value';
    }
  });
  //values.name --> { name: 'sfdada'} . checks literal name


  return errors;
}
//es6 ßvalidate: validate
export default reduxForm({

  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
//when form isnt rendered, dont destroy it
