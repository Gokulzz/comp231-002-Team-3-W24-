import { PATIENT, RECEPIONIST_URL } from "../libs/Urls";
import { get, put } from "../utils/request";

export const GetAllPatientApointments = () => {
  return get(RECEPIONIST_URL.PATIENT.GET_APOINTMENT_REQUESTS).then(
    (res) => res.data
  );
};

export const GetAllDoctorsList = () => {
  return get(PATIENT.DOCTORS_LIST).then((res) => res.data);
};
