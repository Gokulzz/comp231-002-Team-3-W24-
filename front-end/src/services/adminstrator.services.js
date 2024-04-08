import { ADMINSTRATOR } from "../libs/Urls";
import { deletee, get } from "../utils/request";

export const GetAllUsers = () => {
  return get(ADMINSTRATOR.USERS.LIST)
    .then((res) => res.data)
    .catch((err) => err);
};

export const DeleteUser = (userId) => {
  const url = ADMINSTRATOR.USERS.DELETE.replace("{id}", userId);
  return deletee(url)
    .then((res) => res.data)
    .catch((err) => err);
};
