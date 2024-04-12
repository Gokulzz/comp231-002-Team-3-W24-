import { DOCTOR } from "../libs/Urls";
import { get, post, put } from "../utils/request";

export const GetAllDoctorAppointments = () => {
  return get(DOCTOR.APPOINTMENTS.LIST).then((res) => res.data);
};

export const PreScribeMedic = (DATA) => {
  return post(DOCTOR.APPOINTMENTS.PRESCRIE.CREATE, DATA).then(
    (res) => res.data
  );
};

export const GetPatientPreScribeHistory = (patientId) => {
  return get(
    DOCTOR.APPOINTMENTS.PRESCRIE.LIST.replace("{patientId}", patientId)
  ).then((res) => res.data);
};

export const GetPatientMedicalReports = (patientId) => {
  return get(
    DOCTOR.APPOINTMENTS.MEDICAL_REPORT.LIST.replace("{patientId}", patientId)
  ).then((res) => res.data);
};

export const CreateMedicalReport = (patientId, report) => {
  return put(
    DOCTOR.APPOINTMENTS.MEDICAL_REPORT.CREATE.replace("{patientId}", patientId),
    report
  ).then((res) => res.data);
};

