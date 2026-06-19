import { clearUser } from '@/features/auth/slice';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});

console.log('Base Query', baseQuery);

const authBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  apiCtx,
  extraOptions,
) => {
  const result = await baseQuery(args, apiCtx, extraOptions);

  if (result.error?.status === 401) {
    apiCtx.dispatch(clearUser());

    // apiCtx.dispatch(api.util.resetApiState());
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: authBaseQuery,

  endpoints: () => ({}),
});
