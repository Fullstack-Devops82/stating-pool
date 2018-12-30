import React, { Component } from "react";

import "./addcoin.css";

const COIN_DATA = [
  {
    name: "name",
    type: "text",
    title: "Name"
  },
  {
    name: "currency",
    type: "text",
    title: "Ticker"
  },
  {
    name: "confirmations",
    type: "number",
    title: "Confirmations"
  },
  {
    name: "ip",
    type: "text",
    title: "Wallet IP Address"
  },
  {
    name: "port",
    type: "number",
    title: "Wallet Port"
  },
  {
    name: "user",
    type: "text",
    title: "Wallet RPC Username"
  },
  {
    name: "pass",
    type: "text",
    title: "Wallet RPC Password"
  },
  {
    name: "min_withdrawal",
    type: "number",
    title: "Minimum Withdrawal"
  },
  {
    name: "min_deposit",
    type: "number",
    title: "Minimum Deposit"
  },
  {
    name: "deposit_fee",
    type: "number",
    title: "Deposit Fee (%)"
  },
  {
    name: "withdraw_fee",
    type: "number",
    title: "Withdraw Fee (%)"
  },
  {
    name: "pool_fee",
    type: "number",
    title: "Pool Fee (%)"
  },
  {
    name: "enabled",
    type: "checkbox",
    title: "Enabled"
  },
  {
    name: "maintenance",
    type: "checkbox",
    title: "Mainenance"
  }
];

export default class AddCoinOverlay extends Component {
  state = {};

  updateForm = (type, input) =>
    this.setState({
      [type]: input
    });

  render() {
    const { toggleOverlay, addNewCoin } = this.props;

    return (
      <div className="add-coin overlay-body">
        <div className="inner">
          <div className="overlay-header">
            <button onClick={toggleOverlay} className="menu-toggle">
              <img
                src={require("../../assets/close.png")}
                alt="close overlay icon"
              />
            </button>
          </div>
          <div className="overlay-content">
            {COIN_DATA.map(({ name, title, type }) => (
              <div className="input-pair">
                <label>{title}</label>
                <input
                  type={type}
                  value={this.state[name]}
                  onChange={e => this.updateForm(name, e.target.value)}
                />
              </div>
            ))}
            <button onClick={addNewCoin} className="small">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
