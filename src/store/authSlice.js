import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginForm } from '../services/api';

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const response = await loginForm(userCredentials);
    console.log(response);
    return response;  
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      error: null,
      success: false,
      data: ''
    },
    reducers: {
      clearauthAction: (state) => {
        state.error = null;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.success = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.success = true;
          state.data = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.success = false;
          state.error = action.payload;
        })     
    },
  });

  export default authSlice.reducer;
    export const { clearauthAction } = authSlice.actions;
  