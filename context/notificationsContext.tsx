import React, { createContext, useState, useEffect } from 'react';
import { connectSocket, getSocket } from '../services/socket';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'fraud';
}

interface NotificationsContextProps {
  notifications: Notification[];
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  notifications: [],
});

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const init = async () => {
      await connectSocket();
      const socket = getSocket();
      if (!socket) return;

      socket.on('notification', (data: Notification) => {
        setNotifications((prev) => [data, ...prev]);
      });
    };
    init();
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};