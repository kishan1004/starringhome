import { axiosInstance } from "../utils/axios";

export const userLogin = (email, password) => {
  return axiosInstance.post('/user/auth/login', {
    email,
    password
  })
}

export const userLogout = () => {
  return axiosInstance.delete('/user/auth/logout');
}

export const getProfiles = (page, limit) => {
  return axiosInstance.get('/admin/profiles/details', {
    params: {
      page,
      limit
    }
  });
}

export const saveProfile = (profile = {}) => {
  const { firstName, lastName, email, mobileNumber, password } = profile;

  if (!firstName || !email || !password) {
    throw new Error('First name, email, and password are required.');
  }

  return axiosInstance.post('/admin/profiles/save', {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });
}
