import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userInfo, userLogin, getAllUsers, createUser, updateUser, deleteUser } from './gt.action';
import { User } from '../../types/user.types';

export enum UserAccessLevel {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  THERAPIST = 'THERAPIST',
  DOCTOR = 'DOCTOR',
  all = 'all',
}

export interface UserBrief {
  id: string;
  email: string;
  name: string;
  userAccessLevel: UserAccessLevel;
}

interface IGtState {
  loading: boolean;
  errorMessage?: string;
  userInfo?: UserBrief;
  userRole?: UserAccessLevel;
  users: User[];
  usersLoading: boolean;
  userManagementError?: string;
}

const initialState: IGtState = {
  loading: false,
  users: [],
  usersLoading: false,
};

const gtSlice = createSlice({
  name: 'gt',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearUserManagementError: (state) => {
      state.userManagementError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.errorMessage = 'Wrong password';
        state.loading = false;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        console.log('action.payload', action.payload);
        state.userRole = action.payload.userAccessLevel;
      })
      .addCase(userInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(userInfo.rejected, (state) => {
        state.errorMessage = 'User not found';
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.userManagementError = undefined;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.userManagementError = action.payload?.message || 'Error al cargar usuarios';
      })
      .addCase(createUser.pending, (state) => {
        state.usersLoading = true;
        state.userManagementError = undefined;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.userManagementError = action.payload?.message || 'Error al crear usuario';
      })
      .addCase(updateUser.pending, (state) => {
        state.usersLoading = true;
        state.userManagementError = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.userManagementError = action.payload?.message || 'Error al actualizar usuario';
      })
      .addCase(deleteUser.pending, (state) => {
        state.usersLoading = true;
        state.userManagementError = undefined;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.userManagementError = action.payload?.message || 'Error al eliminar usuario';
      });
  },
});

export const { setErrorMessage, clearUserManagementError } = gtSlice.actions;

export default gtSlice.reducer;
