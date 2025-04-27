import { createAsyncThunk } from '@reduxjs/toolkit';
import _authService from '../../services/auth.service';

export interface LoginDto {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'user/login',
  async (data: LoginDto) => {
    const response = await _authService.login(data);
    let headers = response.headers;
    if (headers.toJSON && typeof headers.toJSON === 'function') {
      headers = headers.toJSON();
    } else {
      headers = {};
    }

    return {
      ...response.data,
      headers,
    };
  },
);
