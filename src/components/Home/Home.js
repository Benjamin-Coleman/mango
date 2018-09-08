import React, { Component } from "react";
import axios from "axios";
import "./Home.css";

class Home extends Component {
  state = {
    featuredPost: {
      sys: {},
      fields: {}
    }
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/featuredPost`)
      .then(entries => {
        console.log(entries);
        this.setState(() => {
          return {
            featuredPost: entries.data.post
          };
        });
      })
      .catch(e => console.error(e));
  }

  render() {
    console.log(this.state);
    return <div />;
  }
}

export default Home;
