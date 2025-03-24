import axios, {  AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { clearTokens, getAccessToken, refreshAccessToken } from "./tokenUtils";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", 
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Check if the error is due to an expired token and if the request can be retried
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Attempt to refresh the access token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    if (error.response?.status === 401) {
      clearTokens();
    }

    return Promise.reject(error);
  }
);