import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


class Header extends Component {
  renderContent(){
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return(
          <h5 class="white-text center">Get instant feedback from users!</h5>
        )
      default:
        console.log(this);
        return [

          <li key="1" style={{margin:'0px 10px'}}><Payments /></li>,
          <li class="tab" key="5" style={{margin:'0px px'}}>
            <a href={"/auth/profile/" + this.props.auth._id}>
              {this.props.auth.name}
            </a>
          </li>,
          <li class="tab" key="4"><a href={this.props.auth ? '/surveys' : '/'}>Surveys</a></li>,
          <li class="tab" key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];

    }
  }

  render() {
    return (
      <nav class="nav-extended">
        <div className="nav-wrapper">
          <a href="/" class="brand-logo center">Survey.me</a>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            {this.renderContent()}
          </ul>
        </div>

      </nav>
    );
  }
}

function mapStateToProps(state){
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
