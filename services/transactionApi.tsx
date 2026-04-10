import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery,
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => '/transactions',
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;