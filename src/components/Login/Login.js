import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
		event.preventDefault()
		this.props.login(this.state, this.props.history)
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value})
	}

	handlePassword = (e) => {
		this.setState({ password: e.target.value})
	}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
					<div><input type='text' onChange={this.handleUsername} value={this.state.username} placeholder='Username' required/></div>
					<div><input type='password' onChange={this.handlePassword} value={this.state.password} placeholder='Password' required/></div>
                </form>
            </div>
        )
    }
}

export default Login