import { Stack } from "expo-router";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store'; 
import Toast from "react-native-toast-message";



export default function RootLayout() {
  return (
    <Provider store={store}>
      <>
        <Stack />
        <Toast />
      </>
    </Provider>
    );
}


   

