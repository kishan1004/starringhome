import axios from "axios";

/**
 * Base url for backend server is mapped here, functions using axios Instance will
 * make call to this baseUrl.
 */
const baseURL = "https://3.14.249.42:9004/api/v1/";
export const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const adminAuthInstance = axios.create({
  baseURL: baseURL,
});

export const userAuthInstance = axios.create({
  baseURL: baseURL,
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
   let weburl = window.location.href
  if (weburl.split("/").includes("admin")) {
    apiKey = localStorage.getItem("authToken");
  } else {
    apiKey = localStorage.getItem("userToken");
  }
  if (apiKey) {
    config.headers["Authorization"] = `Bearer ${apiKey}`;
  }
  return config;
});

/**
 * A response interceptor acts as a middle man when response is sent to ui app from backend.
 * when an unauthorized response is returned we route the user to homepage.
 * Change the routing as required, for future requirements.
 */
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error);
    let weburl = window.location.href;
    
    // Check for 401 or 403 error status
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const urlParts = weburl.split("/");
      const isAdmin = urlParts.includes("admin");
      const isNotAuthenticated = error?.response?.data?.detail?.[0]?.msg === "Not authenticated";
    
      if (isAdmin) {
        // Redirect only if not authenticated and not already on /admin/login
        if (isNotAuthenticated && !weburl.endsWith("/admin/login")) {
          window.location.href = "/admin/login";
        }
      } else {
        // Redirect to /user-login only if not authenticated and not already on /user-login
        if (isNotAuthenticated && !weburl.endsWith("/user-login")) {
          window.location.href = "/user-login";
        }
      }
    }
    
    
    return error;
  }
);

adminAuthInstance.interceptors.request.use((config) => {
  let apiKey = "";
    apiKey = localStorage.getItem("authToken");
    config.headers["Authorization"] = `Bearer ${apiKey}`;
  return config;
});

adminAuthInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403 || error?.response?.data.detail[0].msg ==='Not authenticated') {
      window.location.href = "/admin/login";
    }
    return Promise.reject(error.response.data.detail);
  }
);

userAuthInstance.interceptors.request.use((config) => {
  let apiKey = "";
    apiKey = localStorage.getItem("userToken");
    config.headers["Authorization"] = `Bearer ${apiKey}`;
  return config;
});

userAuthInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403 || error?.response?.data.detail[0].msg ==='Not authenticated') {
      window.location.href = "/user-login";
    }
    return Promise.reject(error.response.data.detail);
  }
);
