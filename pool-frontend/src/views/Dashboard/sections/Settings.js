import React, { Component } from "react";

import { updateCoinConfig } from "../../../api/admin";

const initialState = {};

export default class Settings extends Component {
  state = {};

  // componentWillUpdate resets the state to its initial state, an empty object
  // in the event that props change. when props are changed, it is assumed that
  // a new coin would be selected.
  // it also saves the current state for the coin at the time.
  componentWillUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      // TODO: check this.state and nextProps
      // save to localstorage the state changes
      // check also
      this.setState(initialState);
    }
  }

  // updateForm is a generic handler for all setState events, enabling multiple
  // input type support.
  updateForm = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  // submitChanges submits the users request token, the coin to be edited ID, as well
  // as any changes and puts the
  submitChanges = async () => {
    const { coinConfig, token } = this.props;
    try {
      const configUpdated = await updateCoinConfig(
        token,
        coinConfig.id,
        this.state
      );

      if (Boolean(configUpdated)) {
        this.setState(initialState);
      }
    } catch (e) {
      console.warn(e);
      // TODO: handle error. what do?
    }
  };

  render() {
    const { coinConfig } = this.props;

    return (
      <div className="Settings innerview">
        <div className="wallet-status">
          <h3>Wallet Status</h3>
          <ul>
            <li>
              Total Users: <span>{coinConfig.stats.connections}</span>
            </li>
            <li>
              Current Block: <span>{coinConfig.stats.blocks}</span>
            </li>
            <li>
              Wallet version: <span>{coinConfig.stats.version}</span>
            </li>
            <li>
              Address: <span>{coinConfig.address}</span>
            </li>
          </ul>
        </div>
        <div className="wallet-settings">
          <h3>Configurable Settings</h3>
          <ul>
            <li>
              <label>Enabled</label>
              <input
                name="enabled"
                type="checkbox"
                value={this.state.enabled}
                defaultChecked={coinConfig.enabled}
                onChange={this.updateForm}
              />
            </li>
            <li>
              <label>Deposit Fee: </label>
              <input
                name="deposit_fee"
                type="number"
                value={this.state["deposit_fee"]}
                defaultValue={coinConfig["deposit_fee"]}
                onChange={this.updateForm}
              />%
            </li>
            <li>
              <label>Minimum Deposit: </label>
              <input
                name="min_deposit"
                type="number"
                value={this.state["min_deposit"]}
                defaultValue={coinConfig["min_deposit"]}
                onChange={this.updateForm}
              />%
            </li>
            <li>
              <label>Withdrawal Fee: </label>
              <input
                name="withdraw_fee"
                type="number"
                value={this.state["withdraw_fee"]}
                defaultValue={coinConfig["withdraw_fee"]}
                onChange={this.updateForm}
              />%
            </li>
            <li>
              <label>Minimum Withdrawal: </label>
              <input
                name="min_withdrawal"
                type="number"
                value={this.state["min_withdrawal"]}
                defaultValue={coinConfig["min_withdrawal"]}
                onChange={this.updateForm}
              />%
            </li>
            <li>
              <label>Pool Fee: </label>
              <input
                name="pool_fee"
                type="number"
                value={this.state["pool_fee"]}
                defaultValue={coinConfig["pool_fee"]}
                onChange={this.updateForm}
              />%
            </li>
            <li>
              <label>Confirmations: </label>
              <input
                name="confirmation"
                type="number"
                value={this.state["confirmations"]}
                defaultValue={coinConfig["confirmations"]}
                onChange={this.updateForm}
              />%
            </li>
          </ul>
          {Object.keys(this.state).length === 0 &&
          this.state.constructor === Object ? null : (
            <button onClick={this.submitChanges}>Submit Changes</button>
          )}
        </div>
      </div>
    );
  }
}
