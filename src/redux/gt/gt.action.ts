import { createAsyncThunk } from '@reduxjs/toolkit';
import _authService, { AuthError } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import { CreateUserDto, UpdateUser } from '../../types/user.types';

export interface LoginDto {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'user/login',
  async (data: LoginDto, { rejectWithValue }) => {
    try {
      const token = await _authService.login(data);
      return token;
    } catch (error) {
      if (error instanceof AuthError) {
        return rejectWithValue({ message: error.message, status: error.status });
      }
      return rejectWithValue({ message: 'Error inesperado durante el inicio de sesión' });
    }
  },
);

export const userInfo = createAsyncThunk(
  'user/info', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await _authService.userInfo();
      return response.data;
    } catch (error) {
      if (error instanceof AuthError) {
        return rejectWithValue({ message: error.message, status: error.status });
      }
      return rejectWithValue({ message: 'Error al obtener información del usuario' });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await userService.getAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue({ message: 'Error al obtener usuarios' });
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: CreateUserDto, { rejectWithValue }) => {
    try {
      const user = await userService.createUser(userData);
      return user;
    } catch (error) {
      return rejectWithValue({ message: 'Error al crear usuario' });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: UpdateUser, { rejectWithValue }) => {
    try {
      const user = await userService.updateUser(userData);
      return user;
    } catch (error) {
      return rejectWithValue({ message: 'Error al actualizar usuario' });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await userService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue({ message: 'Error al eliminar usuario' });
    }
  }
);
