import React, { Component } from "react";

// sections
import Introduction from "./sections/Introduction";
import About from "./sections/About";
import Advantage from "./sections/Advantage";
import Overview from "./sections/Overview";
import Footer from "./sections/Footer";

export default class Home extends Component {
  render() {
    const { token, toggleMobileMenu, logout } = this.props;

    return (
      <div id="page__home">
        <Introduction
          token={token}
          toggleMobileMenu={toggleMobileMenu}
          logout={logout}
        />
        <About />
        <Advantage />
        {/* <Values /> */}
        <Overview />
        <Footer />
      </div>
    );
  }
}
