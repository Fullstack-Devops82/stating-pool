import React from "react";

import "./overlay.css";

// TODO: react-animate fade in

export default function Overlay({ children, type = "full", visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div id="overlay" className={type}>
      {children}
    </div>
  );
}
