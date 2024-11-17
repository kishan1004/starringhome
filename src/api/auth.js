import { baseAxios } from "../utils/axios";

export const loginApi = async (data) => {
  return baseAxios.post("user/auth/login", data);
};
