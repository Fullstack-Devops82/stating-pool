import React, { Component } from "react";
import "./Pool.css";

// componenets
import Head from "./Head";
import AddCoinOverlay from "./AddCoinOverlay";

import Header from "../../components/Header";

// sections
import Settings from "./sections/Settings";
import History from "./sections/History";
import Deposit from "./sections/Deposit";
import Withdraw from "./sections/Withdraw";
import Info from "./sections/Info";

// api
import {
  getAvailableWallets,
  getAvailableCoins,
  getDepositAddress,
  getTransactions,
  withdrawCoins
} from "../../api/wallet";
import { getAdminCoins, addNewCoin } from "../../api/admin";

// map of image logos for each coin
// TODO: store to database somewhere.
const coinImageMap = {
  HOLD: require("../../assets/coins/HOLD.png"),
  BUZZ: require("../../assets/coins/BUZZ.png")
};

export default class Pool extends Component {
  state = {
    // view controlling
    innerView: "info",
    activeWallet: "HOLD",
    adminCoinList: [],
    // wallet data
    wallets: false,
    transactionHistory: [],
    // withdraw items
    withdrawAddress: "",
    widthdrawAmount: 0,
    withdrawErrors: []
  };

  componentDidMount() {
    this.getAvailableWallets();
    this.getAdminCoins();
    this.getTransactions();
  }

  // getAvailableWallets is a core componenet to this entire page
  // the wallets are gotten on load, as well as when any updates are made
  // by the user (desposit, withdraw, settings, etc)
  // to ensure that we have the freshest dataset available.
  getAvailableWallets = async () => {
    try {
      let wallets = await getAvailableWallets(this.props.token);
      let coins = await getAvailableCoins(this.props.token);

      let combinedArrays = [];

      if (Array.isArray(wallets)) {
        wallets.forEach(function(wallet) {
          let combo = {
            ...wallet
          };

          combo.logo = coinImageMap[wallet.coin];

          if (Array.isArray(coins)) {
            coins.forEach(coin => {
              if (wallet.coin === coin.currency) {
                combo = {
                  ...coin,
                  ...combo
                };
              }
            });

            combinedArrays.push(combo);
          }
        });

        this.setState({ wallets: combinedArrays });
      }
    } catch (e) {
      console.warn(e);
      this.props.logout();
    }
  };

  // getTransactions gets all of the transactions for a specified coin.
  getTransactions = async () => {
    try {
      let transactionHistory = await getTransactions(this.props.token);
      if (Array.isArray(transactionHistory)) {
        this.setState({ transactionHistory });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // getAdminCoins is currently set to see if the user can simply access the admin/coins
  // endpoint, and we then set the state to allow them to see the adminstration panel section.
  getAdminCoins = async () => {
    try {
      const adminCoinList = await getAdminCoins(this.props.token);
      if (Array.isArray(adminCoinList)) {
        this.setState({
          adminCoinList
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // generateDepositAddress will generate a deposit address on the server side
  // by being passed a symbol for the wallet expected. Once server actions are
  // complete, the "deposit_address" value is available within the wallets response
  // for that wallet, therefore it is best to just get the entire wallet suite again.
  generateDepositAddress = async symbol => {
    try {
      await getDepositAddress(this.props.token, symbol);
      this.getAvailableWallets();
    } catch (e) {}
  };

  // setWithdrawAmount and setWithdrawAddress are helper functions to simply
  // store temporary state values to be used. all other temporary state functions
  // will also be created here.
  setWithdrawAmount = amount => this.setState({ withdrawAmount: amount });
  setWithdrawAddress = addy => this.setState({ withdrawAddress: addy });

  // withdrawCoins calls an api endpoint for withdrawing coins of a certain symbol to that
  // users withdraw address
  withdrawCoins = async symbol => {
    // TODO: api call to withdraw funds to account,
    const { withdrawAddress, withdrawAmount, withdrawErrors } = this.state;

    try {
      const withdrawalSuccess = await withdrawCoins(
        this.props.token,
        symbol,
        withdrawAddress,
        withdrawAmount
      );

      if (withdrawalSuccess.status === 200) {
        this.setState({
          withdrawErrors: []
        });

        this.setState({
          withdrawAddress: "",
          withdrawAmount: 0
        });
      }
    } catch (e) {
      if (e.critical) {
        this.props.logout();
      }

      const { data } = e.response;

      let errors = withdrawErrors;
      errors.push(data.error);

      this.setState({ withdrawErrors: errors });
    }
  };

  // toggleView toggles the inner view of which coin you are actively using
  // and it also takes into account if you toggle an inactive coin
  // setting this new coin to active, and switching that proper view body on.
  toggleView = (view, wallet) => {
    let newState = {};
    if (wallet !== this.state.activeWallet) {
      newState = {
        ...newState,
        activeWallet: wallet
      };
    }

    this.setState({
      ...newState,
      innerView: view
    });
  };

  // addNewCoin does an api call to
  addNewCoin = async data => {
    try {
      const coinAdded = await addNewCoin(this.props.token, data);
      if (!(coinAdded instanceof Error)) {
        this.getAvailableWallets();
      }
    } catch (e) {
      console.warn(e);
      // TODO: not sure how to handle this error case?
    }
  };

  // toggleNewCoinPopup enables the ability to add a new coin to the list of active wallets
  // wallets will be DISABLED by default until it is certain that the wallet is active on
  // the serverside
  toggleNewCoinPopup = () => {
    const { toggleOverlay } = this.props;
    toggleOverlay(
      "translucent",
      <AddCoinOverlay
        addNewCoin={this.addNewCoin}
        toggleOverlay={toggleOverlay}
      />
    );
  };

  // renderCoinBody renders the proper inner view for the wallet that is active
  // this wallet is passed in only if the states activeWallet === the wallet.coin symbol
  // this uses a basic switch statement to control which view the innerView selected should
  // render. Chosen from toggleView function above.
  renderCoinBody = wallet => {
    const {
      innerView,
      withdrawAmount,
      adminCoinList,
      transactionHistory,
      withdrawAddress,
      withdrawErrors
    } = this.state;

    const sharedProps = {
      wallet
    };

    const relevantTransactions = transactionHistory.filter(
      transaction => transaction.currency === wallet.coin
    );

    switch (innerView) {
      // no info as it is default
      case "settings": {
        // TODO: ensure user is allowed to admin rights.
        return (
          <Settings
            {...sharedProps}
            coinConfig={
              adminCoinList.filter(config => config.name === wallet.coin)[0]
            }
          />
        );
      }
      case "withdraw":
        return (
          <Withdraw
            {...sharedProps}
            setWithdrawAmount={this.setWithdrawAmount}
            setWithdrawAddress={this.setWithdrawAddress}
            withdrawCoins={this.withdrawCoins}
            withdrawAmount={withdrawAmount}
            withdrawAddress={withdrawAddress}
            withdrawErrors={withdrawErrors}
          />
        );
      case "deposit":
        return (
          <Deposit
            {...sharedProps}
            currentBlock={5000}
            generateDepositAddress={this.generateDepositAddress}
          />
        );
      case "history":
        return <History data={relevantTransactions} {...sharedProps} />;
      default:
        return (
          <Info
            data={relevantTransactions.filter(t => t.type === "stake")}
            {...sharedProps}
          />
        );
    }
  };

  render() {
    const { innerView, activeWallet, wallets, adminCoinList } = this.state;

    // loading state (wallets is FALSE by default)
    // TODO: style it
    let MAIN_VIEW = <div className="loading">Loading...</div>;

    // when wallets are available.
    if (wallets.length) {
      MAIN_VIEW = wallets.map(wallet => (
        <div className="coin expandable-item" key={wallet.coin}>
          <Head
            wallet={wallet}
            toggleView={this.toggleView}
            status={!wallet.maintenance}
            view={innerView}
            coinConfig={
              (adminCoinList || []).filter(
                config => config.name === wallet.coin
              )[0]
            }
          />
          {activeWallet === wallet.coin ? (
            <div className="coin-body expandable-body">
              <div className="sub-title">
                <h2>{innerView.toLocaleUpperCase()}</h2>
              </div>
              {this.renderCoinBody(wallet)}
            </div>
          ) : null}
        </div>
      ));
    }

    const { token, toggleMobileMenu, logout } = this.props;

    return (
      <div className="Pool page">
        <Header
          token={token}
          toggleMobileMenu={toggleMobileMenu}
          logout={logout}
        />

        <div className="inner">
          <div className="page__intro-container">
            <h2 className="page__title">Dashboard</h2>
            <p className="page__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              dapibus ligula ut nisl dignissim, nec facilisis odio accumsan.
            </p>
          </div>
          {adminCoinList.length ? (
            <p className="admin-panel">
              <button className="small" onClick={this.toggleNewCoinPopup}>
                ADD NEW COIN
              </button>
            </p>
          ) : null}
          {MAIN_VIEW}
        </div>
      </div>
    );
  }
}
