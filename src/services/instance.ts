import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage, removeLocalStorage } from '../utils/localStorage';

export const baseURL =
  import.meta.env.VITE_REACT_APP_API ?? 'http://localhost:3000';

export const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getLocalStorage('token');
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: { response: AxiosResponse; config: AxiosRequestConfig }) => {
    if (error.response?.status === 401) {
      removeLocalStorage('token');
      document.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
