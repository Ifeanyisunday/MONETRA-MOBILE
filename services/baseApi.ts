import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MONETRA_BACKEND_URL } from '@env';

export const baseQuery = fetchBaseQuery({
  baseUrl: MONETRA_BACKEND_URL, // your NestJS backend
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});