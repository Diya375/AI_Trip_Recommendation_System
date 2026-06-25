import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5001/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle expired token globally — redirect to login with current path
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
    }
    return Promise.reject(error);
  }
);

export default API;