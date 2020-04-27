import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
//materialize css

const Dashboard = () => {
  return(
    <div>
      <div align="center" style={{margin: '25px 25px'}}>
        <Link to="/surveys/new" className="btn-floating btn-large red lighten-2">
          <i className="material-icons">add</i>
        </Link>
      </div>
      <SurveyList />
    </div>
  );
};

export default Dashboard;
