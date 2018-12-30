import Axios from "./axios";
import { criticalError, validateRequest } from "./_helpers";

export function getAdminCoins(token) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "get",
      url: "admin/coins",
      headers: {
        "x-auth-token": token
      }
    })
      .then(function(res) {
        return resolve(res.data.records);
      })
      .catch(function(err) {
        console.warn("[ERR] get admin coins failed \n", err);
        return reject(err);
      });
  });
}

export function updateCoinConfig(token, id, updates) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    Axios({
      method: "put",
      url: `admin/coins/${id}`,
      headers: {
        "x-auth-token": token
      },
      data: updates
    })
      .then(function(res) {
        return resolve(res);
      })
      .catch(function(err) {
        console.warn("[ERR] update admin coin failed \n", err);
        return reject(err);
      });
  });
}

export function addNewCoin(token, data) {
  return new Promise(function(resolve, reject) {
    if (!validateRequest(token)) {
      return reject(criticalError);
    }

    data.wallet = {
      ip: data.ip,
      port: data.port,
      user: data.user,
      pass: data.pass
    };

    delete data.ip;
    delete data.port;
    delete data.user;
    delete data.pass;

    Axios({
      method: "post",
      url: "admin/coins",
      headers: {
        "x-auth-token": token
      },
      data
    })
      .then(function(res) {
        return resolve(res.data.records);
      })
      .catch(function(err) {
        console.warn("[ERR] add new coin admin coins failed \n", err);
        return reject(err);
      });
  });
}
