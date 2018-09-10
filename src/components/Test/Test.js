import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../../store/appReducer'
class Test extends Component {
  componentDidMount() {
    if (!this.props.message) {
      this.props.updateMessage('Hi, I\'m from client!')
    }
  }
  render() {
    return (
      <div className="Test">
        // ...
        <p>Redux: {this.props.message}</p>
      </div>
    )
  }
}
export default connect(
  ({ test }) => ({
    message: test.message
  }),
  dispatch => ({
    updateMessage: txt => dispatch(setMessage(txt))
  })
)(Test)
