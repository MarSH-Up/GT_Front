import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginBuyer } from './gt.action';

interface IGtState {
  loading: boolean;
  errorMessage?: string;
  token?: string;
}

const initialState: IGtState = {
  loading: false
};

const gtSlice = createSlice({
  name: 'gt',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginBuyer.fulfilled, (state, action: PayloadAction<string>) => {
        state.errorMessage = undefined;
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginBuyer.pending, (state) => {
        state.errorMessage = undefined;
        state.loading = true;
      })
      .addCase(loginBuyer.rejected, (state) => {
        state.errorMessage = 'Invalid credentials';
        state.loading = false;
        state.token = undefined;
      });
  }
});

export const { setErrorMessage } = gtSlice.actions;

export default gtSlice.reducer;
