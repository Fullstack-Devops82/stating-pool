import Cookies from "universal-cookie";
const cookies = new Cookies();

export function storeAuthDataCookies(email, token, remember) {
  cookies.set("HOLD@email", email);
  cookies.set("HOLD@token", token);

  if (remember) {
    cookies.set("HOLD@remember", remember);
  }
}

export function getCookies() {
  // TODO: upgrade with get where contains "HOLD@"
  // - return a mapped object
  return {
    email: cookies.get("HOLD@email"),
    token: cookies.get("HOLD@token"),
    remember: cookies.get("HOLD@remember")
  };
}

export function wipeCookies() {
  // TODO: upgrade with get where contains "HOLD@"
  // - delete each item that contains
  cookies.remove("HOLD@email");
  cookies.remove("HOLD@token");
  cookies.remove("HOLD@remember");
}
