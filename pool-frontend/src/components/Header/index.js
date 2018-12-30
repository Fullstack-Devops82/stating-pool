import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const headerLinks = [
  {
    text: "Home",
    link: "/"
  },
  // {
  //   text: "About",
  //   link: "/about"
  // },
  {
    text: "Login",
    link: "/login"
  },
  {
    text: "Sign Up",
    link: "/signup"
  }
];

// renderHeaderOverlay functions similar to the renderItemsList but in an overlay format
// for mobile devices.
function renderHeaderOverlay(toggleMobileMenu, logout, token) {
  return (
    <div className="overlay-body">
      <button
        onClick={() => toggleMobileMenu("right", renderItemsList(headerLinks))}
        className="menu-toggle"
      >
        <img src={require("../../assets/close.png")} alt="menu icon" />
      </button>
      {renderItemsList(headerLinks, token, logout, toggleMobileMenu)}
    </div>
  );
}

// renderItemsList renders a list of links. It includes a link to the dashboard
// instead of the Signup and Signin links if the user is logged in. It also appends
// a logout button as well when the user is logged in.
function renderItemsList(headerLinks, token, logout, toggleMobileMenu) {
  let links = [...headerLinks];

  if (Boolean(token)) {
    links = links.splice(0, 1);
    links.push({
      text: "Dashboard",
      link: "/dashboard"
    });
  }

  return (
    <ul className="itemsList">
      {links.map((item, i) => (
        <li key={i}>
          <Link
            to={item.link}
            onClick={toggleMobileMenu ? toggleMobileMenu : null}
          >
            {item.text}
          </Link>
        </li>
      ))}
      {Boolean(token) && (
        <li key="logout-button">
          <button onClick={() => logout()}>Logout</button>
        </li>
      )}
    </ul>
  );
}

// Header is the default header view. It uses renderItemsList on tablet/desktop
// and on mobile it renders a toggle of the menu overlay "renderHeaderOverlay"
export default function Header({ toggleMobileMenu, token, logout, internal }) {
  return (
    <header className={`App-header ${internal ? "transparent" : ""}`}>
      <div className="inner">
        <h1>POOLPAYS</h1>
        {renderItemsList(headerLinks, token, logout)}
        <button
          onClick={() =>
            toggleMobileMenu(
              "right",
              renderHeaderOverlay(toggleMobileMenu, logout, token)
            )
          }
          className="menu-toggle"
        >
          <img src={require("../../assets/menu-button.png")} alt="menu icon" />
        </button>
      </div>
    </header>
  );
}
