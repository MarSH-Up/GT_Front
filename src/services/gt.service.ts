import axios from 'axios';
import { GtLoginResponse } from '../types/responses/gtLogin.type';
import { IApiResponse } from '../types/responses/apiResponse.interface';
import { setLocalStorage } from '../utils/localStorage';
import { baseURL } from './instance';

export const GtService = {
  login: async (data: { email: string; password: string }) => {
    const res = await axios.post<IApiResponse<GtLoginResponse>>(
      `${baseURL}/user/login`,
      data
    );

    const token = res.data.data.token;
    setLocalStorage('token', token);

    return token;
  },
  adminlogin: async (data: { email: string; password: string }) => {
    const res = await axios.post<IApiResponse<GtLoginResponse>>(
      `${baseURL}/user/admin/login`,
      data
    );

    const token = res.data.data.token;
    setLocalStorage('token', token);

    return token;
  },

};
