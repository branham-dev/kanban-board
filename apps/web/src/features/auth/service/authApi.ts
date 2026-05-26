import { api } from '@/service/api';
import type { RegisterInputs, LoginInputs } from '@kanban/shared';

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
  }),
});

export const { useRegisterMutation: useRegister, useLoginMutation: useLogin } = authApi;
