import React from "react";
import { Link } from "react-router-dom";

import "./button-link.css";

export default function ButtonLink({ to, text, type = "regular" }) {
  return (
    <Link className={`button-link ${type}`} to={to}>
      {text}
    </Link>
  );
}
