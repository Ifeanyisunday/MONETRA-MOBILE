import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    getWallet: builder.query<any, void>({
      query: () => '/wallet/me',
      providesTags: ['Wallet'],
    }),
  }),
});

export const { useGetWalletQuery, useLazyGetWalletQuery } = walletApi;