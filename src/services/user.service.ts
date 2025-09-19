import { api } from './instance';
import { CreateUserDto, UpdateUser, User, UserBrief } from '../types/user.types';

export const userService = {
  getProfile: async (): Promise<UserBrief> => {
    const response = await api.get('/user');
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/user/all');
    return response.data;
  },

  createUser: async (userData: CreateUserDto): Promise<User> => {
    const response = await api.post('/user', userData);
    return response.data;
  },

  updateUser: async (userData: UpdateUser): Promise<User> => {
    const response = await api.patch('/user/profile', userData);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/user/${userId}`);
  },
};