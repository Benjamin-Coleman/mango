import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

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

  render() {
    console.log('State: ', this.state)
    let allPosts = this.state.posts.map((post, index) => {
      return (
        <div className="post" key={index}>
          <h1>{post.fields.title}</h1>
          <p>{post.fields.content}</p>
        </div>
      )
    })
    return (
      <div className="App">
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
