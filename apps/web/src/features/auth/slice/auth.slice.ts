import type { AuthUser } from '@auth/types';
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: AuthUser | null;
};

const authState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
