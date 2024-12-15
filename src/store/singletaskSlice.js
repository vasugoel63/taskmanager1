import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSingleTaskapi, updateSingleTaskapi } from '../services/api';
export const getsingleTask = createAsyncThunk('singletask/get', async (data, { rejectWithValue }) => {
  try {
    const response = await getSingleTaskapi(data);
    console.log(response);
    return response;  
  } catch (error) {
    return rejectWithValue('Login failed. Please try again.');
  }
});
export const updatesingleTask = createAsyncThunk('singletasks/updater', async (data, { rejectWithValue }) => {
    try {
      const response = await updateSingleTaskapi(data);
      console.log(response);
      return response;  
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  });
  const singletaskSlice = createSlice({
    name: 'singletask',
    initialState: {
      error: null,
      success: false,
      data: '',
      updatesuccess: false
    },
    reducers: {
      clearstAction: (state) => {
            state.error = null;
            state.success = false;
            state.updatesuccess = false;
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getsingleTask.pending, (state) => {
          state.success = false;
        })
        .addCase(getsingleTask.fulfilled, (state, action) => {
          state.success = true;
          state.data = action.payload;
        })
        .addCase(getsingleTask.rejected, (state, action) => {
          state.success = false;
          state.error = action.error.message;
        })  
        .addCase(updatesingleTask.pending, (state) => {
            state.updatesuccess = false;
          })
          .addCase(updatesingleTask.fulfilled, (state, action) => {
            state.updatesuccess = true;
            state.data = action.payload;
          })
          .addCase(updatesingleTask.rejected, (state, action) => {
            state.updatesuccess = false;
            state.error = action.error.message;
          })  

    },
  });
  export const { clearstAction } = singletaskSlice.actions;
  export default singletaskSlice.reducer;