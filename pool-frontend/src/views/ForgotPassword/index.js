import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

import Header from "../../components/Header";

import { recoverPassword } from "../../api/auth";

export default class Recovery extends Component {
  state = {
    email: "",
    success: false,
    message: "",
    warning: "",
    loading: false
  };

  recoverPassword = async () => {
    this.setState({
      loading: true
    });

    try {
      const reset = await recoverPassword(this.state.email);
      if (reset) {
        this.setState(
          {
            message:
              "Succesfully sent recovery email, please update your password and login.",
            warning: ""
          },
          () => {
            setTimeout(() => {
              this.setState({
                success: reset,
                message: "",
                loading: false
              });
            }, 5000);
          }
        );
      }
    } catch (e) {
      // TODO: how do we handle errors here?
      this.setState({
        warning: e.response.data.error,
        loading: false
      });
    }
  };

  updateForm = (name, val) =>
    this.setState({
      [name]: val
    });

  render() {
    const { email, success, message, warning, loading } = this.state;
    const { token, toggleMobileMenu, logout } = this.props;

    if (success) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: "/forgot-password" }
          }}
        />
      );
    }

    return (
      <div className="page recovery">
        <Header
          token={token}
          toggleMobileMenu={toggleMobileMenu}
          logout={logout}
        />

        <div className="inner">
          <div className="page__intro-container">
            <h2 className="page__title">Password Recovery</h2>
            <p className="page__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              dapibus ligula ut nisl dignissim, nec facilisis odio accumsan.
            </p>
            {message && <p className="message">{message}</p>}
            {warning && <p className="warning">{warning}</p>}
          </div>
          <div className="input-pair">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={e => this.updateForm("email", e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="green"
            onClick={this.recoverPassword}
          >
            Recover
          </button>
        </div>
      </div>
    );
  }
}
