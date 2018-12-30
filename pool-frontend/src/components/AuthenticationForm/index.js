import React from "react";
import { Link } from "react-router-dom";

import "./form.css";

function RedirectToProperPage(type) {
  switch (type) {
    case "login":
      return (
        <p>
          Don't have an account? <Link to="/signup">Sign up.</Link>
        </p>
      );
    case "signup":
      return (
        <p>
          Already have an account? <Link to="/login">Login.</Link>
        </p>
      );
    default:
      return null;
  }
}

export default function AuthenticationForm({
  buttonText,
  email,
  password,
  remember,
  updateForm,
  submit,
  type = "login",
  loading,
  error
}) {
  return (
    <div className="form">
      <div className="form__body">
        {error ? <p className="warning">{error}</p> : null}
        <div className="input-pair">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => updateForm("email", e.target.value)}
          />
        </div>
        <div className="input-pair reduced-margin">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => updateForm("password", e.target.value)}
          />
        </div>
      </div>
      <div className="form__footer">
        <div className="input-pair neben no-top-margin">
          <input
            type="checkbox"
            value={remember}
            onChange={e => updateForm("remember", e.target.value)}
          />
          <label>Remember Me</label>
        </div>
        {type === "login" && (
          <Link to="/forgot-password">Forgot Password?</Link>
        )}
      </div>
      <div className="button-container">
        <button disabled={loading} onClick={submit}>
          {buttonText}
        </button>
      </div>
      {RedirectToProperPage(type)}
    </div>
  );
}
