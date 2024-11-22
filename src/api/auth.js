import { baseAxios, authAxios } from "../utils/axios";

export const loginApi = async (data) => {
  return baseAxios.post("user/auth/login", data);
};

//logout

export const logoutApi = async (data) => {
  return authAxios.delete("user/auth/logout", data);
};
