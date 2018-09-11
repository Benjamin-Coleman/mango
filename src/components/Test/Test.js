import React, { Component } from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/appReducer";
import { bindActionCreators } from "redux";

class Test extends Component {
  state = {
    message: "this is from the client side initial state"
  };
  componentDidMount() {
    if (!this.props.message) {
      console.log("Test component did mount");
      this.props.updateMessage("Hi, I'm from client!");
    }
  }
  render() {
    console.log("Test component props: ", this.props);
    return (
      <div className="Test">
        // ...
        <p>Redux: {this.props.message}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  updateMessage: bindActionCreators(setMessage, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
