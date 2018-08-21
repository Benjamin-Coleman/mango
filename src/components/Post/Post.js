import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/posts`)
      .then(entries => {
        this.setState(() => {
          return {
            posts: entries.data.posts
          };
        });
      })
      .catch(e => console.error(e));
  }

  render() {
    console.log("Post.js: ");
    let allPosts = this.state.posts.map((post, index) => {
      return (
        <div className="post" key={index}>
          <Link to={"/post/" + post.fields.path}>
            <h1>{post.fields.title}</h1>
            <p>{post.fields.content}</p>
          </Link>
        </div>
      );
    });

    return <div className="posts-wrapper">{allPosts}</div>;
  }
}

export default Post;
