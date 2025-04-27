import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userLogin } from './gt.action';

interface IGtState {
  loading: boolean;
  errorMessage?: string;
}

const initialState: IGtState = {
  loading: false,
};

const gtSlice = createSlice({
  name: 'gt',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
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
      });
  },
});

export const { setErrorMessage } = gtSlice.actions;

export default gtSlice.reducer;
