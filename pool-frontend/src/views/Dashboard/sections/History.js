import React, { Component } from "react";
import moment from "moment";

export default class History extends Component {
  state = {
    selected: "all"
  };

  onlySelected = data => {
    if (this.state.selected === "all") {
      return true;
    }

    if (this.state.selected === data.type) {
      return true;
    }

    return false;
  };

  render() {
    const BODY = this.props.data.length ? (
      <div>
        <div className="select-container">
          <select
            value={this.state.selected}
            onChange={e => this.setState({ selected: e.target.value })}
          >
            <option value="all">All Transactions</option>
            <option value="stake">Stake Rewards</option>
            <option value="deposit">Deposits</option>
            <option value="withdraw">Withdrawls</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Created</th>
              <th>Amount</th>
              <th>Status</th>
              <th>TX ID</th>
              <th>Confirmations</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.filter(this.onlySelected).map(d => (
              <tr key={d.id}>
                <td>{moment(d.timestamp).calendar()}</td>
                <td>{d.amount}</td>
                <td>{d.status}</td>
                <td>{d.tx_id}</td>
                <td>{d.confirmations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>
        Currently there are no transactions to display due to lack of activity,
        or technical error. If this is unexpected, please contact support.
      </p>
    );
    return <div className="History innerview">{BODY}</div>;
  }
}
