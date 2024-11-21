import { createSlice } from '@reduxjs/toolkit';


const loadUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const initialState = {
  user: loadUserFromLocalStorage(),  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      saveUserToLocalStorage(state.user);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
