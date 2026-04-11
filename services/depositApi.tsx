import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const depositApi = createApi({
  reducerPath: 'depositApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    deposit: builder.mutation<any, { amount: number }>({
      query: (data) => ({
        url: '/wallet/deposit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const { useDepositMutation } = depositApi;