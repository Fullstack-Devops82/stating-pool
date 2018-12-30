import Axios from "./axios";

import { storeAuthDataCookies } from "./cookies";

export function login(email, password, remember) {
  return new Promise(function(resolve, reject) {
    Axios({
      method: "post",
      url: "/token",
      data: {
        email,
        password
      }
    })
      .then(function(res) {
        storeAuthDataCookies(email, res.data.token, remember);
        return resolve(res.data.token);
      })
      .catch(function(error) {
        console.warn("login error:", error);
        return reject(error);
      });
  });
}

export function signup(email, password, remember) {
  return new Promise(function(resolve, reject) {
    Axios({
      method: "post",
      url: "/register",
      data: {
        email,
        password
      }
    })
      .then(function(res) {
        Axios({
          method: "post",
          url: "token",
          data: {
            email,
            password
          }
        }).then(function(res) {
          storeAuthDataCookies(email, res.data.token, remember);
          return resolve(res.data.token);
        });
      })
      .catch(function(error) {
        console.warn("registration error:", error);
        return reject(error);
      });
  });
}

export function recoverPassword(email) {
  return new Promise(function(resolve, reject) {
    Axios({
      method: "post",
      url: "/recover_password",
      data: {
        email
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          return resolve(true);
        }
      })
      .catch(function(error) {
        console.warn("login error:", error);
        return reject(error);
      });
  });
}
