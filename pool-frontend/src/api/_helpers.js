import { getCookies } from "./cookies";

export function validateRequest(token) {
  const cookies = getCookies();
  // TODO: add more complicated frontend check?
  // - idea: do a "/me" request and check email hash against cookie email hash as well
  if (token !== cookies.token) {
    console.log("state token", token);
    console.log("cookies token", cookies.token);
    return false;
  }

  return true;
}

export const criticalError = {
  critical: 1,
  message: "Outdated Cookies!"
};
