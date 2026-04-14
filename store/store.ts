import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { walletApi } from '../services/walletApi';
import authReducer from './auth/authSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      walletApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;