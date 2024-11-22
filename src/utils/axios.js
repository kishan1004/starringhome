import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://3.14.249.42:9004/api/v1/",
});

axiosInstance.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem("authToken");
  console.log(config);
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`
  }
  return config;
})

axiosInstance.interceptors.response.use((res) => {
  return res;
},
  (error) => {
    console.error('error', error);
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      window.location.href = '/';
    }
    return error;
  }
)