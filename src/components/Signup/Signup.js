import React, { Component } from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../../constant";
// import { connect } from 'react-redux'
// import { signup } from '../../actions/auth'
// import './Signup.css'

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    errors: []
  };

  valididate = state => {
    if (state.username === "") {
      this.setState({ errors: "Please enter a username" });
      return false;
    }
    if (state.password === "") {
      this.setState({ errors: "Please enter a password" });
      return false;
    }
    if (state.password !== state.confirm_password) {
      this.setState({ errors: "Passwords do not match" });
      return false;
    }
    return true;
  };

  // showErrors() {
  // 	const animation = TweenMax.fromTo(this.refs.errors, 1, {autoAlpha: 0}, {autoAlpha: 1, ease: 'Power2'})
  // 	return animation
  // }

  handleSubmit = e => {
    e.preventDefault();
    if (this.valididate(this.state)) {
      // this.signup(this.state, this.props.history)
      this._signup(e);
    } else {
      this.showErrors();
    }
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPassword = e => {
    this.setState({ confirm_password: e.target.value });
  };

  _signup = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const result = await this.props.signupMutation({
      variables: {
        username,
        password
      }
    });

    const token = result.data.signup.token;
    localStorage.setItem(AUTH_TOKEN, token);

    this.props.refreshTokenFn &&
      this.props.refreshTokenFn({
        [AUTH_TOKEN]: token
      });

    this.props.history.replace("/");
    window.location.reload();
  };

  render() {
    return (
      <div className="signup-wrapper">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <h1>Signup</h1>
          <div ref="errors" style={{ visibility: "hidden", color: "red" }}>
            {this.state.errors}
          </div>
          <div>
            <input
              type="text"
              onChange={this.handleUsername}
              value={this.state.username}
              placeholder="Username"
              required
            />
          </div>
          {/* <div>
            <input
              type="text"
              onChange={this.handleEmail}
              value={this.state.email}
              placeholder="Email"
              required
            />
          </div> */}
          <div>
            <input
              type="password"
              onChange={this.handlePassword}
              value={this.state.password}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              type="password"
              onChange={this.handleConfirmPassword}
              value={this.state.confirm_password}
              placeholder="Confirmation"
              required
            />
          </div>
          <div>
            <input className="primary-button" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export default graphql(SIGNUP_USER_MUTATION, { name: "signupMutation" })(
  withRouter(Signup)
);
