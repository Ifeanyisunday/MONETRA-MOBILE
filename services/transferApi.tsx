import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const transferApi = createApi({
  reducerPath: 'transferApi',
  baseQuery,
  tagTypes: ['Wallet'],
  endpoints: (builder) => ({
    sendTransfer: builder.mutation({
      query: (data) => ({
        url: '/transfer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const { useSendTransferMutation } = transferApi;