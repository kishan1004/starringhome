import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "https://3.14.249.42:9004/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: "https://3.14.249.42:9004/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use(
  async (request) => {
    const sessionToken = localStorage.getItem("authToken");
    if (request.headers) {
      request.headers.Authorization = `Bearer ${sessionToken}`;
    }
    request.data = JSON.stringify(request.data);
    return request;
  },
  (error) => {
    return error;
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
