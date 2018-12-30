import React from "react";

export default function Deposit({ wallet, generateDepositAddress }) {
  return (
    <div className="Deposit innerview">
      {wallet["deposit_address"] ? (
        <div className="depositAddress">
          <p>
            Please send all deposits to this addressed that is linked to your
            account:
          </p>
          <p>
            <span>{wallet["deposit_address"]}</span>
          </p>
        </div>
      ) : (
        <div className="generate-info">
          <p>
            You do not have a deposit addressed saved here, please create a new
            one with the button below.
          </p>
          <button onClick={() => generateDepositAddress(wallet.coin)}>
            Generate Address
          </button>
        </div>
      )}
    </div>
  );
}
