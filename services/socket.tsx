import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

let socket: Socket | null = null;

export const connectSocket = async () => {
  const token = await AsyncStorage.getItem('token');

  socket = io('http://YOUR_BACKEND_IP:3000', {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('Connected to notifications server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};

export const getSocket = () => socket;