import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 1. Check if a token exists
    const hasToken = !!getToken();

    // 2. Check if the user is on an "Auth" page
    const authPages = ["/login", "/signup"];
    const isAuthPage = authPages.some((path) =>
      window.location.pathname.includes(path),
    );

    // 3. Logic: Redirect ONLY if 401 occurs while logged in AND not on auth pages
    if (status === 401 && hasToken && !isAuthPage) {
      removeToken();

      // Use replace to prevent the user from clicking "back" into a broken session
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
