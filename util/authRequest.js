import axios from "axios";

const API_KEY = "AIzaSyDZcyV7omqZDV7MY-Ux8X9U-9Zariys5TM";

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  let userData = response.data;

  const refreshToken = userData.refreshToken;

  const refreshTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

  const responseRefreshToken = await axios.post(refreshTokenUrl, {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const idTokenRefreshed = responseRefreshToken.data.id_token;

  userData = { ...userData, idToken: idTokenRefreshed };
  return userData;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
