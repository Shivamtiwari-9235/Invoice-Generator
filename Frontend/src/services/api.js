import axios from "axios";
import { API_BASE_URL, AUTH_STORAGE_KEY } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const storedAuth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");

  if (storedAuth?.token) {
    config.headers.Authorization = `Bearer ${storedAuth.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const hasAuthHeader = Boolean(error.config?.headers?.Authorization);

    if (status === 401 && hasAuthHeader) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      delete api.defaults.headers.common.Authorization;

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

export default api;