import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';



class Payments extends Component {
  render(){
    return(
      <StripeCheckout
        name="MailStack"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      <a class="waves-effect waves-light btn"><i class="material-icons right">add</i>{this.props.auth.credits} Credits</a>
      </StripeCheckout>
    );
  }
}


function mapStateToProps(state){
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Payments);
