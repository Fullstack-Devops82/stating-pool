import React, { Component } from "react";

import "./introduction.css";

import ButtonLink from "../../../../components/ButtonLink";

import Header from "../../../../components/Header";

export default class Introduction extends Component {
  render() {
    const { toggleMobileMenu, token, logout } = this.props;

    return (
      <section className="section__introduction">
        <Header
          token={token}
          toggleMobileMenu={toggleMobileMenu}
          logout={logout}
          internal
        />

        <div className="center-container">
          <div className="text">
            <h3>Secure and Safe</h3>
            <h2>Multi Coin Staking Pool</h2>
            <p>
              Poolpays is an easy way to safely pool and stake cryptocurrencies
            </p>
          </div>
          <div className="button-container">
            <ButtonLink
              to={token ? "/dashboard" : "/signup"}
              text={token ? "Manage Portfolio" : "Sign Up"}
            />
          </div>
        </div>
      </section>
    );
  }
}
