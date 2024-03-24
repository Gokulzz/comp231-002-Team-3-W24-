export const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const AUTH_URL = {
  LOGIN: SERVER_BASE_URL + "/api/auth/login",
  REGISTER: SERVER_BASE_URL + "/api/auth/register",
};

export const RECEPIONIST_URL = {
  APPOINTMENTS: {
    CREATE: SERVER_BASE_URL + "/api/appointment/",
    LIST: SERVER_BASE_URL + "/api/appointment",
    STATUS: SERVER_BASE_URL + "/api/appointment/{id}/status",
    GET_BY_ID: SERVER_BASE_URL + "/api/appointment/{id}",
    REQUESTS: {
      LIST: SERVER_BASE_URL + "/api/receptionist/requests",
    },
  },
};
