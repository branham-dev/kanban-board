import { api } from '@/service/api';
import type { AuthUser } from '@auth/types';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@auth/service';

type AuthState = {
  user: AuthUser | null;
  isAuthChecked: boolean;
};

const authState: AuthState = {
  user: null,
  isAuthChecked: false,
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
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.hydrateUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthChecked = true;
    });

    builder.addMatcher(authApi.endpoints.hydrateUser.matchRejected, (state) => {
      state.user = null;
      state.isAuthChecked = true;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
