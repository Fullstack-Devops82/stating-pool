import React from "react";

// components
import AuthenticationForm from "../../components/AuthenticationForm";
import Header from "../../components/Header";

export default class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    remember: true,
    error: "",
    loading: false
  };

  updateForm = (type, input) =>
    this.setState({
      [type]: input
    });

  signup = () => {
    console.log("hello");
    this.setState({ loading: true });
    const { email, password, remember } = this.state;

    this.props.authorize(email, password, remember, e => {
      this.setState({
        error: e.response.data.error,
        loading: false
      });
    });
  };

  render() {
    const { email, password, remember, error, loading } = this.state;
    const { token, toggleMobileMenu, logout } = this.props;

    return (
      <div className="page">
        <Header
          token={token}
          toggleMobileMenu={toggleMobileMenu}
          logout={logout}
        />

        <div className="inner centered skinny">
          <div className="page__intro-container">
            <h2 className="page__title">Signup</h2>
            <p className="page__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              dapibus ligula ut nisl dignissim, nec facilisis odio accumsan.
            </p>
          </div>

          <AuthenticationForm
            updateForm={this.updateForm}
            email={email}
            password={password}
            remember={remember}
            submit={this.signup}
            loading={loading}
            error={error}
            buttonText="Signup"
            type="signup"
          />
        </div>
      </div>
    );
  }
}
