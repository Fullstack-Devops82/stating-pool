import Axios from "./axios";
import { criticalError, validateRequest } from "./_helpers";

export function getAvailableWallets(token) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "get",
      url: "wallets",
      headers: {
        "x-auth-token": token
      }
    })
      .then(function(res) {
        return resolve(res.data.records);
      })
      .catch(function(err) {
        console.warn("[ERR] get wallet \n", err);
        return reject(err);
      });
  });
}

export function getAvailableCoins(token) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "get",
      url: "currencies",
      headers: {
        "x-auth-token": token
      }
    })
      .then(function(res) {
        return resolve(res.data.records);
      })
      .catch(function(err) {
        console.warn("[ERR] get coin \n", err);
        return reject(err);
      });
  });
}

export function getTransactions(token, type) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    let url = "wallets/history";

    // TODO: add type support for staking, deposit, etc.

    Axios({
      method: "get",
      url,
      headers: {
        "x-auth-token": token
      }
    })
      .then(function(res) {
        return resolve(res.data.records);
      })
      .catch(function(err) {
        console.warn("[ERR] get transactions \n", err);
        return reject(err);
      });
  });
}

export function getDepositAddress(token, currency) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "post",
      url: "wallets/deposit",
      headers: {
        "x-auth-token": token
      },
      data: {
        currency
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          return resolve(true);
        }
      })
      .catch(function(err) {
        console.warn("[ERR] create deposit address \n", err);
        return reject(err);
      });
  });
}

export function withdrawCoins(token, currency, address, amount) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "post",
      url: "wallets/withdraw",
      headers: {
        "x-auth-token": token
      },
      data: {
        currency,
        amount: Number.parseFloat(amount),
        address
      }
    })
      .then(function(res) {
        console.log("withdrawCoins", res);
        return resolve(res.data);
      })
      .catch(function(err) {
        console.warn("[ERR] withdraw coins \n", err);
        return reject(err);
      });
  });
}
