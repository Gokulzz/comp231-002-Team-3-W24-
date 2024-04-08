import { ADMINSTRATOR } from "../libs/Urls";
import { deletee, get, post, put } from "../utils/request";

export const GetAllUsers = () => {
  return get(ADMINSTRATOR.USERS.LIST)
    .then((res) => res.data)
    .catch((err) => err);
};

export const GetAllDoctors = () => {
  return get(ADMINSTRATOR.DOCTORS.LIST)
    .then((res) => res.data)
    .catch((err) => err);
};

export const DeleteUser = (userId) => {
  const url = ADMINSTRATOR.USERS.DELETE.replace("{id}", userId);
  return deletee(url)
    .then((res) => res.data)
    .catch((err) => err);
};

export const UpdateeDoctor = (userId, newData) => {
  const url = ADMINSTRATOR.DOCTORS.UPDATE.replace("{id}", userId);
  return post(url, { ...newData })
    .then((res) => res.data)
    .catch((err) => err);
};
