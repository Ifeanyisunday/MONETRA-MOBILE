import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => '/wallet',
      providesTags: ['Wallet'],
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;