// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';


const initialState: AuthState = {
  isAuthenticated: false,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<'huesped' | 'agente'>) {
      state.isAuthenticated = true;
      state.userType = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userType = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;