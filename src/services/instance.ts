import axios, { AxiosInstance } from 'axios';
import { getLocalStorage } from '../utils/localStorage';

export const baseURL =
  process.env.REACT_APP_BACK_URL ?? 'http://localhost:4000';

export const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = getLocalStorage('token');
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});
