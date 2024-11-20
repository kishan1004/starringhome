import { axiosInstance } from "../utils/axios";

export const userLogin = (email, password) => {
  return axiosInstance.post('/user/auth/login', {
    email,
    password
  })
}