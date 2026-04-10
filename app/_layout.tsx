import { Stack } from "expo-router";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';       // your Redux store
import { NotificationsProvider } from '@/context/notificationsContext';




export default function RootLayout() {
  return (
    <Provider store={store}>
        <NotificationsProvider>
          <Stack />
        </NotificationsProvider>
      </Provider>
    );
}
   

