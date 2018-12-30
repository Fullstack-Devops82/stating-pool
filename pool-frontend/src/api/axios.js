import Axios from "axios";

const Request = Axios.create({
  baseURL: "https://api.interstellarcoin.com/v1.0",
  headers: {
    "Content-Type": "application/json"
  }
});

export default Request;
