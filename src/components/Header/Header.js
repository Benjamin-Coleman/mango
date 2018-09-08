import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Header.css";
import classNames from "classnames";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
      skipAnimation: false,
      scrollDirection: "down",
      scrollingAboveOrigin: true,
      scrollingBelowOrigin: false,
      transparent: true
    };

    this._scrollY = 0;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener(this.scrollUpdate);
  }

  scrollUpdate = () => {
    if (!this.refs.navbarWrapper || window.pageYOffset < 0) {
      return;
    }

    const scrollDirection = this._scrollY <= window.pageYOffset ? "down" : "up";
    const rect = this.refs.navbarWrapper.getBoundingClientRect();
    const scrollingAboveOrigin = rect.top >= 0;
    const scrollingBelowOrigin = rect.bottom < 0;

    const transparent =
      scrollingAboveOrigin ||
      (scrollDirection === "down" && !scrollingBelowOrigin) ||
      (!scrollingBelowOrigin && this.state.transparent);

    const navIsGoingUnderViewport =
      "down" === scrollDirection &&
      scrollingBelowOrigin &&
      !this.state.scrollingBelowOrigin;
    const justUnderwentPageTransition =
      !this.state.transparent && transparent && this.state.scrollingBelowOrigin;
    const skipAnimation =
      navIsGoingUnderViewport || justUnderwentPageTransition;

    if (
      skipAnimation !== this.state.skipAnimation ||
      transparent !== this.state.transparent
    ) {
      this.setState({ skipAnimation, transparent });
    }

    if (
      scrollDirection !== this.state.scrollDirection ||
      scrollingAboveOrigin !== this.state.scrollingAboveOrigin ||
      scrollingBelowOrigin !== this.state.scrollingBelowOrigin
    ) {
      this.setState({
        scrollDirection,
        scrollingAboveOrigin,
        scrollingBelowOrigin
      });
    }

    this._scrollY = window.pageYOffset;
  };

  setRef(ref) {
    console.log("setting ref", ref);
    this.refs.navbar = ReactDOM.findDOMNode(ref);
  }

  render() {
    const hidden =
      this.state.scrollDirection === "down" && this.state.scrollingBelowOrigin;

    const navStyles = classNames({
      active: this.state.isActive,
      skipAnimation: this.state.skipAnimation,
      transparent: this.state.transparent,
      show: this.state.scrollDirection === "up",
      hidden
    });

    return (
      <div ref="navbarWrapper" className="nav-wrapper">
        <header className={navStyles}>
          <div className="nav-item">
            <a href="/popular">
              <span>Popular</span>
            </a>
          </div>
          <div className="nav-item">
            <a href="/latest">
              <span>Latest</span>
            </a>
          </div>
          <div className="nav-item">
            <a href="/feated">
              <span>Featured</span>
            </a>
          </div>
          <div className="nav-item nav-item__logo">
            <h3>inkmango</h3>
          </div>
          <div className="nav-item margin-left">
            <a href="/">
              <span />
            </a>
          </div>
          <div className="nav-item">
            <a href="/signup">
              <span>Signup</span>
            </a>
          </div>
          <div className="nav-item">
            <a href="/login">
              <span>Login</span>
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
