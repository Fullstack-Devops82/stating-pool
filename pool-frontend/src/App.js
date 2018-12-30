import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// css
import "./App.css";

// views
import Home from "./views/Home";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ForgotPassword from "./views/ForgotPassword";

// components
import Overlay from "./components/Overlay";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

// api
import { login, signup } from "./api/auth";
import { wipeCookies, getCookies } from "./api/cookies";

// App, main.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false,
      overlayType: "right",
      overlayContent: null,
      token: false,
      authFailure: null
    };

    window.addEventListener("beforeunload", ev => {
      const { remember } = getCookies();

      if (!remember) {
        this.logout();
      }
    });
  }

  componentDidMount() {
    const { token } = getCookies();
    if (typeof token === "string") {
      this.setState({
        token: token
      });
    }
  }

  toggleOverlay = (type = null, children = null) => {
    const { overlayVisible } = this.state;

    if (!overlayVisible) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    this.setState({
      overlayType: type,
      overlayContent: children,
      overlayVisible: !overlayVisible
    });
  };

  register = async (email, password, remember, cb) => {
    try {
      const attempt = await signup(email, password, remember);
      this.handleAuth(attempt);
    } catch (e) {
      cb(e);
    }
  };

  login = async (email, password, remember, cb) => {
    try {
      const attempt = await login(email, password, remember);
      this.handleAuth(attempt);
    } catch (e) {
      cb(e);
    }
  };

  handleAuth = attempt => {
    if (typeof attempt === "string") {
      this.setState({
        token: attempt
      });
    } else {
      console.log("[WARN] unknown auth error", attempt);
    }
  };

  logout = () => {
    if (this.state.overlayVisible) {
      this.toggleOverlay();
    }

    wipeCookies();
    this.setState({
      token: false
    });
  };

  render() {
    const { overlayType, overlayVisible, overlayContent, token } = this.state;

    const headerProps = {
      toggleMobileMenu: this.toggleOverlay,
      token: token,
      logout: this.logout
    };

    return (
      <Router>
        <div className="App">
          <Overlay
            type={overlayType}
            visible={overlayVisible}
            children={overlayContent}
          />

          <Route
            path="/"
            exact
            component={props => (
              <Home token={token} {...headerProps} {...props} />
            )}
          />

          <Route
            path="/forgot-password"
            component={props => <ForgotPassword {...headerProps} {...props} />}
          />

          <PublicOnlyRoute
            path="/signup"
            component={Signup}
            authorize={this.register}
            token={token}
            {...headerProps}
          />

          <PublicOnlyRoute
            path="/login"
            component={Login}
            authorize={this.login}
            token={token}
            {...headerProps}
          />

          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            token={token}
            logout={this.logout}
            toggleOverlay={this.toggleOverlay}
            {...headerProps}
          />
        </div>
      </Router>
    );
  }
}

export default App;
