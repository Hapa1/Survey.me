import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import FAQ from './FAQ';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Profile from './Profile';

class App extends Component {

  componentDidMount(){
    (this.props.fetchUser());
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/auth/profile/:_id" component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
