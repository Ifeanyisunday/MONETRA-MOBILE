import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { walletApi } from '../services/walletApi';
import { transferApi } from '../services/transferApi';
import { depositApi } from '../services/depositApi';
import authReducer from './auth/authSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
    [depositApi.reducerPath]: depositApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      walletApi.middleware,
      transferApi.middleware,
      depositApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;