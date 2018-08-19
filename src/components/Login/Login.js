import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { AUTH_TOKEN } from "../../constant";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this._login(e);
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  _login = async e => {
    const { username, password } = this.state;
    this.props
      .loginMutation({
        variables: {
          username,
          password
        }
      })
      .then(result => {
        console.log(result);
        const token = result.data.login.token;
        this.props.refreshTokenFn &&
          this.props.refreshTokenFn({
            [AUTH_TOKEN]: token
          });
        this.props.history.replace("/");
        window.location.reload();
      })
      .catch(err => {
        console.log("error");
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              onChange={this.handleUsername}
              value={this.state.username}
              placeholder="Username"
              required
            />
          </div>
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
            <input className="primary-button" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
export default graphql(LOGIN_USER_MUTATION, { name: "loginMutation" })(
  withRouter(Login)
);
