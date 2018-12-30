import React from "react";
import moment from "moment";

function dataBody(data) {
  return data.length ? (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{moment(d.created).calendar()}</td>
            <td>{d.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no recent stakes at this time.</p>
  );
}

export default function Info({ data, wallet }) {
  const { currency } = wallet;

  return (
    <div className="Info innerview">
      <div>
        <h3>{currency} Pool Info</h3>
        <ul>
          <li>
            Minimum Withdrawal:{" "}
            <span>
              {wallet["min_withdrawal"]} {currency}
            </span>
          </li>
          <li>
            Minimum Deposit:{" "}
            <span>
              {wallet["min_deposit"]} {currency}
            </span>
          </li>
          <li>
            Wallet Version: <span>{wallet.version}</span>
          </li>
          <li>
            Connections: <span>{wallet.connections}</span>
          </li>
          <li>
            Block Height: <span>{wallet.height}</span>
          </li>
          <li>More info coming soon...</li>
        </ul>
      </div>
      <div className="info-recent-stakes">
        <h3>Recent Stakes</h3>
        {dataBody(data)}
      </div>
    </div>
  );
}
