import { RECEPIONIST_URL } from "../libs/Urls";
import { get, post, put } from "../utils/request";

export const GetAllApointments = () => {
  return get(RECEPIONIST_URL.APPOINTMENTS.LIST).then((res) => res.data);
};

export const GetAllRequestedApointments = () => {
  return get(RECEPIONIST_URL.RECEPTIONIST.GET_ALL_REQUESTS).then(
    (res) => res.data
  );
};

export const TakeActionForApointment = (id, action) => {
  return put(
    RECEPIONIST_URL.RECEPTIONIST.TAKE_ACTION_FRO_APOINTMENT.replace("{id}", id),
    {
      action: action,
    }
  ).then((res) => res.data);
};

export const UpdateApointmantStatus = (id, newData) => {
  return put(
    RECEPIONIST_URL.RECEPTIONIST.UPDATE_APONTMANT.replace("{id}", id),
    newData
  ).then((res) => res.data);
};

export const GetApontmentById = (id, action) => {
  return get(
    RECEPIONIST_URL.RECEPTIONIST.GET_APOINTMENTS_BY_ID.replace("{id}", id)
  ).then((res) => res.data);
};
