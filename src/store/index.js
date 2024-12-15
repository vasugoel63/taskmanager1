import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import singletaskReducer from './singletaskSlice';
const store = configureStore({
    reducer: {
      auth: authReducer,
      tasks: taskReducer,
      singletask: singletaskReducer
    },
    devTools: false,
  });

  export default store;