import axios from "axios";

/**
 * Base url for backend server is mapped here, functions using axios Instance will
 * make call to this baseUrl.
 */
export const axiosInstance = axios.create({
  baseURL: "https://3.14.249.42:9004/api/v1/",
});

/**
 * A request interceptor adds additional property to out going request
 * This is the common place, where auth token is added, to out going request.
 * 
 * The below method adds auth token if it is in the Set of private Api.
 * it checks if the api is for admin , to attach auth token.
 * If the api is for user it attaches userToken instead
 */
axiosInstance.interceptors.request.use((config) => {
  let apiKey = "";
  if (config.url.includes('/user/auth') || config.url.includes('/admin')) {
    apiKey = localStorage.getItem("authToken");
  } else {
    apiKey = localStorage.getItem("userToken");
  }
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`
  }
  return config;
})

/**
 * A response interceptor acts as a middle man when response is sent to ui app from backend.
 * when an unauthorized response is returned we route the user to homepage.
 * Change the routing as required, for future requirements.
 */
axiosInstance.interceptors.response.use((res) => {
  return res;
},
  (error) => {
    console.error('error', error);
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      let url = error?.config?.url;
      if (url.includes('/user/auth') || url.includes('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/user-login';
      }
    }
    return error;
  }
)