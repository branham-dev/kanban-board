import { api } from '@/service/api';
import type { RegisterInputs, LoginInputs } from '@kanban/shared';
import type { AuthUser, UserResponse } from '@auth/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload: RegisterInputs) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
    }),

    login: builder.mutation({
      query: (payload: LoginInputs) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),

    hydrateUser: builder.query<AuthUser, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      transformResponse: (response: UserResponse) => {
        return response.data;
      },
    }),

    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation: useRegister,
  useLoginMutation: useLogin,
  useHydrateUserQuery: useHydrate,
  useLogoutMutation,
} = authApi;
