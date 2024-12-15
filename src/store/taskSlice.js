import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTasksapi ,addTaskByUserapi, deleteTaskByUserapi } from '../services/api';
export const getTasks = createAsyncThunk('tasks/gettaskbyuser', async (data, { rejectWithValue }) => {
  try {
    const response = await getTasksapi(data);
    console.log(response);
    return response;  
  } catch (error) {
    return rejectWithValue('Login failed. Please try again.');
  }
});
export const addTaskByUser = createAsyncThunk('tasks/addtaskbyuser', async (data, { rejectWithValue }) => {
    try {
      const response = await addTaskByUserapi(data);
      console.log(response);
      return response;  
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  });

  export const deleteTask = createAsyncThunk('tasks/deletetaskbyuser', async (data, { rejectWithValue }) => {
    try {
      const response = await deleteTaskByUserapi(data);
      console.log(response);
      return response;  
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  });
  const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
      error: null,
      success: false,
      data: '',
     createsuccess: false,
     delsuccess:false
    },
    reducers: {
        clearAction: (state) => {
            state.error = null;
            state.success = false;
            state.createsuccess = false;
            state.delsuccess  =false;
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getTasks.pending, (state) => {
          state.success = false;
        })
        .addCase(getTasks.fulfilled, (state, action) => {
          state.success = true;
          state.data = action.payload;
        })
        .addCase(getTasks.rejected, (state, action) => {
          state.success = false;
          state.error = action.error.message;
        })  
        .addCase(addTaskByUser.pending, (state) => {
            state.createsuccess = false;
          })
          .addCase(addTaskByUser.fulfilled, (state, action) => {
            state.createsuccess = true;
            state.data = action.payload;
          })
          .addCase(addTaskByUser.rejected, (state, action) => {
            state.createsuccess = false;
            state.error = action.error.message;
          })  
          .addCase(deleteTask.pending,(state,action)=>{
            state.delsuccess = false;
          })
          .addCase(deleteTask.fulfilled, (state, action) => {
            state.delsuccess = true;
            state.data = action.payload;
          })
          .addCase(deleteTask.rejected, (state, action) => {
            state.delsuccess = false;
            state.error = action.error.message;
          }) 

    },
  });
  export const { clearAction } = taskSlice.actions;
  export default taskSlice.reducer;