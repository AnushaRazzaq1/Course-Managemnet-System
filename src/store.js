import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import courseReducer from './features/courseSlice';
import authorReducer from "./features/authorSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    authors: authorReducer,
  },
});

export default store;
