import React from "react";

export default function Head({ wallet, toggleView, status, view, coinConfig }) {
  const { coin, logo } = wallet;

  return (
    <div className="title-bar">
      <div className="info-area">
        <img src={logo} className="coin-logo" alt="logo" />
        <p className="coin-title">{coin}</p>
        <span className={`status-icon ${status ? "active" : "inactive"}`}>
          {status ? (
            <i className="fa fa-check-circle" aria-hidden="true" />
          ) : (
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          )}
        </span>
      </div>
      <div className="action-buttons">
        <button
          className={view === "info" ? "active" : null}
          onClick={() => toggleView("info", coin)}
        >
          <i className="fa fa-info-circle" aria-hidden="true" />
        </button>
        <button
          className={view === "history" ? "active" : null}
          onClick={() => toggleView("history", coin)}
        >
          <i className="fa fa-history" aria-hidden="true" />
        </button>
        <button
          className={view === "withdraw" ? "active" : null}
          onClick={() => toggleView("withdraw", coin)}
        >
          <i className="fa fa-sign-out" aria-hidden="true" />
        </button>
        <button
          className={view === "deposit" ? "active" : null}
          onClick={() => toggleView("deposit", coin)}
        >
          <i className="fa fa-sign-in" aria-hidden="true" />
        </button>
        {Boolean(coinConfig) ? (
          <button
            className={`settings ${view === "settings" ? "active" : null}`}
            onClick={() => toggleView("settings", coin)}
          >
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
