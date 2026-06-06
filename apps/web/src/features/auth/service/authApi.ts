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

    hydrateUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterMutation: useRegister,
  useLoginMutation: useLogin,
  useHydrateUserQuery: useHydrate,
} = authApi;
