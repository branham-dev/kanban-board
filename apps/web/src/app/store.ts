import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/service/api';

export const appStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
