import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  state = {
    post: {
      sys: {},
      fields: {}
    }
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/post/${this.props.match.params.title}`)
      .then(entries => {
        console.log(entries);
        this.setState(() => {
          return {
            post: entries.data.post
          };
        });
      })
      .catch(e => console.error(e));
  }

  render() {
    console.log("Post.js: ", this.state);
    return (
      <div className="post-wrapper">
        <h1>{this.state.post.fields.title}</h1>
        <p>{this.state.post.fields.content}</p>
      </div>
    );
  }
}

export default Post;
