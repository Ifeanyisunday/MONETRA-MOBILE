import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    deposit: builder.mutation<any, { amount: number }>({
      query: (data) => ({
        url: '/wallet/deposit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'], // ✅ triggers wallet refetch
    }),
    transfer: builder.mutation({
      query: (data) => ({
        url: '/money/transfer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
    getWallet: builder.query<any, void>({
      query: () => '/wallet/me',
      providesTags: ['Wallet'],
    }),
    getTransactions: builder.query<any, void>({
      query: () => '/wallet/transactions',
      providesTags: ['Wallet'], // ✅ also tags wallet for refetch on tx history change
    }),
    buyAirtime: builder.mutation({
      query: (data) => ({
        url: '/wallet/airtime',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
    payBills: builder.mutation({
      query: (data) => ({
        url: '/wallet/nepabill',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
    tvSubscription: builder.mutation({
      query: (data) => ({
        url: '/wallet/tvsubscription',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const { 
  useGetWalletQuery, 
  useLazyGetWalletQuery, 
  useDepositMutation,
  useTransferMutation,
  useGetTransactionsQuery,
  useBuyAirtimeMutation,
  usePayBillsMutation,
  useTvSubscriptionMutation } = walletApi;