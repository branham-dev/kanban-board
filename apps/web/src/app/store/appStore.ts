import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/service/api';
import { authReducer } from '@authSlice';

export const appStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
