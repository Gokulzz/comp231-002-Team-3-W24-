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
  RECEPTIONIST: {
    GET_ALL_REQUESTS: SERVER_BASE_URL + "/api/receptionist/requests",
    GET_ALL_APOINTMENTS: SERVER_BASE_URL + "/api/appointment",
    GET_APOINTMENTS_BY_ID: SERVER_BASE_URL + "/api/appointment/{id}",
    TAKE_ACTION_FRO_APOINTMENT:
      SERVER_BASE_URL + "/api/receptionist/requests/{id}",
    CREATE_APOINTMENT: SERVER_BASE_URL + "/api/appointment/",
    UPDATE_APONTMANT_STATUS: SERVER_BASE_URL + "/api/appointment/{id}/status",
  },
  PATIENT: {
    GET_APOINTMENT_REQUESTS:
      SERVER_BASE_URL + "/api/appointment/patientAppointment",
  },
};

export const ADMINSTRATOR = {
  USERS: {
    LIST: SERVER_BASE_URL + "/api/administrator/users",
    DELETE: SERVER_BASE_URL + "/api/administrator/users/{id}",
  },
  DOCTORS: {
    LIST: SERVER_BASE_URL + "/api/doctor/all",
    UPDATE: SERVER_BASE_URL + "/api/doctor/{id}/update-info",
  },
};

export const DOCTOR = {
  APPOINTMENTS: {
    LIST: SERVER_BASE_URL + "/api/doctor/appointments",
  },
};

export const PATIENT = {
  DOCTORS_LIST: SERVER_BASE_URL + "/api/doctor/all",
};
