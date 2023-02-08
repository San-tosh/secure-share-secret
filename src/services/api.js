import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
api.defaults.withCredentials = true;

api.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return Promise.resolve(data);
    }
  },
  async (error) => {
    const { response, request } = error;
    if (response) {
      if (response.status === 401) {
        // if (!typeof window === "undefined") {
          // localStorage.removeItem("userData");
        // }
        // window.location.href = "/";
      }
      if (response.status >= 400 && response.status < 500) {
        return Promise.reject(response.data);
      }
    } else if (request) {
      return null;
    }
    return Promise.reject(error);
  }
);

export default api;
