import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/posts`).then(entries => {
      console.log(entries)
      this.setState(() => {
        return {
          posts: entries.data.posts
        }
      })
        // entries.items.forEach(entry => {
        //   console.log(entry)
        // })
    }).catch(e => console.error(e))
  }

  handleSignup = (userData, history) => {
    const url = 'http://localhost:4000/graphql/signup'
		axios.post(url, userData)
			.then(res => {
				console.log(res.data)
				// dispatch({type: "LOGIN", payload: res.data})
				history.push('/', res.data)
			})
	}

  render() {
    console.log('State: ', this.state)
    let allPosts = this.state.posts.map((post, index) => {
      return (
        <div className="post" key={index}>
          <Link to={"/post/" + post.fields.path}>
            <h1>{post.fields.title}</h1>
            <p>{post.fields.content}</p>
          </Link>
        </div>
      )
    })
    return (
        <div className="App">
          <Header />
          <Route exact path="/signup" render={() => <Signup signup={this.handleSignup} />} />
          <Route eact path="/login" component={ Login } />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="posts-wrapper">
            {allPosts}
          </div>
        </div>
    );
  }
}

export default App;
