import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { walletApi } from '../services/walletApi';
import { transferApi } from '../services/transferApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      walletApi.middleware,
      transferApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;