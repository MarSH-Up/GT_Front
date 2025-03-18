import { createAsyncThunk } from '@reduxjs/toolkit';
import { BuyerService } from '../../services/gt.service';

export const loginBuyer = createAsyncThunk(
  'gt/login',
  async (data: { email: string; password: string }) => {
    return BuyerService.login(data);
  }
);

