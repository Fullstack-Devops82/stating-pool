import React from "react";

export default function Withdraw({
  wallet,
  setWithdrawAmount,
  setWithdrawAddress,
  withdrawCoins,
  withdrawAmount,
  withdrawAddress,
  withdrawErrors
}) {
  return (
    <div className="Withdraw innerview">
      <div className="withdraw-info">
        {withdrawErrors
          ? withdrawErrors.map(e => (
              <p key={e} className="warning">
                {e}
              </p>
            ))
          : null}
        <div className="input-pair">
          <label>Withdraw Amount:</label>
          <input
            type="number"
            onChange={e => setWithdrawAmount(e.target.value)}
          />
        </div>
        <div className="input-pair">
          <label>My Address:</label>
          <input
            type="text"
            onChange={e => setWithdrawAddress(e.target.value)}
          />
        </div>
        <p>
          By clicking
          <span> Withdraw {wallet.coin} </span>
          below, I confirm a withdrawal of
          <span> {withdrawAmount ? withdrawAmount : "[amount]"} </span>
          to
          <span> {withdrawAddress ? withdrawAddress : "[address]"}</span>.
        </p>
        <button className="small" onClick={() => withdrawCoins(wallet.coin)}>
          Withdraw {wallet.coin}
        </button>
      </div>
    </div>
  );
}
