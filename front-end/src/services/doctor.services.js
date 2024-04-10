import { DOCTOR } from "../libs/Urls";
import { get } from "../utils/request";

export const GetAllDoctorAppointments = () => {
  return get(DOCTOR.APPOINTMENTS.LIST).then((res) => res.data);
};
