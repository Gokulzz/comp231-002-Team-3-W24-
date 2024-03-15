export const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const AUTH_URL = {
  LOGIN: SERVER_BASE_URL + "/api/auth/login",
  REGISTER: SERVER_BASE_URL + "/api/auth/register",
};
